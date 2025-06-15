import { Router, Request, Response } from 'express'
import { AuthController } from '~/controllers'
import { AuthDto } from '~/dto/request'
import { ValidateDto } from '~/middleware'

const router = Router()

router.get('/login', ValidateDto(AuthDto), AuthController.login)

export default router
