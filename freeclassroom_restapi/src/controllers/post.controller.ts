import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import sendResponse from '~/dto/response/send-response'
import ApiError from '~/middleware/ApiError'
import { PostService } from '~/services'

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Bạn không có quyền truy cập !')

  sendResponse(res, {
    code: StatusCodes.CREATED,
    message: 'Thêm bài viết thành công !',
    result: await PostService.createPost(req.data, req.user)
  })
}

const getPostsBySection = async (req: Request, res: Response, next: NextFunction) => {
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Lấy thông tin bài đăng thành công !',
    result: await PostService.getPostsBySection(req.params.id)
  })
}

const PostController = {
  createPost,
  getPostsBySection
}

export default PostController
