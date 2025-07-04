import express from 'express'
import 'reflect-metadata'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import { CONNECT_DATABASES } from './config/connect'
import { env } from '~/config/env'
import router from '~/routes/index'
import { errorHandlingMiddleware } from '~/middleware/error-handler.midleware'
import Socket from './config/socket'
import http from 'http'

const START_SERVER = async () => {
  const app = express()

  // config cors
  app.use(cors(corsOptions))
  app.use(express.json())

  // import routes
  app.use('/v1', router)

  // Middleware xử lý lỗi
  app.use(errorHandlingMiddleware)

  // tạo server duy nhất
  const server = http.createServer(app)

  // config socket
  Socket.setupSocket(server)

  // start listen
  const hostname = env.APP_HOST
  const port = Number(env.APP_PORT)

  server.listen(port, hostname, () => {
    console.log(`Hello, I am running at ${hostname}:${port}/`)
  })
}

CONNECT_DATABASES()
  .then(() => console.log('Database connected successfully'))
  .then(() => START_SERVER())
  .catch((err) => {
    console.error('Database connection failed:', err)
    process.exit(1)
  })
