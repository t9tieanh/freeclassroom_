import express, { Router, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import AuthRouter from './auth.routes'
import UserRouter from './user.routes'
import ClassRoomRouter from './classroom.routes'

const IndexRouter: Router = express.Router()

IndexRouter.route('/status').get((req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    message: 'Status Ok, Welcome to the Board API Home'
  })
})

IndexRouter.use('/auth', AuthRouter)
IndexRouter.use('/users', UserRouter)
IndexRouter.use('/classroom', ClassRoomRouter)
export default IndexRouter
