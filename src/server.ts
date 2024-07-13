import fastify from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'
import { appRoutes } from './http/routes'
import fastifyJwt from '@fastify/jwt'

const app = fastify()

app.register(appRoutes)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: '1h' },
})

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})

app
  .listen({
    port: env.HTTP_PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('Server is running on port 8080')
  })
