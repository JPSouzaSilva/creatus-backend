import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      level: 1 | 2 | 3 | 4 | 5
    }
  }
}
