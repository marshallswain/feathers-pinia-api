// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  usersDataValidator,
  usersPatchValidator,
  usersQueryValidator,
  usersResolver,
  usersExternalResolver,
  usersDataResolver,
  usersPatchResolver,
  usersQueryResolver,
} from './users.schema'

import type { Application } from '../../declarations'
import { UsersService, getOptions } from './users.class'
import { usersPath, usersMethods } from './users.shared'
import { BadRequest } from '@feathersjs/errors/lib'

export * from './users.class'
export * from './users.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const users = (app: Application) => {
  // Register our service on the Feathers application
  app.use(usersPath, new UsersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: usersMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  })
  // Initialize hooks
  app.service(usersPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(usersExternalResolver), schemaHooks.resolveResult(usersResolver)],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')],
    },
    before: {
      all: [schemaHooks.validateQuery(usersQueryValidator), schemaHooks.resolveQuery(usersQueryResolver)],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(usersDataValidator),
        schemaHooks.resolveData(usersDataResolver),
        // throw error if user with same email already exists
        async (context) => {
          const { data: existing } = await context.service.find({ query: { email: context.data.email } })
          if (existing.length) throw new BadRequest('account already exists')
        },
      ],
      patch: [schemaHooks.validateData(usersPatchValidator), schemaHooks.resolveData(usersPatchResolver)],
      remove: [],
    },
    after: {
      all: [],
    },
    error: {
      all: [],
    },
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [usersPath]: UsersService
  }
}
