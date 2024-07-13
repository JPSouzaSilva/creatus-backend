import { CredentialsInvalidError } from '@/errors/credentials-invalid-error'
import { IUserRepository } from '@/repositories/interfaces/user-interface-repository'
import { User } from '@prisma/client'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserUseCaseResponse {
  user: User
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new CredentialsInvalidError()
    }

    const passwordMatch = user.password === password

    if (!passwordMatch) {
      throw new CredentialsInvalidError()
    }

    return { user }
  }
}
