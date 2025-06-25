import { CreationClassroomDto, JoinClassroomDto } from '~/dto/request/classroom.dto'
import { ClassroomModel } from '~/models/classroom.model'
import imageService from './image.service'
import { CreationSectionDto } from '~/dto/request'
import ApiError from '~/middleware/ApiError'
import { StatusCodes } from 'http-status-codes'
import mongoose, { isValidObjectId } from 'mongoose'
import Redis from '~/config/redis'
import { CLASSROOM_CACHE, NOTFOUND_CACHE } from '~/utils/constants'

const createClassroom = async (newClassRoomDto: CreationClassroomDto, teacherId: string) => {
  // Check code
  if (await ClassroomModel.exists({ code: newClassRoomDto.code })) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Mã code đã tồn tại !')
  }

  // save image vào cloundinary
  const uploadImageUrl = await imageService.uploadImage(newClassRoomDto.image, newClassRoomDto.fileName)

  const newClassroom = new ClassroomModel({
    name: newClassRoomDto.name,
    unit: newClassRoomDto.unit,
    code: newClassRoomDto.code,
    detail: newClassRoomDto.detail,
    coverImage: uploadImageUrl,
    tags: newClassRoomDto.tags,
    teacher: teacherId
  })
  return await newClassroom.save()
}

// thêm section -> chapter cho từng class
// cập nhật lại cache
const addSection = async (newSection: CreationSectionDto, teacherId: string) => {
  const updatedClassRoom = await ClassroomModel.findOne({
    teacher: teacherId,
    _id: newSection.classRoomId
  })

  if (!updatedClassRoom) throw new ApiError(StatusCodes.BAD_REQUEST, 'Không tìm thấy lớp hợp lệ !')

  // trước khi update data -> tiến hành xóa cache
  const client = Redis.getRedisClient()
  await client.del(`${CLASSROOM_CACHE}${newSection.classRoomId}`).catch(() => {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Đang có lỗi với server redis !')
  })

  updatedClassRoom.sections?.push({
    title: newSection.title,
    description: newSection.description,
    content: newSection.content,
    emphasized: newSection.emphasized
  })

  return await updatedClassRoom.save()
}

const joinClassroom = async (joinRequest: JoinClassroomDto, studentId: string) => {
  const updatedClassRoom = await ClassroomModel.findOne({
    code: joinRequest.classRoomCode
  })

  if (!updatedClassRoom) throw new ApiError(StatusCodes.BAD_REQUEST, 'Không tìm thấy lớp học !')

  // Kiểm tra trùng lặp
  const alreadyJoined = updatedClassRoom.students?.some((id) => id.toString() === studentId)
  if (alreadyJoined) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Bạn đã tham gia lớp học này rồi')
  }

  // Thêm student
  updatedClassRoom.students?.push(new mongoose.Types.ObjectId(studentId) as any)
  return await updatedClassRoom.save()
}

// lấy thông tin từng lớp học -> caching with redis
const findClassRoomById = async (classRoomId: string) => {
  // validate
  if (!isValidObjectId(classRoomId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Phòng học không tồn tại !')
  }

  // tìm trong cache -> lấy redis
  const client = Redis.getRedisClient()
  const keyCache = `${CLASSROOM_CACHE}${classRoomId}`

  // tìm trong cache
  let classRoomData: any = await client.get(keyCache)

  // nếu có trong cache
  if (classRoomData) return JSON.parse(classRoomData)

  // nếu không có
  classRoomData = await ClassroomModel.findOne({
    _id: new mongoose.Types.ObjectId(classRoomId) as any
  }).populate({
    path: 'teacher',
    select: 'name email image phone description position'
  })

  if (!classRoomData) {
    classRoomData = NOTFOUND_CACHE
  }

  // set lại vào cache ( không có trong database vẫn set cái này lại cho cache )
  await client.set(keyCache, JSON.stringify(classRoomData), {
    EX: 1800 // thời gian sống là 30 phút
  })

  // nếu không có trong database

  return classRoomData
}

// lấy danh sách lớp học -> phân trang
const getPaginatedClassRooms = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit
  // lấy từ dòng thứ skip

  // query lấy classroom
  const classRooms = await ClassroomModel.find()
    .populate({
      path: 'teacher',
      select: 'name'
    })
    .skip(skip)
    .limit(limit)
    .select('name unit code image coverImage')

  const totalItems = await ClassroomModel.countDocuments()

  return {
    currentPage: page,
    totalPages: Math.ceil(totalItems / limit),
    totalItems,
    classRooms
  }
}

// lấy danh sách người tham gia lớp học
const getPeoplesByClassRoom = async (classRoomId: string) => {
  const classRoom = await ClassroomModel.findOne({
    _id: new mongoose.Types.ObjectId(classRoomId) as any
  }).populate({
    path: 'students',
    select: 'name email image phone'
  })

  return classRoom?.students
}

const classRoomService = {
  createClassroom,
  addSection,
  joinClassroom,
  findClassRoomById,
  getPaginatedClassRooms,
  getPeoplesByClassRoom
}

export default classRoomService
