import { Types } from 'mongoose'
import { JwtPayloadDto } from '~/dto/request'
import { CreationPostDto } from '~/dto/request/post.dto'
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

const findPostById = async (postId: string) => {
  const post = await PostModel.findOne({
    _id: new Types.ObjectId(postId)
  }).populate('createBy', 'email name image -_id')

  return post
}

const PostService = {
  createPost,
  getPostsBySection,
  findPostById
}

export default PostService
