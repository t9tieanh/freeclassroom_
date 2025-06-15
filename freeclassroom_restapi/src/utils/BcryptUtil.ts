import bcrypt from 'bcrypt'

export const GeneratePassword = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

export const ValidatePassword = async (enteredPassword: string, savedHash: string) => {
  return await bcrypt.compare(enteredPassword, savedHash)
}
