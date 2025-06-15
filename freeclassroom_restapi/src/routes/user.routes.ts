import { Router, Request, Response, NextFunction } from 'express'
import { CreationUserDto } from '~/dto/request'
import { authenticate, ValidateDto } from '~/middleware'
import { UserController } from '~/controllers'

const router = Router()

router.post('/sign-up', ValidateDto(CreationUserDto), UserController.signUp)

// route authenticate
router.use(authenticate)

router.get('/get-profile', UserController.getProfile)

export default router
