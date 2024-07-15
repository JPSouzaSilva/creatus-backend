import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateUserUseCase } from '@/use-cases/user/update-user'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { UserNotFoundError } from '@/errors/user-not-found-error'
import { EmailAlreadyExistError } from '@/errors/email-already-exist-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let updateUserUseCase: UpdateUserUseCase

describe('Update User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    updateUserUseCase = new UpdateUserUseCase(inMemoryUsersRepository)
  })

  it('should throw an error if user is not found', async () => {
    expect(async () => {
      await updateUserUseCase.execute({
        id: 'non-existing-id',
        name: 'fulano',
        email: 'fulano@email.com',
        password: 'password',
        level: 1,
      })
    }).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it('should throw an error if email already exists', async () => {
    const existingUser = await inMemoryUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: 'password',
      level: 1,
    })

    const anotherUser = await inMemoryUsersRepository.create({
      name: 'ciclano',
      email: 'ciclano@email.com',
      password: 'password',
      level: 2,
    })

    expect(async () => {
      await updateUserUseCase.execute({
        id: anotherUser.id,
        name: 'ciclano da silva',
        email: existingUser.email,
        password: 'other-password',
        level: 1,
      })
    }).rejects.toBeInstanceOf(EmailAlreadyExistError)
  })

  it('should be able to update a user', async () => {
    const existingUser = await inMemoryUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: 'password',
      level: 1,
    })

    const { user } = await updateUserUseCase.execute({
      id: existingUser.id,
      name: 'fulano da silva',
      email: 'fulanosilva@email.com',
      password: 'other-password',
      level: 2,
    })

    const userInRepository = inMemoryUsersRepository.fakeDatabase.find(
      (u) => u.id === existingUser.id,
    )

    expect(user).toEqual(userInRepository)
    expect(userInRepository).toMatchObject({
      name: 'fulano da silva',
      email: 'fulanosilva@email.com',
      password: 'other-password',
      level: 2,
    })
  })
})
