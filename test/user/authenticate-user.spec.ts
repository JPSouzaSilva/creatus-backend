import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUserUseCase } from '@/use-cases/user/authenticate-user'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { CredentialsInvalidError } from '@/errors/credentials-invalid-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let authenticateUserUseCase: AuthenticateUserUseCase

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
    )
  })

  it('should throw an error if user is not found', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'nonexistent@email.com',
        password: 'password',
      })
    }).rejects.toBeInstanceOf(CredentialsInvalidError)
  })

  it('should throw an error if password does not match', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: 'correct-password',
      level: 1,
    })

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      })
    }).rejects.toBeInstanceOf(CredentialsInvalidError)
  })

  it('should be able to authenticate a user with correct credentials', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: 'correct-password',
      level: 1,
    })

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(response.user).toEqual(user)
  })
})
