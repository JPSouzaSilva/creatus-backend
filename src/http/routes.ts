import { FastifyInstance } from 'fastify'
import { authenticateUser } from './controllers/user/authenticate-user'
import { registerUser } from './controllers/user/register-user'
import { getAllUsers } from './controllers/user/get-all-users'
import { getUser } from './controllers/user/get-user'
import { updateUser } from './controllers/user/update-user'
import { deleteUser } from './controllers/user/delete-user'
import { reportGeneration } from './controllers/user/report-generation'
import { onlyLevelFourPlus } from './middlewares/level-four-plus'
import { authUser } from './middlewares/authentication'

export async function appRoutes(app: FastifyInstance) {
  app.post('/login', authenticateUser)
  app.post('/users', registerUser)
  app.get('/users', getAllUsers)
  app.get('/users/:id', getUser)
  app.put('/users/:id', updateUser)
  app.delete('/users/:id', deleteUser)
  app.get(
    '/users/report',
    { onRequest: [authUser, onlyLevelFourPlus] },
    reportGeneration,
  )
}
