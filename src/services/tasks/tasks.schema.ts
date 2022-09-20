import { schema, querySyntax } from '@feathersjs/schema'
import type { Infer } from '@feathersjs/schema'
import { ajv } from '../../schemas/ajv'

// Schema for the basic data model (e.g. creating new entries)
export const tasksDataSchema = schema(
  {
    $id: 'TasksData',
    type: 'object',
    additionalProperties: false,
    required: ['text'],
    properties: {
      description: { type: 'string' },
      isComplete: { type: 'boolean' },
      userId: {
        anyOf: [
          { type: 'string', format: 'objectid', convert: true },
          { type: 'object' }, // ObjectId
        ],
      },
    },
  } as const,
  ajv,
)

export type TasksData = Infer<typeof tasksDataSchema>

// Schema for making partial updates
export const tasksPatchSchema = schema(
  {
    $id: 'TasksPatch',
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: {
      ...tasksDataSchema.properties,
    },
  } as const,
  ajv,
)

export type TasksPatch = Infer<typeof tasksPatchSchema>

// Schema for the data that is being returned
export const tasksResultSchema = schema(
  {
    $id: 'TasksResult',
    type: 'object',
    additionalProperties: false,
    required: [...tasksDataSchema.required, '_id'],
    properties: {
      ...tasksDataSchema.properties,
      _id: {
        type: 'string',
      },
    },
  } as const,
  ajv,
)

export type TasksResult = Infer<typeof tasksResultSchema>

// Schema for allowed query properties
export const tasksQuerySchema = schema(
  {
    $id: 'TasksQuery',
    type: 'object',
    additionalProperties: false,
    properties: {
      ...querySyntax(tasksResultSchema.properties),
    },
  } as const,
  ajv,
)

export type TasksQuery = Infer<typeof tasksQuerySchema>
