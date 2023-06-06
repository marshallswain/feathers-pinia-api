// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Contacts, ContactsData, ContactsPatch, ContactsQuery, ContactsService } from './contacts.class'

export type { Contacts, ContactsData, ContactsPatch, ContactsQuery }

export type ContactsClientService = Pick<
  ContactsService<Params<ContactsQuery>>,
  (typeof contactsMethods)[number]
>

export const contactsPath = 'contacts'

export const contactsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const contactsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(contactsPath, connection.service(contactsPath), {
    methods: contactsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [contactsPath]: ContactsClientService
  }
}
