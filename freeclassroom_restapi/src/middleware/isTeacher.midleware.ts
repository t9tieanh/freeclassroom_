import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import ApiError from './ApiError'
import { UserRole } from '~/enums/user.enum'

const isTeacher = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Bạn không phải là giáo viên tại freeclassroom !')

  // check role
  if (req.user.role === UserRole.TEACHER) next()
  else throw new ApiError(StatusCodes.UNAUTHORIZED, 'Bạn không phải là giáo viên tại freeclassroom !')
}

export default isTeacher
