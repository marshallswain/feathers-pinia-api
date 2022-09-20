import type { Application } from '../../declarations'

import { TasksService, tasksHooks } from './tasks.class'

// A configure function that registers the service and its hooks via `app.configure`
export function tasks(app: Application) {
  const options = {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('tasks'))
    // Service options will go here
  }

  // Register our service on the Feathers application
  app.use('tasks', new TasksService(options), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'update', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('tasks').hooks(tasksHooks)
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    tasks: TasksService
  }
}
