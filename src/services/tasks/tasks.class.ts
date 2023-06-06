// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Tasks, TasksData, TasksPatch, TasksQuery } from './tasks.schema'

export type { Tasks, TasksData, TasksPatch, TasksQuery }

export interface TasksParams extends MongoDBAdapterParams<TasksQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class TasksService<ServiceParams extends Params = TasksParams> extends MongoDBService<
  Tasks,
  TasksData,
  TasksParams,
  TasksPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('tasks'))
  }
}
