import mongoose, { Schema, Document, Model, Types } from 'mongoose'
import validator from 'validator'
import ApiError from '~/middleware/ApiError'
import { StatusCodes } from 'http-status-codes'
import { UserRole, UserStatus } from '~/enums/user.enum'
import { ClassroomDoc } from './classroom.model'

// Define the interface for the User document -> kiểu trả về cho các document trong MongoDB
export interface UserDoc extends Document {
  username?: string
  password?: string
  role?: UserRole
  status: UserStatus
  email: string
  image?: string
  name: string
  phone?: string

  // for teacher
  description?: string
  position?: string
  classroomsManaged?: ClassroomDoc[]

  //for student
  classroomsJoined?: ClassroomDoc[]
  isModified(path: string): boolean
}

const UserSchema: Schema = new Schema({
  username: { type: String, unique: true },
  password: { type: String, select: false },
  role: {
    type: String,
    enum: Object.values(UserRole)
  },
  status: {
    type: String,
    enum: Object.values(UserStatus),
    required: true
  },

  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Email không hợp lệ'
    }
  },

  image: { type: String },
  name: { type: String, required: true },
  phone: { type: String },

  // fields for role TEACHER
  description: { type: String },
  position: { type: String },
  classroomsManaged: [{ type: Schema.Types.ObjectId, ref: 'Classroom', default: undefined }],

  //fields for role Student
  classroomsJoined: [{ type: Schema.Types.ObjectId, ref: 'Classroom', default: undefined }]
})

UserSchema.pre('save', async function (this: UserDoc) {
  // If the password is modified, hash it
  if (this.role === UserRole.TEACHER) {
    if (!this.email || !this.description || !this.position) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Giáo viên (teacher) phải có đủ email, description và position')
    }
  }
})

const UserModel: Model<UserDoc> = mongoose.model<UserDoc>('User', UserSchema)

export { UserModel }
