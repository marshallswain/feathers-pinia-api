import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Params } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { Contacts, ContactsData, ContactsQuery, ContactsService } from './services/contacts/contacts'
export type { Contacts, ContactsData, ContactsQuery }

import type { AuthenticationService } from '@feathersjs/authentication'

import type { User, UserData, UserQuery, UserService } from './services/users/users'
export type { User, UserData, UserQuery }

import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

const userServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type UserClientService = Pick<UserService<Params<UserQuery>>, typeof userServiceMethods[number]>

const contactsServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type ContactsClientService = Pick<
  ContactsService<Params<ContactsQuery>>,
  typeof contactsServiceMethods[number]
>

export interface ServiceTypes {
  contacts: ContactsClientService
  authentication: Pick<AuthenticationService, 'create' | 'remove'>
  users: UserClientService
  //
}

/**
 * Returns a typed client for the feathers-pinia-nuxt3-api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {},
) => {
  const client = feathers<ServiceTypes, Configuration>()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))

  client.use('users', connection.service('users'), {
    methods: userServiceMethods,
  })
  client.use('contacts', connection.service('contacts'), {
    methods: contactsServiceMethods,
  })
  return client
}
