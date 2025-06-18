import { IsString, IsOptional, IsNotEmpty, IsArray, ValidateNested, IsUrl } from 'class-validator'
import { Type } from 'class-transformer'

class TagDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsUrl()
  iconUrl: string
}

export class CreationClassroomDto {
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

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  coverImage: string

  @IsString()
  @IsNotEmpty()
  teacher: string

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  tags?: TagDto[]
}
