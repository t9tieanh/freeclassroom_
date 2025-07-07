import Socket from '~/config/socket'
import classRoomService from './classRoom.service'
import { Socket as SocketIO } from 'socket.io'
import authenticate from '../middleware/authentication.socket.midleware'
import { EventSocket, sendToSocket, sendToRoom } from '~/dto/response/send-response.socket'
import UserService from './user.service'
import MessageService from './message.service'

// connection tới namspace classroom
const connection = async (socket: SocketIO) => {
  console.log('Client connected', socket.id)

  socket.on('join-classroom', async (classroomId: string) => {
    if (!socket.user) throw new Error('Không có quyền truy cập')

    // kiểm tra quyền truy cập vào classroom
    if (!(await classRoomService.checkPeopleInClassRoom(socket.user?.userId, classroomId))) {
      sendToSocket(socket, EventSocket.ERROR, {
        status: 'error',
        message: 'Bạn chưa tham gia lớp học này!'
      })
    } else {
      // join vào room classroom-id
      socket.join(`classroom-${classroomId}`)

      // join thành công
      sendToRoom(Socket.getIO().of('/classroom'), `classroom-${classroomId}`, EventSocket.JOIN_SUCCESS, {
        content: `${socket.user.username} đã tham gia !`,
        sendDate: new Date()
      })
    }
  })

  socket.on(EventSocket.SEND_MESSAGE, async ({ classroomId, message }) => {
    const roomName = `classroom-${classroomId}`

    if (!socket.user) {
      throw new Error('Không có quyền truy cập')
    }

    if (!socket.rooms.has(roomName)) {
      sendToSocket(socket, EventSocket.ERROR, {
        status: 'error',
        message: 'Bạn chưa tham gia lớp học này!'
      })
      return
    }

    const userData = await UserService.getProfile(socket.user)

    // thêm message vào db
    await MessageService.addMessage({
      content: message,
      sender: socket.user.userId as string,
      classroom: classroomId
    }).catch((e: any) => {
      console.log('Có lỗi khi lưu message: ' + e)
    })

    sendToRoom(Socket.getIO().of('/classroom'), roomName, EventSocket.NEW_MESSAGE, {
      sender: {
        name: userData?.name as string,
        avatarUrl: userData?.image as string,
        username: userData?.username as string
      },
      content: message,
      sendDate: new Date()
    })
  })
}

const handlerConnection = () => {
  const classNamespace = Socket.getIO().of('/classroom')

  // auth socker
  classNamespace.use(authenticate)

  // namespace classroom
  classNamespace.on('connection', connection)
}

const classRoomSocketService = {
  handlerConnection
}

export default classRoomSocketService
