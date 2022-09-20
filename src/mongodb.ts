import { MongoClient } from 'mongodb'
import type { Db } from 'mongodb'
import type { Application } from './declarations'

declare module './declarations' {
  interface Configuration {
    mongodbClient: Promise<Db>
  }
}

export const mongodb = (app: Application) => {
  const connection = app.get('mongodb') as string
  const database = connection.substring(connection.lastIndexOf('/') + 1)
  const mongoClient = MongoClient.connect(connection).then((client) => client.db(database))

  app.set('mongodbClient', mongoClient)
}
