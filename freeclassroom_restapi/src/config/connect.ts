import CONNECT_DB from './mongodb'
import Redis from './redis'

export const CONNECT_DATABASES = async (): Promise<void> => {
  try {
    await CONNECT_DB().then(() => console.log('Connected MongoDB'))

    await Redis.CONNECT_REDIS_DB().then(() => console.log('Connected Redis'))
  } catch (err: any) {
    console.error('Database connection failed:', err)
    process.exit(1)
  }
}
