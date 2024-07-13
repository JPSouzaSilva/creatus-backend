import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeRegisterUserFactory } from '@/factories/make-register-user-factory'
import { EmailAlreadyExistError } from '@/errors/email-already-exist-error'

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string({ message: 'Nome inválido' }),
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string({ message: 'Senha inválida' }),
    level: z
      .number()
      .int()
      .min(1)
      .max(5, { message: 'Nível tem que ser de 1 a 5' }),
  })

  const { name, email, password, level } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUserUseCase = makeRegisterUserFactory()

    const { user } = await registerUserUseCase.execute({
      name,
      email,
      password,
      level,
    })

    reply.status(201).send({ user })
  } catch (error) {
    if (error instanceof EmailAlreadyExistError) {
      reply.status(409).send({ message: error.message })
    }

    reply.status(400).send({ message: 'Erro ao criar um usuário' })
  }
}
