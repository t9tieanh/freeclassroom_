import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { AuthDto } from '~/dto/request/Auth.dto'
import sendResponse from '~/utils/send-response'
import { AuthService } from '~/services'

const login = async (req: Request, res: Response) => {
  const authDto: AuthDto = plainToClass(AuthDto, req.body)

  sendResponse(res, {
    code: 200,
    message: 'Login successfully',
    data: await AuthService.login(authDto)
  })
}

const AuthController = {
  login
}

export default AuthController
