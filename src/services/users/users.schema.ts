import { schema, querySyntax } from '@feathersjs/schema'
import type { Infer } from '@feathersjs/schema'
import { ajv } from '../../schemas/ajv'

// Schema for the basic data model (e.g. creating new entries)
export const usersDataSchema = schema(
  {
    $id: 'UsersData',
    type: 'object',
    additionalProperties: false,
    required: ['email'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    },
  } as const,
  ajv,
)

export type UsersData = Infer<typeof usersDataSchema>

// Schema for making partial updates
export const usersPatchSchema = schema(
  {
    $id: 'UsersPatch',
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: {
      ...usersDataSchema.properties,
    },
  } as const,
  ajv,
)

export type UsersPatch = Infer<typeof usersPatchSchema>

// Schema for the data that is being returned
export const usersResultSchema = schema(
  {
    $id: 'UsersResult',
    type: 'object',
    additionalProperties: false,
    required: ['_id'],
    properties: {
      ...usersDataSchema.properties,
      _id: {
        type: 'string',
      },
    },
  } as const,
  ajv,
)

export type UsersResult = Infer<typeof usersResultSchema>

// Queries shouldn't allow doing anything with the password
const { password, ...usersQueryProperties } = usersResultSchema.properties

// Schema for allowed query properties
export const usersQuerySchema = schema(
  {
    $id: 'UsersQuery',
    type: 'object',
    additionalProperties: false,
    properties: {
      ...querySyntax(usersQueryProperties),
    },
  } as const,
  ajv,
)

export type UsersQuery = Infer<typeof usersQuerySchema>
