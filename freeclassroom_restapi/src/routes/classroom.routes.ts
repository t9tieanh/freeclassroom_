import Router from 'express'
import classRoomController from '~/controllers/classroom.controller'
import { CreationSectionDto } from '~/dto/request'
import { CreationClassroomDto, JoinClassroomDto } from '~/dto/request/classroom.dto'
import { authenticate, isTeacher } from '~/middleware'
import validateDto from '~/middleware/validateDto.midleware'
import upload from '~/utils/multerUtil'

const router = Router()

// Lấy thông tin của một lớp học
router.get('/:id', classRoomController.findClassRoomById)

// tạo class
router.post(
  '/',
  [upload.single('image'), authenticate, isTeacher, validateDto(CreationClassroomDto)],
  classRoomController.createClassroom
)

// thêm section cho class
router.post('/section', [authenticate, isTeacher, validateDto(CreationSectionDto)], classRoomController.addSection)

// Đăng ký vào lớp dành cho student
router.post('/join-classroom', [authenticate, validateDto(JoinClassroomDto)], classRoomController.joinClassroom)

export default router
