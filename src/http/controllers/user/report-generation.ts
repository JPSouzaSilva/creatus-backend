import { makeReportGenerationFactory } from '@/factories/make-report-generation'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function reportGeneration(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const reportGenerationUseCase = makeReportGenerationFactory()

    const csv = await reportGenerationUseCase.execute()

    reply.header('Content-Type', 'text/csv')
    reply.header('Content-Disposition', 'attachment; filename=report.csv')

    reply.status(201).send(csv)
  } catch (error) {
    reply.status(500).send({ message: 'Erro ao gerar relatório' })
  }
}
