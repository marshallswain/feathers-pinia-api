import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams } from '@feathersjs/mongodb'
import { resolveAll } from '@feathersjs/schema'
import { authenticate } from '@feathersjs/authentication'
import type { UsersData, UsersResult, UsersQuery } from './users.schema'
import { usersResolvers } from './users.resolver'

export const usersHooks = {
  around: {
    all: [],
    get: [
      // authenticate('jwt'), resolveAll(usersResolvers)
    ],
    find: [
      // authenticate('jwt'), resolveAll(usersResolvers)
    ],
    create: [
      // resolveAll(usersResolvers)
    ],
    patch: [
      // authenticate('jwt'), resolveAll(usersResolvers)
    ],
    update: [
      // authenticate('jwt'), resolveAll(usersResolvers)
    ],
    remove: [
      // authenticate('jwt'), resolveAll(usersResolvers)
    ],
  },
  before: {},
  after: {},
  error: {},
}

export interface UsersParams extends MongoDBAdapterParams<UsersQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class UsersService extends MongoDBService<UsersResult, UsersData, UsersParams> {}
