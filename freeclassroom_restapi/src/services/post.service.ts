import { Types } from 'mongoose'
import { JwtPayloadDto } from '~/dto/request'
import { CreationPostDto } from '~/dto/request/post.dto'
import { PostModel } from '~/models'
import Redis from '~/config/redis'
import { NOTFOUND_CACHE, POST_CACHE } from '~/utils/constants'

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
  // thực hiện tìm trong cache
  const client = Redis.getRedisClient()
  const keyCache = `${POST_CACHE}${postId}`

  let post: any = await client.get(keyCache)

  // -> cache hit
  if (post) return post

  post = await PostModel.findOne({
    _id: new Types.ObjectId(postId)
  }).populate('createBy', 'email name image -_id')

  if (!post) post = NOTFOUND_CACHE

  // set lại vào cache ( không có trong database vẫn set cái này lại cho cache )
  await client.set(keyCache, JSON.stringify(post), {
    EX: 1800 // thời gian sống là 30 phút
  })

  return post
}

const PostService = {
  createPost,
  getPostsBySection,
  findPostById
}

export default PostService
