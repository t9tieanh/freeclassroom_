import { IsString, IsOptional, IsNotEmpty, IsArray, ValidateNested, IsUrl } from 'class-validator'
import { Type } from 'class-transformer'
import singleImageUploadDto from './singleImageUpload.dto'

class TagDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsUrl()
  iconUrl: string
}

export class CreationClassroomDto extends singleImageUploadDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  unit?: string

  @IsString()
  @IsNotEmpty()
  code: string

  @IsOptional()
  @IsString()
  detail?: string

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  tags?: TagDto[]
}

// dto chứa request tham gia lớp học của một student
export class JoinClassroomDto {
  @IsString()
  @IsNotEmpty()
  classRoomCode: string
}
