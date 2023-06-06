// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  contactsDataValidator,
  contactsPatchValidator,
  contactsQueryValidator,
  contactsResolver,
  contactsExternalResolver,
  contactsDataResolver,
  contactsPatchResolver,
  contactsQueryResolver
} from './contacts.schema'

import type { Application } from '../../declarations'
import { ContactsService, getOptions } from './contacts.class'
import { contactsPath, contactsMethods } from './contacts.shared'

export * from './contacts.class'
export * from './contacts.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const contacts = (app: Application) => {
  // Register our service on the Feathers application
  app.use(contactsPath, new ContactsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: contactsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(contactsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(contactsExternalResolver),
        schemaHooks.resolveResult(contactsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(contactsQueryValidator),
        schemaHooks.resolveQuery(contactsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(contactsDataValidator),
        schemaHooks.resolveData(contactsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(contactsPatchValidator),
        schemaHooks.resolveData(contactsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [contactsPath]: ContactsService
  }
}
