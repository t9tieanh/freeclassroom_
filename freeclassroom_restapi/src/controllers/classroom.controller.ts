import { Request, Response } from 'express'
import sendResponse from '~/dto/response/send-response'
import { classRoomService } from '~/services'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/middleware/ApiError'

// tạo lớp học -> chỉ teacher tạo
const createClassroom = async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Không có quyền truy cập !')

  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Tạo classroom thành công !',
    result: await classRoomService.createClassroom(req.data, req.user?.userId)
  })
}

// tạo section -> chỉ teacher tạo
const addSection = async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Không có quyền truy cập !')

  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Thêm section cho lớp học thành công !',
    result: await classRoomService.addSection(req.data, req.user?.userId)
  })
}

// tham gia lớp học
const joinClassroom = async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Không có quyền truy cập !')

  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Tham gia vào lớp học thành công !',
    result: await classRoomService.joinClassroom(req.data, req.user?.userId)
  })
}

// lất data 1 class
const findClassRoomById = async (req: Request, res: Response) => {
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Lấy thông tin lớp học thành công !',
    result: await classRoomService.findClassRoomById(req.params.id)
  })
}

// lấy danh sách lớp học -> phân trang
const getPaginatedClassRooms = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 4

  const result = await classRoomService.getPaginatedClassRooms(page, limit)

  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Lấy danh sách lớp học thành công!',
    result
  })
}

const classRoomController = {
  createClassroom,
  addSection,
  joinClassroom,
  findClassRoomById,
  getPaginatedClassRooms
}

export default classRoomController
