import amqp, { Channel } from 'amqplib'
import { env } from '~/config/env'

const RabbitMQConf = {
  protocol: 'amqp',
  hostname: env.RABBIT_MQ_HOST,
  port: env.RABBIT_MQ_PORT,
  username: env.RABBIT_MQ_USER_NAME,
  password: env.RABBIT_MQ_PASSWORD,
  authMechanism: 'AMQPLAIN',
  vhost: '/'
}

class RabbitClient {
  private static instance: RabbitClient
  private static connection: any | null = null
  private static channel: Channel | null = null

  private constructor() {
    // private để ép buộc singleton
  }

  // Singleton accessor
  public static async getInstance(): Promise<RabbitClient> {
    if (!RabbitClient.instance) {
      RabbitClient.instance = new RabbitClient()
      await RabbitClient.createConnection()
    }
    return RabbitClient.instance
  }

  // Tạo kết nối và channel
  private static async createConnection(): Promise<void> {
    try {
      const uri = `${RabbitMQConf.protocol}://${RabbitMQConf.username}:${RabbitMQConf.password}@${RabbitMQConf.hostname}:${RabbitMQConf.port}${RabbitMQConf.vhost}`
      RabbitClient.connection = await amqp.connect(uri)
      RabbitClient.channel = await RabbitClient.connection.createChannel()
      console.log('Connection to RabbitMQ established')
    } catch (error) {
      console.error('RabbitMQ connection failed:', error)
    }
  }

  // Gửi message tới queue
  public static async sendMessage(data: any, queueName: string): Promise<boolean> {
    try {
      if (!RabbitClient.channel) {
        throw new Error('RabbitMQ channel is not initialized')
      }

      // Đảm bảo queue tồn tại
      await RabbitClient.channel.assertQueue(queueName, { durable: true })

      const msgBuffer = Buffer.from(JSON.stringify(data))
      const sent = RabbitClient.channel.sendToQueue(queueName, msgBuffer)
      console.log('Message sent to RabbitMQ')
      return sent
    } catch (error) {
      console.error('Failed to send message:', error)
      return false
    }
  }
}

export default RabbitClient
