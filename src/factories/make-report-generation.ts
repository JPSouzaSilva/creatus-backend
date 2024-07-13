import { UserRepository } from '@/repositories/user-repository'
import { ReportGenerationUseCase } from '@/use-cases/user/report-generation'

export function makeReportGenerationFactory() {
  const userRepository = new UserRepository()
  const reportGenerationUseCase = new ReportGenerationUseCase(userRepository)

  return reportGenerationUseCase
}
