import { Types } from 'mongoose'
import { JwtPayloadDto } from '~/dto/request'
import { CreationPostDto } from '~/dto/request/post.dto'
import { PostType } from '~/enums/post.enum'
import { PostModel } from '~/models'

const createPost = async (newPostDto: CreationPostDto, user: JwtPayloadDto) => {
  const newPost = new PostModel({
    ...newPostDto,
    createBy: new Types.ObjectId(user.userId),
    sectionId: new Types.ObjectId(newPostDto.sectionId)
  })

  return await newPost.save()
}

const getPostsBySection = async (sectionId: string) => {
  const posts = await PostModel.find({
    sectionId: new Types.ObjectId(sectionId)
  }).populate('createBy', 'email name -_id')

  return posts
}

const PostService = {
  createPost,
  getPostsBySection
}

export default PostService
