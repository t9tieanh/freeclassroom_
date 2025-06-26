import express, { Router, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import AuthRouter from './auth.routes'
import UserRouter from './user.routes'
import ClassRoomRouter from './classroom.routes'
import PostRouter from './post.routes'
import RabbitClient from '~/config/rabbitmq'
import { QueueNameEnum } from '~/enums/rabbitQueue.enum'

const IndexRouter: Router = express.Router()

IndexRouter.route('/status').get(async (req: Request, res: Response) => {
  await RabbitClient.sendMessage('hello i am phamtienanh', QueueNameEnum.CLASSROOM_NOTIFICATION)

  res.status(StatusCodes.OK).json({
    message: 'Status Ok, Welcome to the Board API Home'
  })
})

IndexRouter.use('/auth', AuthRouter)
IndexRouter.use('/users', UserRouter)
IndexRouter.use('/classroom', ClassRoomRouter)
IndexRouter.use('/post', PostRouter)
export default IndexRouter
