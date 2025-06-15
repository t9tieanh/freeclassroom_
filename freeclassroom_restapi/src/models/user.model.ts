import mongoose, { Schema, Document, Model } from 'mongoose'
import validator from 'validator'
import ApiError from '~/middleware/ApiError'
import { StatusCodes } from 'http-status-codes'
import { UserRole, UserStatus } from '~/enums/user.enum'

// Define the interface for the User document -> kiểu trả về cho các document trong MongoDB
interface UserDoc extends Document {
  username: string
  password: string
  role: UserRole
  status: UserStatus
  email: string
  image: string
  name: string
  phone: string
  description?: string
  position?: string
  isModified(path: string): boolean
}

const UserSchema: Schema = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true
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

  image: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },

  // fields for role TEACHER
  description: { type: String },
  position: { type: String }
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
