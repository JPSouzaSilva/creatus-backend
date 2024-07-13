import { UserNotFoundError } from '@/errors/user-not-found-error'
import { IUserRepository } from '@/repositories/interfaces/user-interface-repository'
import { User } from '@prisma/client'

interface DeleteUserUseCaseRequest {
  id: string
}

interface DeleteUserUseCaseResponse {
  user: User | null
}

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    id,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const userExists = await this.userRepository.findById(id)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    const user = await this.userRepository.delete(id)

    console.log({ user })

    return { user }
  }
}
