import { EmailAlreadyExistError } from '@/errors/email-already-exist-error'
import { UserNotFoundError } from '@/errors/user-not-found-error'
import { makeUpdateUserFactory } from '@/factories/make-update-user-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const updateUserParamSchema = z.object({
    id: z.string({ message: 'Id do Usuário inválido' }),
  })

  const updateUserBodySchema = z.object({
    name: z.string({ message: 'Nome inválido' }),
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string({ message: 'Senha inválida' }),
    level: z
      .number()
      .int()
      .min(1)
      .max(5, { message: 'Nível tem que ser de 1 a 5' }),
  })

  const { id } = updateUserParamSchema.parse(request.params)

  const { name, email, password, level } = updateUserBodySchema.parse(
    request.body,
  )

  try {
    const updateUserUseCase = makeUpdateUserFactory()

    const { user } = await updateUserUseCase.execute({
      id,
      name,
      email,
      password,
      level,
    })

    reply.status(200).send(user)
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      reply.status(404).send({ message: error.message })
    }

    if (error instanceof EmailAlreadyExistError) {
      reply.status(409).send({ message: error.message })
    }

    reply.status(500).send({ message: 'Erro ao atualizar o usuário' })
  }
}
