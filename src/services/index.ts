import { tweets } from './tweets/tweets'
import { contacts } from './contacts/contacts'
import { users } from './users/users'
import { tasks } from './tasks/tasks'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(tweets)
  app.configure(contacts)
  app.configure(tasks)
  app.configure(users)
  // All services will be registered here
}
