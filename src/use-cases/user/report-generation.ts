import { IUserRepository } from '@/repositories/interfaces/user-interface-repository'
import { json2csv } from 'json-2-csv'

export class ReportGenerationUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<string> {
    const users = await this.userRepository.findAll()
    const csv = json2csv(users)

    return csv
  }
}
