import { IsString, IsNotEmpty } from 'class-validator'
import { TokenType } from '~/enums/tokenType.enum'

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export interface JwtPayloadDto {
  username: string
  role: string
  tokenType: TokenType
}
