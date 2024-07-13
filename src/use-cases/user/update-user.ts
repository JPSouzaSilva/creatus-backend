import { EmailAlreadyExistError } from '@/errors/email-already-exist-error'
import { UserNotFoundError } from '@/errors/user-not-found-error'
import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'

interface UpdateUserUseCaseRequest {
  id: string
  name: string
  email: string
  password: string
  level: number
}

interface UpdateUserUseCaseResponse {
  user: User | null
}

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
    name,
    email,
    password,
    level,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userExists = await this.userRepository.findById(id)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    const emailAlreadyExists = await this.userRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistError()
    }

    const user = await this.userRepository.update(id, {
      name,
      email,
      password,
      level,
    })

    return { user }
  }
}
