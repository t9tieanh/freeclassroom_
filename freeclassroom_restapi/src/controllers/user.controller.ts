import { Request, Response } from 'express'
import sendResponse from '~/dto/response/send-response'
import { UserService } from '~/services'
import { StatusCodes } from 'http-status-codes'
import { JwtPayloadDto } from '~/dto/request'

const signUp = async (req: Request, res: Response) => {
  const result = await UserService.signUp(req.data)
  sendResponse(res, {
    code: StatusCodes.CREATED,
    message: 'Đăng ký thành công !',
    result: result
  })
}

const getProfile = async (req: Request, res: Response) => {
  const result = await UserService.getProfile(req.user as JwtPayloadDto)
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Lấy thông tin cá nhân thành công !',
    result: result
  })
}

const activeAccount = async (req: Request, res: Response) => {
  const result = await UserService.activeAccount(req.data)
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Đăng ký tài khoản thành công, vui lòng đăng nhập lại !',
    result: result
  })
}

const UserController = {
  signUp,
  getProfile,
  activeAccount
}

export default UserController
