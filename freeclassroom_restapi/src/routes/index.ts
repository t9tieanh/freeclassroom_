import express, { Router, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import AuthRouter from './auth.routes'
import UserRouter from './user.routes'
import ClassRoomRouter from './classroom.routes'
import PostRouter from './post.routes'
import RabbitClient from '~/config/rabbitmq'
import { QueueNameEnum } from '~/enums/rabbitQueue.enum'

const IndexRouter: Router = express.Router()

const data = {
  email: ['student01@example.com', '22110282@student.hcmute.edu.vn'],
  name: 'Nguyễn Văn A',
  className: 'Lập trình Node.js cơ bản',
  sectionName: 'Giới thiệu về Express.js'
}

IndexRouter.route('/status').get(async (req: Request, res: Response) => {
  await RabbitClient.sendMessage(data, QueueNameEnum.CLASSROOM_NOTIFICATION)

  res.status(StatusCodes.OK).json({
    message: 'Status Ok, Welcome to the Board API Home'
  })
})

IndexRouter.use('/auth', AuthRouter)
IndexRouter.use('/users', UserRouter)
IndexRouter.use('/classroom', ClassRoomRouter)
IndexRouter.use('/post', PostRouter)
export default IndexRouter
