import { StatusCodes } from 'http-status-codes'
import multer, { FileFilterCallback } from 'multer'
import ApiError from '~/middleware/ApiError'
import path from 'path'
import { Request } from 'express'

//config multer để ném lỗi khi file không hợp lệ
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const ext = path.extname(file.originalname).toLowerCase()

    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      return cb(new ApiError(StatusCodes.BAD_REQUEST, 'Loại file không được hỗ trợ'))
    }

    cb(null, true)
  }
})

export default upload
