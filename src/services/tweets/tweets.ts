// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  tweetsDataValidator,
  tweetsPatchValidator,
  tweetsQueryValidator,
  tweetsResolver,
  tweetsExternalResolver,
  tweetsDataResolver,
  tweetsPatchResolver,
  tweetsQueryResolver,
} from './tweets.schema'

import type { Application } from '../../declarations'
import { TweetsService, getOptions } from './tweets.class'
import { tweetsPath, tweetsMethods } from './tweets.shared'

export * from './tweets.class'
export * from './tweets.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const tweets = (app: Application) => {
  // Register our service on the Feathers application
  app.use(tweetsPath, new TweetsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: tweetsMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  })
  // Initialize hooks
  app.service(tweetsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(tweetsExternalResolver),
        schemaHooks.resolveResult(tweetsResolver),
      ],
    },
    before: {
      all: [schemaHooks.validateQuery(tweetsQueryValidator), schemaHooks.resolveQuery(tweetsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(tweetsDataValidator), schemaHooks.resolveData(tweetsDataResolver)],
      patch: [schemaHooks.validateData(tweetsPatchValidator), schemaHooks.resolveData(tweetsPatchResolver)],
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
    [tweetsPath]: TweetsService
  }
}
