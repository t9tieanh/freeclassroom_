import cloudinary from '~/utils/cloundinaryUtil'
import ApiError from '~/middleware/ApiError'
import { StatusCodes } from 'http-status-codes'

const uploadImage = async (buffer: Buffer, filename: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'uploads',
        public_id: filename.split('.')[0]
      },
      (error, result: any) => {
        if (error || !result?.secure_url) {
          return reject(new ApiError(StatusCodes.BAD_REQUEST, 'Có lỗi khi upload ảnh!'))
        }

        resolve(result.secure_url)
      }
    )

    stream.end(buffer)
  })
}

const imageService = {
  uploadImage
}

export default imageService
