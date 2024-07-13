import { UserRepository } from '@/repositories/user-repository'
import { UpdateUserUseCase } from '@/use-cases/user/update-user'

export function makeUpdateUserFactory() {
  const userRepository = new UserRepository()
  const updateUserUseCase = new UpdateUserUseCase(userRepository)

  return updateUserUseCase
}
