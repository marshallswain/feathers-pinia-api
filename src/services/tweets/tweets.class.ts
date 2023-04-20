// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Tweets, TweetsData, TweetsPatch, TweetsQuery } from './tweets.schema'

export type { Tweets, TweetsData, TweetsPatch, TweetsQuery }

export interface TweetsParams extends MongoDBAdapterParams<TweetsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class TweetsService<ServiceParams extends Params = TweetsParams> extends MongoDBService<
  Tweets,
  TweetsData,
  TweetsParams,
  TweetsPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('tweets')),
  }
}
