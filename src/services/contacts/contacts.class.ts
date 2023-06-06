// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Contacts, ContactsData, ContactsPatch, ContactsQuery } from './contacts.schema'

export type { Contacts, ContactsData, ContactsPatch, ContactsQuery }

export interface ContactsParams extends MongoDBAdapterParams<ContactsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class ContactsService<ServiceParams extends Params = ContactsParams> extends MongoDBService<
  Contacts,
  ContactsData,
  ContactsParams,
  ContactsPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('contacts'))
  }
}
