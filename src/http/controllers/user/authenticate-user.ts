import { CredentialsInvalidError } from '@/errors/credentials-invalid-error'
import { makeAuthenticateUserFactory } from '@/factories/make-authenticate-user-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateUserBodySchema = z.object({
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string({ message: 'Senha inválida' }),
  })

  const { email, password } = authenticateUserBodySchema.parse(request.body)

  try {
    const authenticateUserUseCase = makeAuthenticateUserFactory()

    const { user } = await authenticateUserUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {
        level: user?.level,
      },
      {
        sign: {
          sub: user?.id,
        },
      },
    )

    reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof CredentialsInvalidError) {
      return reply.status(401).send({ message: error.message })
    }
    reply.status(401).send({ message: 'Erro na autenticação' })
  }
}
