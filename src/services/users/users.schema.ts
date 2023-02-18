// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const usersSchema = Type.Object(
  {
    _id: Type.String(),
    email: Type.String(),
    password: Type.Optional(Type.String())
  },
  { $id: 'Users', additionalProperties: false },
)
export type Users = Static<typeof usersSchema>
export const usersValidator = getValidator(usersSchema, dataValidator)
export const usersResolver = resolve<Users, HookContext>({})

export const usersExternalResolver = resolve<Users, HookContext>({
  // The password should never be visible externally
  password: async () => undefined
})

// Schema for creating new entries
export const usersDataSchema = Type.Pick(usersSchema, ['email', 'password'], {
  $id: 'UsersData',
})
export type UsersData = Static<typeof usersDataSchema>
export const usersDataValidator = getValidator(usersDataSchema, dataValidator)
export const usersDataResolver = resolve<Users, HookContext>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for updating existing entries
export const usersPatchSchema = Type.Partial(usersDataSchema, {
  $id: 'UsersPatch',
})
export type UsersPatch = Static<typeof usersPatchSchema>
export const usersPatchValidator = getValidator(usersPatchSchema, dataValidator)
export const usersPatchResolver = resolve<Users, HookContext>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for allowed query properties
export const usersQueryProperties = Type.Pick(usersSchema, ['_id', 'email'])
export const usersQuerySchema = Type.Intersect(
  [
    querySyntax(usersQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
)
export type UsersQuery = Static<typeof usersQuerySchema>
export const usersQueryValidator = getValidator(usersQuerySchema, queryValidator)
export const usersQueryResolver = resolve<UsersQuery, HookContext>({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  _id: async (value, user, context) => {
    if (context.params.user) {
      return context.params.user._id
    }

    return value
  }
})
