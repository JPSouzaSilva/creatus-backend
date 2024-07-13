import { UserRepository } from '@/repositories/user-repository'
import { RegisterUserUseCase } from '@/use-cases/user/register-user'

export function makeRegisterUserFactory() {
  const userRepository = new UserRepository()
  const registerUserUseCase = new RegisterUserUseCase(userRepository)

  return registerUserUseCase
}
