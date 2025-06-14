import { Router, Request, Response, NextFunction } from 'express'
import { AuthController } from '~/controllers'

const router = Router()

router.get('/login', AuthController.login)

export default router
