import { JwtPayloadDto } from '~/dto/request/Auth.dto'
import jwt from 'jsonwebtoken'
import { env } from '~/config/env'

export const GenerateSignature = async (payload: JwtPayloadDto) => {
  console.log('GenerateSignature', payload)

  return jwt.sign(payload, env.APP_SECRET, { expiresIn: '90d' })
}

export const ValidateSignature = async (signature: string) => {
  const payload = (await jwt.verify(signature.split(' ')[1], env.APP_SECRET)) as JwtPayloadDto

  // check xem payload có type gì
}
