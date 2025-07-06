import { Server } from 'http'
import { Server as ServerIO } from 'socket.io'

let io: ServerIO | null = null

function setupSocket(server: Server) {
  io = new ServerIO(server)

  // connection
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })

    io?.emit('server_message', 'helloo i am server')
  })

  console.log('Socket connected')
}

function getIO() {
  if (!io) {
    throw new Error('Socket.io not initialized!')
  }
  return io
}

const Socket = {
  getIO,
  setupSocket
}

export default Socket
