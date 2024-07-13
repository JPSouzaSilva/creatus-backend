import { UserNotFoundError } from '@/errors/user-not-found-error'
import { makeDeleteUserFactory } from '@/factories/make-delete-user-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserParamSchema = z.object({
    id: z.string({ message: 'Id do Usuário inválido' }),
  })

  const { id } = deleteUserParamSchema.parse(request.params)

  try {
    const deleteUserUseCase = makeDeleteUserFactory()

    await deleteUserUseCase.execute({ id })

    reply.status(204).send()
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      reply.status(404).send({ message: error.message })
    }
    reply.status(500).send({ message: 'Internal server error' })
  }
}
