import { googleAuthService } from '~/services'
import { Request, Response } from 'express'
import ApiError from '~/middleware/ApiError'
import { StatusCodes } from 'http-status-codes'
import sendResponse from '~/dto/response/send-response'

const googleOauthHandler = async (req: Request, res: Response) => {
  try {
    // lấy authorization code
    const code = req.query.code as string

    if (!code) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Không tìm thấy authorization code !')
    }

    const result = await googleAuthService.loginGoogle({ code })

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Xác thực google thành công !',
      result: result
    })
  } catch (err: any) {
    console.log(err)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Đăng nhập Google thất bại !, vui lòng thử lại')
  }
}

const googleAuthController = {
  googleOauthHandler
}

export default googleAuthController
