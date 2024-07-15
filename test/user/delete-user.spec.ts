import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteUserUseCase } from '@/use-cases/user/delete-user'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { UserNotFoundError } from '@/errors/user-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let deleteUserUseCase: DeleteUserUseCase

describe('Delete User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    deleteUserUseCase = new DeleteUserUseCase(inMemoryUsersRepository)
  })

  it('should throw an error if user is not found', async () => {
    expect(async () => {
      await deleteUserUseCase.execute({
        id: 'non-existing-id',
      })
    }).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it('should be able to delete a user by id', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: 'password',
      level: 1,
    })

    const { user } = await deleteUserUseCase.execute({
      id: createdUser.id,
    })

    expect(user).toEqual(createdUser)

    const userDeletedInRepository = inMemoryUsersRepository.fakeDatabase.find(
      (u) => u.id === createdUser.id,
    )

    expect(userDeletedInRepository).toBeUndefined()
  })
})
