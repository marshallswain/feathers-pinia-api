import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Tasks, TasksData, TasksQuery } from './tasks.schema'

export interface TasksParams extends MongoDBAdapterParams<TasksQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class TasksService<ServiceParams extends Params = TasksParams> extends MongoDBService<
  Tasks,
  TasksData,
  ServiceParams
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('tasks')),
  }
}
