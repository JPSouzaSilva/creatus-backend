import { FastifyReply, FastifyRequest } from 'fastify'
import { authUser } from './authentication'

export function levelPermission(level: number) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    await authUser(request, reply)

    if (request.user.level < level) {
      return reply.status(403).send({ message: 'Usuário sem permissão' })
    }
  }
}
