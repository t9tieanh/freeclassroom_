import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import qs from 'qs'
import { env } from '~/config/env'
import { UserModel } from '~/models'

import { GoogleOauthToken, GoogleUserResult } from '~/dto/request'
import ApiError from '~/middleware/ApiError'
import { UserRole, UserStatus } from '~/enums/user.enum'
import { GenerateSignature } from '~/utils/JwtUtil'
import { TokenType } from '~/enums/tokenType.enum'

// function dùng để exchance token -> dùng authorization code
const getGoogleOauthToken = async ({ code }: { code: string }): Promise<GoogleOauthToken> => {
  const rootURl = 'https://oauth2.googleapis.com/token'

  const options = {
    code,
    client_id: env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirect_uri: env.GOOGLE_OAUTH_REDIRECT,
    grant_type: 'authorization_code'
  }
  try {
    const { data } = await axios.post<GoogleOauthToken>(rootURl, qs.stringify(options), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    return data
  } catch (err: any) {
    console.log('Failed to fetch Google Oauth Tokens', err)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Đăng nhập Google thất bại !, vui lòng thử lại')
  }
}

// lấy thông tin user ở google authorization server
async function getGoogleUser({
  id_token,
  access_token
}: {
  id_token: string
  access_token: string
}): Promise<GoogleUserResult> {
  try {
    const { data } = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`
        }
      }
    )

    return data
  } catch (err: any) {
    console.log(err)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Đăng nhập Google thất bại !, vui lòng thử lại')
  }
}

const loginGoogle = async ({ code }: { code: string }) => {
  const { id_token, access_token } = await getGoogleOauthToken({ code })

  const userData = await getGoogleUser({
    id_token,
    access_token
  })

  // tìm kiếm user xem user này đã được onboard vào hệ thống chưa
  let user = await UserModel.findOne({ email: userData.email })

  // trường hợp user chưa được onboard vào hệ thống
  if (!user || !user.status) {
    // Tạo user mới
    const newUser = new UserModel({
      status: UserStatus.INACTIVE,
      email: userData.email,
      name: userData.name,
      image: userData.picture
    })

    user = await newUser.save()
  }

  if (user.status != UserStatus.ACTIVE) {
    // trường hợp user chưa được onboard vào hệ thống
    return {
      isActive: false,
      email: userData.email,
      name: userData.name,
      imageUrl: userData.picture // trả thêm picture
    }
  }

  // trường hợp user đã onboard vào hệ thống -> trả thêm token
  return {
    valid: true,
    email: user.email,
    name: user.name,
    role: user.role,
    image: user.image,
    username: user.username,
    accessToken: await GenerateSignature({
      userId: user.id,
      username: user.username as string,
      role: user.role as string,
      tokenType: TokenType.ACCESS_TOKEN
    }),
    refreshToken: await GenerateSignature({
      userId: user.id,
      username: user.username as string,
      role: user.role as string,
      tokenType: TokenType.RESFESH_TOKEN
    })
  }
}

const googleAuthService = {
  loginGoogle
}

export default googleAuthService
