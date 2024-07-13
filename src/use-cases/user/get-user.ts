import { UserNotFoundError } from '@/errors/user-not-found-error'
import { IUserRepository } from '@/repositories/interfaces/user-interface-repository'
import { User } from '@prisma/client'

interface GetUserUseCaseRequest {
  id: string
}

interface GetUserUseCaseResponse {
  user: User | null
}

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    id,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new UserNotFoundError()
    }

    return { user }
  }
}
