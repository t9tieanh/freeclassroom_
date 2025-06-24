import { Router } from 'express'
import PostController from '~/controllers/post.controller'
import { authenticate } from '~/middleware'
import { isTeacher } from '~/middleware'
import validateDto from '~/middleware/validateDto.midleware'
import { CreationPostDto } from '~/dto/request/post.dto'

const router = Router()

// lấy dữ liệu bài viết theo section
router.get('/section/:id', PostController.getPostsBySection)

// lấy dữ liệu bài viết theo section
router.get('/:id', PostController.findPostById)

// tạo bài viết
router.post('/', [authenticate, isTeacher, validateDto(CreationPostDto)], PostController.createPost)

export default router
