import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  tasksDataValidator,
  tasksQueryValidator,
  tasksResolver,
  tasksDataResolver,
  tasksQueryResolver,
  tasksExternalResolver,
} from './tasks.schema'

import type { Application } from '../../declarations'
import { TasksService, getOptions } from './tasks.class'

export * from './tasks.class'
export * from './tasks.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const tasks = (app: Application) => {
  // Register our service on the Feathers application
  app.use('tasks', new TasksService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'update', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: [],
  })
  // Initialize hooks
  app.service('tasks').hooks({
    around: {
      all: [authenticate('jwt')],
    },
    before: {
      all: [
        schemaHooks.validateQuery(tasksQueryValidator),
        schemaHooks.validateData(tasksDataValidator),
        schemaHooks.resolveQuery(tasksQueryResolver),
        schemaHooks.resolveData(tasksDataResolver),
      ],
    },
    after: {
      all: [schemaHooks.resolveResult(tasksResolver), schemaHooks.resolveExternal(tasksExternalResolver)],
    },
    error: {
      all: [],
    },
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    tasks: TasksService
  }
}
