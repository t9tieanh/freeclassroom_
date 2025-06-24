import mongoose, { Schema, Document, Model, Types } from 'mongoose'
import { PostType } from '~/enums/post.enum'
import { UserDoc } from './user.model'

// Define the interface for the Post document -> kiểu trả về cho các document trong MongoDB
export interface PostDoc extends Document {
  title: string
  content?: string
  postType: PostType
  description?: string
  sectionId: Types.ObjectId
  createBy: UserDoc
  isModified(path: string): boolean
}

const PostSchema: Schema = new Schema({
  title: { type: String },
  content: { type: String },
  postType: {
    type: String,
    enum: Object.keys(PostType)
  },
  sectionId: { type: Schema.Types.ObjectId },
  description: { type: String },
  createBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createDate: { type: Date, default: Date.now }
}).set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v

    // Chuyển postType key → value
    if (ret.postType && PostType[ret.postType as keyof typeof PostType]) {
      ret.postType = PostType[ret.postType as keyof typeof PostType]
    }

    return ret
  }
})

const PostModel: Model<PostDoc> = mongoose.model<PostDoc>('Post', PostSchema)

export { PostModel }
