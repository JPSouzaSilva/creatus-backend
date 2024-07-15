import { makeReportGenerationFactory } from '@/factories/make-report-generation'
import { FastifyReply, FastifyRequest } from 'fastify'
import fs from 'fs'
import path from 'path'

export async function reportGeneration(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const reportGenerationUseCase = makeReportGenerationFactory()

    const csv = await reportGenerationUseCase.execute()

    reply.header('Content-Type', 'text/csv')
    reply.header('Content-Disposition', 'attachment; filename=report.csv')

    const filePath = path.join('src', 'reports', 'report.csv')

    fs.writeFile(filePath, csv, (err) => {
      if (err) {
        reply.status(500).send({ message: 'Erro ao salvar arquivo CSV' })
      }
    })

    reply.status(201).send(csv)
  } catch (error) {
    reply.status(500).send({ message: 'Erro ao gerar relatório' })
  }
}
