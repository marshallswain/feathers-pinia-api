import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  contactsDataValidator,
  contactsQueryValidator,
  contactsResolver,
  contactsDataResolver,
  contactsQueryResolver,
  contactsExternalResolver,
} from './contacts.schema'

import type { Application } from '../../declarations'
import { ContactsService, getOptions } from './contacts.class'

export * from './contacts.class'
export * from './contacts.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const contacts = (app: Application) => {
  // Register our service on the Feathers application
  app.use('contacts', new ContactsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'update', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: [],
  })
  // Initialize hooks
  app.service('contacts').hooks({
    around: {
      all: [authenticate('jwt')],
    },
    before: {
      all: [
        schemaHooks.validateQuery(contactsQueryValidator),
        schemaHooks.validateData(contactsDataValidator),
        schemaHooks.resolveQuery(contactsQueryResolver),
        schemaHooks.resolveData(contactsDataResolver),
      ],
    },
    after: {
      all: [
        schemaHooks.resolveResult(contactsResolver),
        schemaHooks.resolveExternal(contactsExternalResolver),
      ],
    },
    error: {
      all: [],
    },
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    contacts: ContactsService
  }
}
