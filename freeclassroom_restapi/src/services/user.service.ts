import { CreationUserDto, JwtPayloadDto } from '~/dto/request'
import { UserModel } from '~/models'
import ApiError from '~/middleware/ApiError'
import { StatusCodes } from 'http-status-codes'
import { GeneratePassword } from '~/utils/BcryptUtil'
import { UserRole, UserStatus } from '~/enums/user.enum'
import imageService from './image.service'
import { UploadStream } from 'cloudinary'

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

  // Lưu vào database
  const result = await newUser.save()
  return {
    email: result.email,
    username: result.username
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

// lấy thông tin acccount
const getProfile = async (user: JwtPayloadDto) => {
  return await UserModel.findOne({ username: user.username }).select('username role email name phone image -_id')
}

const UserService = {
  signUp,
  getProfile,
  activeAccount
}

export default UserService
