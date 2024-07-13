// import { makeReportGenerationFactory } from '@/factories/make-report-generation'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function reportGeneration(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // const reportGenerationUseCase = makeReportGenerationFactory()
    // const csv = await reportGenerationUseCase.execute()
    // reply.header('Content-Type', 'text/csv')
    // reply.header('Content-Disposition', 'attachment; filename=report.csv')
    // reply.status(200).send(csv)

    reply.status(200).send({ message: 'Relatório gerado com sucesso' })
  } catch (error) {
    reply.status(500).send({ message: 'Erro ao gerar relatório' })
  }
}
