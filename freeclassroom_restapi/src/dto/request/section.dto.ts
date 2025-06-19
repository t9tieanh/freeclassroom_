import { IsString, IsOptional } from 'class-validator'

export class CreationSectionDto {
  @IsString()
  classRoomId: string

  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  content: string

  emphasized: boolean
}
