import mongoose, { Schema, Document, Model, Types, ObjectId } from 'mongoose'
import { UserDoc } from './user.model'
import { SectionSchema, SectionDoc } from './section.model'

interface Tag {
  name: string
  iconUrl: string
}

// Define the interface for the Classroom document -> kiểu trả về cho các document trong MongoDB
export interface ClassroomDoc extends Document {
  name?: string
  unit?: string
  code: string
  detail?: string
  coverImage: string
  tags?: Tag[]
  sections?: SectionDoc[]
  teacher?: UserDoc
  students?: UserDoc[]
  isModified(path: string): boolean
}

const ClassroomSchema = new Schema<ClassroomDoc>({
  name: String,
  unit: String,
  code: { type: String, required: true },
  detail: String,
  coverImage: { type: String },
  // teacher của class -> references
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // danh sách các student -> references
  students: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    default: []
  },
  tags: [
    {
      name: { type: String, required: true },
      iconUrl: { type: String, required: true }
    },
    { _id: false }
  ],
  // -> chapter của class -> embeeded
  sections: { type: [SectionSchema], default: [] }
})

const ClassroomModel: Model<ClassroomDoc> = mongoose.model<ClassroomDoc>('Classroom', ClassroomSchema)

export { ClassroomModel }
