import { beforeEach, describe, expect, it } from 'vitest'
import { ReportGenerationUseCase } from '@/use-cases/user/report-generation'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'

let inMemoryUsersRepository: InMemoryUsersRepository
let reportGenerationUseCase: ReportGenerationUseCase

describe('Report Generation Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    reportGenerationUseCase = new ReportGenerationUseCase(
      inMemoryUsersRepository,
    )
  })

  it('should generate a CSV report with user data', async () => {
    const user1 = {
      id: 'fake-id',
      name: 'fulano',
      email: 'fulano@email.com',
      password: 'password',
      level: 1,
    }
    const user2 = {
      id: 'fake-id-2',
      name: 'ciclano',
      email: 'ciclano@email.com',
      password: 'password123',
      level: 2,
    }

    await inMemoryUsersRepository.create(user1)
    await inMemoryUsersRepository.create(user2)

    const csvReport = await reportGenerationUseCase.execute()

    expect(csvReport).toContain(user1.name)
    expect(csvReport).toContain(user1.email)
    expect(csvReport).toContain(user2.name)
    expect(csvReport).toContain(user2.email)
  })
})
