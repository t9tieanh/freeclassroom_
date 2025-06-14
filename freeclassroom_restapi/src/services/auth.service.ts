import { AuthDto, JwtPayloadDto } from '~/dto/request/Auth.dto'
import { GenerateSignature } from '~/utils/JwtUtil'

const login = async (request: AuthDto) => {
  // giả lập dữ liệu đăng nhập thành công

  const jwtPayload: JwtPayloadDto = {
    username: 'phamtienanh',
    role: 'student'
  }

  // tạo jwt token
  return GenerateSignature(jwtPayload)
}

const authService = {
  login
}

export default authService
