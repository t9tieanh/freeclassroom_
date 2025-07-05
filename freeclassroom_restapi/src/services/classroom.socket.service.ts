import Socket from '~/config/socket'
import authenticate from '../middleware/auth.socket.midleware'
import classRoomService from './classRoom.service'

const classNamespace = Socket.getIO().of('/classroom')

// auth socker
classNamespace.use(authenticate)

classNamespace.on('connection', (socket) => {
  console.log('Client connected', socket.id)

  socket.on('join-classroom', async (classroomId: string) => {
    if (!socket.user) throw new Error('Không có quyền truy cập')

    // kiểm tra quyền truy cập vào classroom
    if (!(await classRoomService.checkPeopleInClassRoom(socket.user?.userId, classroomId)))
      socket.emit('error', { reason: 'Bạn chưa tham gia lớp học này!' })
    else {
      // join vào room classroom-id
      socket.join(`classroom-${classroomId}`)
      socket.emit('join success', { classroomId })
    }
  })

  socket.on('send message', ({ classroomId, message }) => {
    const roomName = `classroom-${classroomId}`

    if (!socket.rooms.has(roomName)) {
      socket.emit('error', { message: 'Bạn chưa tham gia lớp học này!' })
      return
    }

    Socket.getIO().to(roomName).emit('new message', message)
  })
})

const classRoomSocketService = {
  classNamespace
}

export default classRoomSocketService
