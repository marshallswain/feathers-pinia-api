import { feathers } from '@feathersjs/feathers'
import type {
  TasksData,
  TasksPatch,
  TasksResult,
  TasksQuery,
} from './services/tasks/tasks.schema'

export type {
  TasksData,
  TasksPatch,
  TasksResult,
  TasksQuery,
}
import type {
  UsersData,
  UsersPatch,
  UsersResult,
  UsersQuery,
} from './services/users/users.schema'

export type {
  UsersData,
  UsersPatch,
  UsersResult,
  UsersQuery,
}
import type { Paginated, ClientService, TransportConnection, Params } from '@feathersjs/feathers'

export interface ServiceTypes {
  'tasks': ClientService<
    TasksResult,
    TasksData,
    TasksPatch,
    Paginated<TasksResult>, 
    Params<TasksQuery>
  >
  'users': ClientService<
    UsersResult,
    UsersData,
    UsersPatch,
    Paginated<UsersResult>, 
    Params<UsersQuery>
  >
  // A mapping of client side services
}

export const createClient = <Configuration = any>(connection: TransportConnection<ServiceTypes>) => {
  const client = feathers<ServiceTypes, Configuration>()

  client.configure(connection)

  return client
}
