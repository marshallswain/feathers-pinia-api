import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../schemas/validators'

// Main data model schema
export const userSchema = Type.Object(
  {
    _id: Type.String(),
    email: Type.String(),
    password: Type.Optional(Type.String()),
  },
  { $id: 'User', additionalProperties: false },
)
export type User = Static<typeof userSchema>
export const userResolver = resolve<User, HookContext>({
  properties: {},
})

export const userExternalResolver = resolve<User, HookContext>({
  properties: {
    // The password should never be visible externally
    password: async () => undefined,
  },
})

// Schema for the basic data model (e.g. creating new entries)
export const userDataSchema = Type.Pick(userSchema, ['email', 'password'], {
  $id: 'UserData',
  additionalProperties: false,
})
export type UserData = Static<typeof userDataSchema>
export const userDataValidator = getDataValidator(userDataSchema, dataValidator)
export const userDataResolver = resolve<User, HookContext>({
  properties: {
    password: passwordHash({ strategy: 'local' }),
  },
})

// Schema for allowed query properties
export const userQueryProperties = Type.Pick(userSchema, ['_id', 'email'])
export const userQuerySchema = querySyntax(userQueryProperties)
export type UserQuery = Static<typeof userQuerySchema>
export const userQueryValidator = getValidator(userQuerySchema, queryValidator)
export const userQueryResolver = resolve<UserQuery, HookContext>({
  properties: {
    // If there is a user (e.g. with authentication), they are only allowed to see their own data
    _id: async (value, user, context) => {
      if (context.params.user) {
        return context.params.user._id
      }

      return value
    },
  },
})
