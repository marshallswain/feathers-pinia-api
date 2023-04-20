// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { tweetsClient } from './services/tweets/tweets.shared'
export type { Tweets, TweetsData, TweetsQuery, TweetsPatch } from './services/tweets/tweets.shared'

import { contactsClient } from './services/contacts/contacts.shared'
export type {
  Contacts,
  ContactsData,
  ContactsQuery,
  ContactsPatch,
} from './services/contacts/contacts.shared'

import { tasksClient } from './services/tasks/tasks.shared'
export type { Tasks, TasksData, TasksQuery, TasksPatch } from './services/tasks/tasks.shared'

import { usersClient } from './services/users/users.shared'
export type { Users, UsersData, UsersQuery, UsersPatch } from './services/users/users.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the rovit-v4-api app.
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
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(usersClient)
  client.configure(tasksClient)
  client.configure(contactsClient)
  client.configure(tweetsClient)
  return client
}
