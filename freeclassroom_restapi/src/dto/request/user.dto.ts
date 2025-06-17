import { UserStatus, UserRole } from '~/enums/user.enum'
import { IsEmail, IsString, IsNotEmpty, IsEnum, IsOptional, Matches } from 'class-validator'
import SingleImageUploadDto from './SingleImageUpload.dto'

export default class CreationUserDto extends SingleImageUploadDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string

  @IsString()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string

  @IsString()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phone: string

  @IsString()
  @IsNotEmpty({ message: 'Username không được để trống' })
  username: string

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/, {
    message: 'Mật khẩu phải chứa ít nhất 6 ký tự, gồm chữ hoa, thường và số'
  })
  password: string

  @IsEnum(UserRole, { message: 'Vai trò không hợp lệ' })
  role: UserRole

  @IsEnum(UserStatus, { message: 'Trạng thái không hợp lệ' })
  status: UserStatus
}
