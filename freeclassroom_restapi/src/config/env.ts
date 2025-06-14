import dotenv from 'dotenv'
dotenv.config()

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  APP_HOST: process.env.APP_HOST || 'localhost',
  APP_PORT: process.env.APP_PORT || 8017,
  DATABASE_NAME: process.env.DATABASE_NAME || 'trello-sys',
  BUILD_MODE: process.env.NODE_ENV || 'dev',
  APP_SECRET: process.env.APP_SECRET as string,
  ACCESS_TOKEN_EXPIRES_IN: (process.env.ACCESS_TOKEN_EXPIRES_IN as string) || '15m',
  REFRESH_TOKEN_EXPIRES_IN: (process.env.REFRESH_TOKEN_EXPIRES_IN as string) || '7d'
}
