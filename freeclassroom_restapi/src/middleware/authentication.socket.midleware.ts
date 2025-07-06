import { Socket } from 'socket.io'
import { ValidateSignature } from '~/utils/JwtUtil'
import { TokenType } from '~/enums/tokenType.enum'
import ApiError from '~/middleware/ApiError'
import { StatusCodes } from 'http-status-codes'

const authenticate = async (socket: Socket, next: (err?: Error) => void) => {
  try {
    const token = socket.handshake.auth.token
    if (!token) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Người dùng không được xác thực !'))
    }

    const payload = await ValidateSignature(token, TokenType.ACCESS_TOKEN)
    socket.user = payload

    return next() // quan trọng để tiếp tục kết nối
  } catch (e: any) {
    return next(new ApiError(StatusCodes.UNAUTHORIZED, e.message))
  }
}

export default authenticate
