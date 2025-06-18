import { Router } from 'express'
import { CreationUserDto } from '~/dto/request'
import { authenticate, ValidateDto } from '~/middleware'
import { UserController } from '~/controllers'
import upload from '~/utils/multerUtil'

const router = Router()

router.post('/sign-up', upload.single('image'), ValidateDto(CreationUserDto), UserController.signUp)
router.post('/active-account', upload.single('image'), ValidateDto(CreationUserDto), UserController.activeAccount)
//router.post('/active-account')

// route authenticate
router.use(authenticate)

router.get('/get-profile', UserController.getProfile)

export default router
