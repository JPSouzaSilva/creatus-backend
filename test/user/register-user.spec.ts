import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from '@/use-cases/user/register-user'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { EmailAlreadyExistError } from '@/errors/email-already-exist-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let registerUserUseCase: RegisterUserUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    registerUserUseCase = new RegisterUserUseCase(inMemoryUsersRepository)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'email@email.com'

    await registerUserUseCase.execute({
      name: 'fulano',
      email,
      password: 'password',
      level: 1,
    })

    expect(async () => {
      await registerUserUseCase.execute({
        name: 'ciclano',
        email,
        password: 'password',
        level: 1,
      })
    }).rejects.toBeInstanceOf(EmailAlreadyExistError)
  })

  it('should be able to register', async () => {
    const { user } = await registerUserUseCase.execute({
      name: 'fulano',
      email: 'fulano@email.com',
      password: 'password',
      level: 1,
    })

    const userInRepository = inMemoryUsersRepository.fakeDatabase[0]

    expect(user).toEqual(userInRepository)
  })
})
