import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import sendResponse from '~/dto/response/send-response'
import { AuthService } from '~/services'

const login = async (req: Request, res: Response) => {
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Đăng nhập thành công !',
    result: await AuthService.login(req.data)
  })
}

const AuthController = {
  login
}

export default AuthController
