import { UserRepository } from '@/repositories/user-repository'
import { GetAllUsersUseCase } from '@/use-cases/user/get-all-users'

export function makeGetAllUsersFactory() {
  const userRepository = new UserRepository()
  const getAllUsersUseCase = new GetAllUsersUseCase(userRepository)

  return getAllUsersUseCase
}
