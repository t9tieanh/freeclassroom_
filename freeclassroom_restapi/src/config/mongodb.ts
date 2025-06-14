import { Db, MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/env'

const MONGODB_URI: string = env.MONGODB_URI
const DATABASE_NAME: string = env.DATABASE_NAME

let trelloDatabaseInstance: Db | null = null

export const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  console.log(MONGODB_URI, DATABASE_NAME)

  await client.connect()
  trelloDatabaseInstance = client.db(DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) {
    throw new Error('Must cit the database first before using it')
  }
  return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
  if (trelloDatabaseInstance) {
    await client.close()
    trelloDatabaseInstance = null
  }
}
