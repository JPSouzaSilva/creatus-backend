import { UserRepository } from '@/repositories/user-repository'
import { DeleteUserUseCase } from '@/use-cases/user/delete-user'

export function makeDeleteUserFactory() {
  const userRepository = new UserRepository()
  const deleteUserUseCase = new DeleteUserUseCase(userRepository)

  return deleteUserUseCase
}
