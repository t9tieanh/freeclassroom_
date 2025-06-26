import CONNECT_DB from './mongodb'
import Redis from './redis'
import RabbitClient from './rabbitmq'

export const CONNECT_DATABASES = async (): Promise<void> => {
  try {
    await CONNECT_DB().then(() => console.log('Connected MongoDB'))
    await Redis.CONNECT_REDIS_DB().then(() => console.log('Connected Redis'))
    await RabbitClient.getInstance().then(() => console.log('Connected RabbitMQ'))
  } catch (err: any) {
    console.error('Database connection failed:', err)
    process.exit(1)
  }
}
