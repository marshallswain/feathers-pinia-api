import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../schemas/validators'

// Main data model schema
export const contactsSchema = Type.Object(
  {
    _id: Type.String(),
    first: Type.String(),
    last: Type.String(),
  },
  { $id: 'Contacts', additionalProperties: false },
)
export type Contacts = Static<typeof contactsSchema>
export const contactsResolver = resolve<Contacts, HookContext>({
  properties: {},
})

export const contactsExternalResolver = resolve<Contacts, HookContext>({
  properties: {},
})

// Schema for creating new entries
export const contactsDataSchema = Type.Pick(contactsSchema, ['first', 'last'], {
  $id: 'ContactsData',
  additionalProperties: false,
})
export type ContactsData = Static<typeof contactsDataSchema>
export const contactsDataValidator = getDataValidator(contactsDataSchema, dataValidator)
export const contactsDataResolver = resolve<Contacts, HookContext>({
  properties: {},
})

// Schema for allowed query properties
export const contactsQueryProperties = Type.Pick(contactsSchema, ['_id', 'first', 'last'], {
  additionalProperties: false,
})
export const contactsQuerySchema = querySyntax(contactsQueryProperties)
export type ContactsQuery = Static<typeof contactsQuerySchema>
export const contactsQueryValidator = getValidator(contactsQuerySchema, queryValidator)
export const contactsQueryResolver = resolve<ContactsQuery, HookContext>({
  properties: {},
})
