import { CreationUserDto, JwtPayloadDto } from '~/dto/request'
import { UserModel } from '~/models'
import ApiError from '~/middleware/ApiError'
import { StatusCodes } from 'http-status-codes'
import { GeneratePassword } from '~/utils/BcryptUtil'
import { UserRole, UserStatus } from '~/enums/user.enum'
import imageService from './image.service'
import Redis from '~/config/redis'
import { OTPUtil, OtpDto } from '~/utils/OTPUtil'

const signUp = async (request: CreationUserDto) => {
  const isExisted = await UserModel.exists({
    $or: [{ email: request.email }, { username: request.username }]
  })
  if (isExisted) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Người dùng đã tồn tại!')
  }

  // lưu avartar của user vào cloundinary
  const uploadImageUrl = await imageService.uploadImage(request.image, request.fileName)

  // Hash password
  request.password = await GeneratePassword(request.password)

  // Tạo user mới
  const newUser = new UserModel({
    username: request.username,
    password: request.password,
    role: request.role,
    status: UserStatus.INACTIVE,
    email: request.email,
    image: uploadImageUrl,
    name: request.name,
    phone: request.phone,
    // Optional fields for teacher
    description: request.role === UserRole.TEACHER ? 'Chưa có' : undefined,
    position: request.role === UserRole.TEACHER ? 'Chưa có' : undefined
  })

  // Lưu vào database -> hoàn thành bước lưu user
  const result = await newUser.save()

  // tiếp theo -> tạo mã otp
  // Tạo mã otp cho User
  const otp = OTPUtil.create()

  // lưu otp vào redis
  const client = Redis.getRedisClient()
  await client.set(`otp:${result.username}`, JSON.stringify(otp), { EX: OTPUtil.OTP_TTL_SECONDS })

  return {
    email: result.email,
    username: result.username,
    expireDateTime: OTPUtil.getExpireDateTime(otp)
  }
}

//active lại account
const activeAccount = async (user: CreationUserDto) => {
  // validate username
  if (await UserModel.exists({ username: user.username }))
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Username đã tồn tại !')

  // Hash password
  user.password = await GeneratePassword(user.password)

  return await UserModel.findOneAndUpdate(
    { email: user.email },
    {
      username: user.username,
      password: user.password,
      role: user.role,
      status: UserStatus.ACTIVE,
      name: user.name,
      phone: user.phone,
      // Optional fields for teacher
      description: user.role === UserRole.TEACHER ? 'Chưa có' : undefined,
      position: user.role === UserRole.TEACHER ? 'Chưa có' : undefined
    },
    { new: true }
  )
}

// phương thức active account dùng otp
const activateByOtp = async (user: CreationUserDto) => {
  // lấy otp từ redis
  const client = Redis.getRedisClient()
  const otpRaw = await client.get(`otp:${user.username}`)

  // -> trường hợp không có otp trong db redis
  if (!otpRaw) throw new ApiError(StatusCodes.BAD_REQUEST, 'Mã otp đã hết hạn, xin vui lòng đăng ký lại !')

  const otp: OtpDto = JSON.parse(otpRaw)
  otp.createdAt = new Date(otp.createdAt)

  // validate otp
  const result = OTPUtil.validate(otp, user.otp)

  if (!result.success) {
    // Validate không thành công ⇒ đã tăng otp.attempts trong OTPUtil.validate()

    // 1) Tính TTL còn lại (giây)
    const elapsedSecond = (Date.now() - otp.createdAt.getTime()) / 1000
    const remainingSec = Math.max(0, OTPUtil.OTP_TTL_SECONDS - elapsedSecond)

    // 2) Chỉ update nếu còn TTL
    if (remainingSec > 0) {
      // Ghi lại session vào Redis với TTL mới (làm tròn lên)
      await client.set(`otp:${user.username}`, JSON.stringify(otp), { EX: Math.ceil(remainingSec) })
    }

    throw new ApiError(StatusCodes.BAD_REQUEST, result.reason)
  }

  // trường hợp thành công !
  // xóa otp code
  await client.del(`otp:${user.username}`)
  // update status của account
  return await UserModel.findOneAndUpdate(
    { username: user.username },
    {
      status: UserStatus.ACTIVE
    },
    { new: true }
  )
}

// lấy thông tin acccount
const getProfile = async (user: JwtPayloadDto) => {
  return await UserModel.findOne({ username: user.username }).select('username role email name phone image -_id')
}

const UserService = {
  signUp,
  getProfile,
  activeAccount,
  activateByOtp
}

export default UserService
