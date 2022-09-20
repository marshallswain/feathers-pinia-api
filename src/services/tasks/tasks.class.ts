import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams } from '@feathersjs/mongodb'
import { resolveAll } from '@feathersjs/schema'

import type { TasksData, TasksResult, TasksQuery } from './tasks.schema'
import { tasksResolvers } from './tasks.resolver'

export const tasksHooks = {
  around: {
    all: [resolveAll(tasksResolvers)]
  },
  before: {},
  after: {},
  error: {}
}

export interface TasksParams extends MongoDBAdapterParams<TasksQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class TasksService extends MongoDBService<TasksResult, TasksData, TasksParams> {}
