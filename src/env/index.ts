import 'dotenv/config'
import { z } from 'zod'
import { InvalidEnvironmentsVariableError } from '../errors/invalid-environments-variable-error'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  HTTP_PORT: z.coerce.number().default(8080),
  DATABASE_URL: z.string().url({ message: 'Database URL inválida' }),
  JWT_SECRET: z.string({ message: 'JWT Secret inválido' }),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new InvalidEnvironmentsVariableError()
}

export const env = _env.data
