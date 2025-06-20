import { Router } from 'express'
import PostController from '~/controllers/post.controller'
import { authenticate } from '~/middleware'
import { isTeacher } from '~/middleware'
import validateDto from '~/middleware/validateDto.midleware'
import { CreationPostDto } from '~/dto/request/post.dto'

const router = Router()

// lấy dữ liệu bài viết theo section
router.get('/:id', PostController.getPostsBySection)

// tạo bài viết
router.post('/', [authenticate, isTeacher, validateDto(CreationPostDto)], PostController.createPost)

export default router
