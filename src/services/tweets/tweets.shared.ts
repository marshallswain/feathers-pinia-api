// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Tweets, TweetsData, TweetsPatch, TweetsQuery, TweetsService } from './tweets.class'

export type { Tweets, TweetsData, TweetsPatch, TweetsQuery }

export type TweetsClientService = Pick<TweetsService<Params<TweetsQuery>>, (typeof tweetsMethods)[number]>

export const tweetsPath = 'tweets'

export const tweetsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const tweetsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(tweetsPath, connection.service(tweetsPath), {
    methods: tweetsMethods,
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [tweetsPath]: TweetsClientService
  }
}
