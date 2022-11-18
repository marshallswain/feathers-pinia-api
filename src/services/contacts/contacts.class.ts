import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Contacts, ContactsData, ContactsQuery } from './contacts.schema'

export interface ContactsParams extends MongoDBAdapterParams<ContactsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class ContactsService<ServiceParams extends Params = ContactsParams> extends MongoDBService<
  Contacts,
  ContactsData,
  ServiceParams
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('contacts')),
  }
}
