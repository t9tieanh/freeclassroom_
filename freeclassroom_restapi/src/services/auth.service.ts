import { AuthDto, JwtPayloadDto } from '~/dto/request'
import { GenerateSignature } from '~/utils/JwtUtil'
import { UserModel } from '~/models'
import ApiError from '~/middleware/ApiError'
import { StatusCodes } from 'http-status-codes'
import { ValidatePassword } from '~/utils/BcryptUtil'
import { TokenType } from '~/enums/tokenType.enum'
import { UserStatus } from '~/enums/user.enum'

const login = async (request: AuthDto) => {
  // tìm kiếm user theo (email hoặc username đều được)
  const user = await UserModel.findOne({
    $or: [{ username: request.username }, { email: request.username }]
  }).select('+password')

  // user không tồn tại
  if (!user) throw new ApiError(StatusCodes.BAD_REQUEST, 'Người dùng không tồn tại !')

  // tài khoản chưa active
  if (user.status === UserStatus.INACTIVE || !user.role || !user.username || !user.password)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Tài khoản chưa được kích hoạt !')

  // validate password
  if (!(await ValidatePassword(request.password, user.password)))
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Tài khoản hoặc mật khẩu không chính xác !')

  // tạo jwt token
  return {
    accessToken: await GenerateSignature({
      username: user.username,
      role: user.role,
      tokenType: TokenType.ACCESS_TOKEN
    }),
    refreshToken: await GenerateSignature({
      username: user.username,
      role: user.role,
      tokenType: TokenType.RESFESH_TOKEN
    }),
    username: user.username,
    email: user.email,
    role: user.role,
    valid: true
  }
}

const authService = {
  login
}

export default authService
