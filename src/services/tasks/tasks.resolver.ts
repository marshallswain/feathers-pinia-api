import { resolve } from '@feathersjs/schema'
import type { HookContext } from '../../declarations'

import type { TasksData, TasksPatch, TasksResult, TasksQuery } from './tasks.schema'
import { tasksDataSchema, tasksPatchSchema, tasksResultSchema, tasksQuerySchema } from './tasks.schema'

// Resolver for the basic data model (e.g. creating new entries)
export const tasksDataResolver = resolve<TasksData, HookContext>({
  schema: tasksDataSchema,
  validate: 'before',
  properties: {} as never,
})

// Resolver for making partial updates
export const tasksPatchResolver = resolve<TasksPatch, HookContext>({
  schema: tasksPatchSchema,
  validate: 'before',
  properties: {} as never,
})

// Resolver for the data that is being returned
export const tasksResultResolver = resolve<TasksResult, HookContext>({
  schema: tasksResultSchema,
  validate: false,
  properties: {} as never,
})

// Resolver for query properties
export const tasksQueryResolver = resolve<TasksQuery, HookContext>({
  schema: tasksQuerySchema,
  validate: 'before',
  properties: {},
})

// Export all resolvers in a format that can be used with the resolveAll hook
export const tasksResolvers = {
  result: tasksResultResolver,
  data: {
    create: tasksDataResolver,
    update: tasksDataResolver,
    patch: tasksPatchResolver,
  },
  query: tasksQueryResolver,
}
