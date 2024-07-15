import { beforeEach, describe, expect, it } from 'vitest'
import { GetAllUsersUseCase } from '@/use-cases/user/get-all-users'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'

let inMemoryUsersRepository: InMemoryUsersRepository
let getAllUsersUseCase: GetAllUsersUseCase

describe('Get All Users Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    getAllUsersUseCase = new GetAllUsersUseCase(inMemoryUsersRepository)
  })

  it('should return an empty list if no users are found', async () => {
    const { users } = await getAllUsersUseCase.execute()

    expect(users).toEqual([])
  })

  it('should return all users', async () => {
    const user1 = await inMemoryUsersRepository.create({
      name: 'fulano',
      email: 'fulano@email.com',
      password: 'password',
      level: 1,
    })

    const user2 = await inMemoryUsersRepository.create({
      name: 'ciclano',
      email: 'ciclano@email.com',
      password: 'password123',
      level: 2,
    })

    const { users } = await getAllUsersUseCase.execute()

    expect(users).toHaveLength(2)
    expect(users).toEqual(expect.arrayContaining([user1, user2]))
  })
})
