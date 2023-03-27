// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const contactsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    firstName: Type.Optional(Type.String()),
    lastName: Type.Optional(Type.String()),
    email: Type.Optional(Type.String()),
    phone: Type.Optional(Type.String()),
    address1: Type.Optional(Type.String()),
    city: Type.Optional(Type.String()),
    state: Type.Optional(Type.String()),
    zip: Type.Optional(Type.String()),
    country: Type.Optional(Type.String()),
  },
  { $id: 'Contacts', additionalProperties: false },
)
export type Contacts = Static<typeof contactsSchema>
export const contactsValidator = getValidator(contactsSchema, dataValidator)
export const contactsResolver = resolve<Contacts, HookContext>({})

export const contactsExternalResolver = resolve<Contacts, HookContext>({})

// Schema for creating new entries
export const contactsDataSchema = Type.Omit(contactsSchema, ['_id'], {
  $id: 'ContactsData',
})
export type ContactsData = Static<typeof contactsDataSchema>
export const contactsDataValidator = getValidator(contactsDataSchema, dataValidator)
export const contactsDataResolver = resolve<Contacts, HookContext>({})

// Schema for updating existing entries
export const contactsPatchSchema = Type.Partial(contactsSchema, {
  $id: 'ContactsPatch',
})
export type ContactsPatch = Static<typeof contactsPatchSchema>
export const contactsPatchValidator = getValidator(contactsPatchSchema, dataValidator)
export const contactsPatchResolver = resolve<Contacts, HookContext>({})

// Schema for allowed query properties
export const contactsQueryProperties = Type.Omit(contactsSchema, ['_id'])
export const contactsQuerySchema = Type.Intersect(
  [
    querySyntax(contactsQueryProperties, {
      firstName: {
        $regex: Type.Optional(Type.String()),
        $options: Type.Optional(Type.String()),
      },
      lastName: {
        $regex: Type.Optional(Type.String()),
        $options: Type.Optional(Type.String()),
      },
    }),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
)
export type ContactsQuery = Static<typeof contactsQuerySchema>
export const contactsQueryValidator = getValidator(contactsQuerySchema, queryValidator)
export const contactsQueryResolver = resolve<ContactsQuery, HookContext>({})
