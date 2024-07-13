import { makeGetAllUsersFactory } from '@/factories/make-get-all-users-factory'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllUsers(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllUsersUseCase = makeGetAllUsersFactory()

    const { users } = await getAllUsersUseCase.execute()

    reply.status(200).send(users)
  } catch (error) {
    reply.status(500).send({ message: 'Erro ao buscar os usuários' })
  }
}
