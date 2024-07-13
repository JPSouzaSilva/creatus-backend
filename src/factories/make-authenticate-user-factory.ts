import { UserRepository } from '@/repositories/user-repository'
import { AuthenticateUserUseCase } from '@/use-cases/user/authenticate-user'

export function makeAuthenticateUserFactory() {
  const userRepository = new UserRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)

  return authenticateUserUseCase
}
