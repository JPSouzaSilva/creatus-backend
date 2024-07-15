import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserUseCase } from '@/use-cases/user/get-user'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { UserNotFoundError } from '@/errors/user-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let getUserUseCase: GetUserUseCase

describe('Get User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    getUserUseCase = new GetUserUseCase(inMemoryUsersRepository)
  })

  it('should throw an error if user is not found', async () => {
    expect(async () => {
      await getUserUseCase.execute({
        id: 'non-existing-id',
      })
    }).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it('should be able to get a user by id', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: 'password',
      level: 1,
    })

    const { user } = await getUserUseCase.execute({
      id: createdUser.id,
    })

    expect(user).toEqual(createdUser)
  })
})
