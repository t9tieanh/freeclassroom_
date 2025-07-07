import { MessageModel } from '~/models'
import { Types } from 'mongoose'
import { CreationMessageDto } from '~/dto/request/message.dto'
import { Message } from '~/dto/response/send-response.socket'

const getMessageByClassRoom = async (classRoomId: string): Promise<Message[]> => {
  const messages = await MessageModel.find({
    classRoom: new Types.ObjectId(classRoomId)
  }).populate({
    path: 'sender',
    select: 'name image username'
  })

  return messages.map((message) => ({
    sender: {
      name: message.sender.name as string,
      avatarUrl: message.sender.image as string,
      username: message.sender.username as string
    },
    content: message.content,
    sendDate: message.createDate
  }))
}

const addMessage = async (newMessage: CreationMessageDto) => {
  const messageModel = new MessageModel({
    ...newMessage,
    sender: new Types.ObjectId(newMessage.sender),
    classRoom: new Types.ObjectId(newMessage.classroom)
  })

  await messageModel.save()
}

const MessageService = {
  getMessageByClassRoom,
  addMessage
}

export default MessageService
