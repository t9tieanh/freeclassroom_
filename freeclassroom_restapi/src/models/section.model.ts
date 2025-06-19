import mongoose, { Schema, Document, Model, Types } from 'mongoose'

// -> embeded trong classroom
// mỗi classroom có nhiều section -> có nhiều chapter để học
export interface SectionDoc {
  id?: string
  title: string
  description?: string
  content: string
  createDate?: Date
  emphasized: boolean
}

export const SectionSchema = new Schema<SectionDoc>({
  title: { type: String, required: true },
  description: { type: String },
  content: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  emphasized: { type: Boolean, default: false }
})
