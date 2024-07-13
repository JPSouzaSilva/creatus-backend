import { IUserRepository } from '@/repositories/interfaces/user-interface-repository'
import { User } from '@prisma/client'

interface GetAllUsersUseCaseResponse {
  users: User[]
}

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<GetAllUsersUseCaseResponse> {
    const users = await this.userRepository.findAll()

    return { users }
  }
}
