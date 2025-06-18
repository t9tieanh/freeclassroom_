import mongoose, { Schema, Document, Model } from 'mongoose'
import { UserDoc } from './user.model'

interface Tag {
  name: string
  iconUrl: string
}

// Define the interface for the Classroom document -> kiểu trả về cho các document trong MongoDB
interface ClassroomDoc extends Document {
  name?: string
  unit?: string
  code: string
  detail?: string
  coverImage: string
  tags?: Tag[]
  teacher?: UserDoc
  isModified(path: string): boolean
}

const ClassroomSchema = new Schema<ClassroomDoc>({
  name: String,
  unit: String,
  code: { type: String, required: true },
  detail: String,
  coverImage: { type: String },
  teacher: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  tags: [
    {
      name: { type: String, required: true },
      iconUrl: { type: String, required: true }
    }
  ]
})

const ClassroomModel: Model<ClassroomDoc> = mongoose.model<ClassroomDoc>('Classroom', ClassroomSchema)

export { ClassroomModel }
