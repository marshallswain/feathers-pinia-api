// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { faker } from '@faker-js/faker'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const tweetsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    text: Type.String(),
    commentCount: Type.Number(),
    retweetCount: Type.Number(),
    likeCount: Type.Number(),
    viewCount: Type.Number(),
    createdAt: Type.Number(),
  },
  { $id: 'Tweets', additionalProperties: false },
)
export type Tweets = Static<typeof tweetsSchema>
export const tweetsValidator = getValidator(tweetsSchema, dataValidator)
export const tweetsResolver = resolve<Tweets, HookContext>({})

export const tweetsExternalResolver = resolve<Tweets, HookContext>({})

// Schema for creating new entries
export const tweetsDataSchema = Type.Pick(tweetsSchema, ['name', 'text'], {
  $id: 'TweetsData',
})
export type TweetsData = Static<typeof tweetsDataSchema>
export const tweetsDataValidator = getValidator(tweetsDataSchema, dataValidator)
export const tweetsDataResolver = resolve<Tweets, HookContext>({
  commentCount: async () => faker.datatype.number({ min: 0, max: 50 }),
  retweetCount: async () => faker.datatype.number({ min: 0, max: 100 }),
  likeCount: async () => faker.datatype.number({ min: 0, max: 500 }),
  viewCount: async () => faker.datatype.number({ min: 0, max: 1500 }),
  createdAt: async () => new Date().getTime(),
})

// Schema for updating existing entries
export const tweetsPatchSchema = Type.Partial(tweetsSchema, {
  $id: 'TweetsPatch',
})
export type TweetsPatch = Static<typeof tweetsPatchSchema>
export const tweetsPatchValidator = getValidator(tweetsPatchSchema, dataValidator)
export const tweetsPatchResolver = resolve<Tweets, HookContext>({})

// Schema for allowed query properties
export const tweetsQueryProperties = Type.Pick(tweetsSchema, ['_id', 'text', 'createdAt'])
export const tweetsQuerySchema = Type.Intersect(
  [
    querySyntax(tweetsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
)
export type TweetsQuery = Static<typeof tweetsQuerySchema>
export const tweetsQueryValidator = getValidator(tweetsQuerySchema, queryValidator)
export const tweetsQueryResolver = resolve<TweetsQuery, HookContext>({})
