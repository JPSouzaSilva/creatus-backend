import { UserRepository } from '@/repositories/user-repository'
import { GetUserUseCase } from '@/use-cases/user/get-user'

export function makeGetUserFactory() {
  const userRepository = new UserRepository()
  const getUserUseCase = new GetUserUseCase(userRepository)

  return getUserUseCase
}
