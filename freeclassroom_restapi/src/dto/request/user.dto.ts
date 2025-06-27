import { UserStatus, UserRole } from '~/enums/user.enum'
import { IsEmail, IsString, IsNotEmpty, IsEnum, MinLength, IsOptional } from 'class-validator'
import SingleImageUploadDto from './singleImageUpload.dto'

export default class CreationUserDto extends SingleImageUploadDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsOptional()
  email: string

  @IsString()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsOptional()
  name: string

  @IsString()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsOptional()
  phone: string

  @IsString()
  @IsNotEmpty({ message: 'Username không được để trống' })
  username: string

  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải chứa ít nhất 6 ký tự' })
  @IsOptional()
  password: string

  @IsEnum(UserRole, { message: 'Vai trò không hợp lệ' })
  @IsOptional()
  role: UserRole

  @IsOptional()
  otp: string
}
