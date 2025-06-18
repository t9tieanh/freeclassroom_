import { Router } from 'express'
import { AuthController } from '~/controllers'
import { AuthDto } from '~/dto/request'
import { ValidateDto } from '~/middleware'
import { googleAuthController } from '~/controllers'

const router = Router()

router.post('/login', ValidateDto(AuthDto), AuthController.login)
router.get('/oauth/google', googleAuthController.googleOauthHandler)

export default router
