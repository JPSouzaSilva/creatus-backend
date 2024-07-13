import { FastifyReply, FastifyRequest } from 'fastify'

export function onlyLevelFourPlus(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { level } = request.user

    if (level < 4) {
      return reply.status(401).send({ message: 'Usuário não autorizado' })
    }
  } catch (error) {
    return reply.status(500).send({ message: 'Erro na autenticação' })
  }
}
