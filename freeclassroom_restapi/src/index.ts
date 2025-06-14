import express, { Request, Response } from 'express'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/env'
import router from '~/routes/index'
import exitHook from 'async-exit-hook'
import { errorHandlingMiddleware } from '~/middleware/error-handler.midleware'

const START_SERVER = async () => {
  const app = express()

  // thêm một middleware để phân tích cú pháp JSON trong body của reques
  app.use(express.json())

  const hostname: string = env.APP_HOST
  const port: number = Number(env.APP_PORT)

  app.use('/v1', router)

  // import routes
  app.use(router)

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  app.listen(port, hostname, () => {
    console.log(`Hello , I am running at ${hostname}:${port}/`)
  })

  exitHook(() => {
    CLOSE_DB()
    console.log('Database connection closed')
  })
}

CONNECT_DB()
  .then(() => console.log('Database connected successfully'))
  .then(() => START_SERVER())
  .catch((err) => {
    console.error('Database connection failed:', err)
    process.exit(1)
  })
