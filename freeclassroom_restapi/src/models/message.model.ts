import { ClassroomDoc } from './classroom.model'
import { UserDoc } from './user.model'
import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export interface MessageDOC {
  content: string
  sender: UserDoc
  classRoom: ClassroomDoc
  createDate: Date
}

const MesssageSchema: Schema = new Schema({
  content: { type: String },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  classRoom: { type: Schema.Types.ObjectId, ref: 'Classroom' },
  createDate: { type: Date, default: Date.now }
}).set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v

    return ret
  }
})

const MessageModel: Model<MessageDOC> = mongoose.model<MessageDOC>('Message', MesssageSchema)

export { MessageModel }
