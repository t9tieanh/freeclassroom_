import amqp, { Channel } from 'amqplib'
import { env } from '~/config/env'
import { QueueNameEnum } from '~/enums/rabbitQueue.enum'
import NotificationService from '~/services/notification.service'
import { NewSectionNotificationDto, NotificationDto } from '~/dto/request/notification.dto'

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

  // Tạo kết nối và channel -> đăng ký consumer để lắng nghe data trên queue
  private static async createConnection(): Promise<void> {
    try {
      const uri = `${RabbitMQConf.protocol}://${RabbitMQConf.username}:${RabbitMQConf.password}@${RabbitMQConf.hostname}:${RabbitMQConf.port}${RabbitMQConf.vhost}`
      RabbitClient.connection = await amqp.connect(uri)
      RabbitClient.channel = await RabbitClient.connection.createChannel()

      // Đảm bảo queue tồn tại
      if (!RabbitClient.channel) {
        throw new Error('RabbitMQ channel is not initialized')
      }
      await RabbitClient.channel.assertQueue(QueueNameEnum.CLASSROOM_NOTIFICATION, { durable: true })

      // đăng ký consume cho notification service
      RabbitClient.channel.consume(QueueNameEnum.CLASSROOM_NOTIFICATION, async (data) => {
        if (!data) return

        try {
          const parsed: NewSectionNotificationDto = JSON.parse(data.content.toString())

          // send với
          await NotificationService.send(parsed)

          RabbitClient.channel?.ack(data) // xác nhận xử lý xong
        } catch (err) {
          console.error('Lỗi xử lý notification message:', err)
          // gọi nack để retry
          RabbitClient.channel?.nack(data, false, true)
        }
      })

      console.log('Connection to RabbitMQ established')
    } catch (error) {
      console.error('RabbitMQ connection failed:', error)
      throw new Error('RabbitMQ connection failed')
    }
  }

  // Gửi message tới queue
  public static async sendMessage(data: NotificationDto, queueName: QueueNameEnum): Promise<boolean> {
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
