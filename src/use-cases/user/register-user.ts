import { EmailAlreadyExistError } from '@/errors/email-already-exist-error'
import { IUserRepository } from '@/repositories/interfaces/user-interface-repository'
import { User } from '@prisma/client'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  level: number
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    name,
    email,
    password,
    level,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const emailAlreadyExists = await this.userRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistError()
    }

    const user = await this.userRepository.create({
      name,
      email,
      password,
      level,
    })

    return { user }
  }
}
