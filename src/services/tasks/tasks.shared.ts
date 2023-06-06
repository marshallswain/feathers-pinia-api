// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Tasks, TasksData, TasksPatch, TasksQuery, TasksService } from './tasks.class'

export type { Tasks, TasksData, TasksPatch, TasksQuery }

export type TasksClientService = Pick<TasksService<Params<TasksQuery>>, (typeof tasksMethods)[number]>

export const tasksPath = 'tasks'

export const tasksMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const tasksClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(tasksPath, connection.service(tasksPath), {
    methods: tasksMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [tasksPath]: TasksClientService
  }
}
