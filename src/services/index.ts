import { tasks } from './tasks/tasks.service'
import { users } from './users/users.service'
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(tasks)
  app.configure(users)
  // All services will be registered here
}
