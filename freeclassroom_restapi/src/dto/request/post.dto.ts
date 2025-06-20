import { IsString } from 'class-validator'
import { PostType } from '~/enums/post.enum'

export class CreationPostDto {
  @IsString()
  title: string

  @IsString()
  content?: string

  postType: PostType

  @IsString()
  sectionId: string
}
