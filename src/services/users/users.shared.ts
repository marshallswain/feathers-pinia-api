// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Users, UsersData, UsersPatch, UsersQuery, UsersService } from './users.class'

export type { Users, UsersData, UsersPatch, UsersQuery }

export type UsersClientService = Pick<UsersService<Params<UsersQuery>>, (typeof usersMethods)[number]>

export const usersPath = 'users'

export const usersMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const usersClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(usersPath, connection.service(usersPath), {
    methods: usersMethods,
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [usersPath]: UsersClientService
  }
}
