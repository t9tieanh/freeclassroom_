import { CreationUserDto, JwtPayloadDto } from '~/dto/request'
import { UserModel } from '~/models'
import ApiError from '~/middleware/ApiError'
import { StatusCodes } from 'http-status-codes'
import { GeneratePassword } from '~/utils/BcryptUtil'
import { UserRole } from '~/enums/user.enum'
import imageService from './image.service'

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
    status: request.status,
    email: request.email,
    image: uploadImageUrl,
    name: request.name,
    phone: request.phone,
    // Optional fields for teacher
    description: request.role === UserRole.TEACHER ? 'Chưa có' : undefined,
    position: request.role === UserRole.TEACHER ? 'Chưa có' : undefined
  })

  // Lưu vào database
  const result = await newUser.save()
  return {
    email: result.email,
    username: result.username
  }
}

const getProfile = async (user: JwtPayloadDto) => {
  return await UserModel.findOne({ username: user.username }).select('username role email name phone image -_id')
}

const UserService = {
  signUp,
  getProfile
}

export default UserService
