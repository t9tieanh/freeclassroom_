import { UserStatus, UserRole } from '~/enums/user.enum'
import { IsEmail, IsString, IsNotEmpty, IsEnum, IsOptional, Matches } from 'class-validator'

export default class CreationUserDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string

  @IsString()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string

  @IsString()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phone: string

  @IsString()
  @IsOptional()
  image: string

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

  // File upload thường không được validate bởi class-validator trực tiếp.
  // Nhưng bạn có thể bỏ qua hoặc xử lý riêng qua middleware như Multer.
  @IsOptional()
  imageFile: File
}
