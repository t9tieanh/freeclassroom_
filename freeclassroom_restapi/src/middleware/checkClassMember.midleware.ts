import { NextFunction, Response, Request } from 'express'
import { classRoomService } from '~/services'
import ApiError from './ApiError'
import { StatusCodes } from 'http-status-codes'

const checkClassMember = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Không có quyền truy cập !')

  if (!(await classRoomService.checkPeopleInClassRoom(req.user?.userId, req.params.id)))
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Bạn chưa tham gia lớp học này !')

  next()
}

export default checkClassMember
