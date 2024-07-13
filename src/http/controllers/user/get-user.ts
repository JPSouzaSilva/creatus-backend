import { UserNotFoundError } from '@/errors/user-not-found-error'
import { makeGetUserFactory } from '@/factories/make-get-user-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  const getUserParamSchema = z.object({
    id: z.string(),
  })

  const { id } = getUserParamSchema.parse(request.params)

  try {
    const getUserUseCase = makeGetUserFactory()

    const { user } = await getUserUseCase.execute({ id })

    reply.status(200).send(user)
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      reply.status(404).send({ message: error.message })
    }

    reply.status(500).send({ message: 'Erro ao buscar um Usuário' })
  }
}
