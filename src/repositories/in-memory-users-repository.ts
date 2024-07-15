import { Prisma, User } from '@prisma/client'
import { UserRepository } from './user-repository'

export class InMemoryUsersRepository implements UserRepository {
  public fakeDatabase: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password: data.password,
      level: data.level,
    }

    this.fakeDatabase.push(user)

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.fakeDatabase.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.fakeDatabase.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findAll(): Promise<User[]> {
    return this.fakeDatabase
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    const user = this.fakeDatabase.find((user) => user.id === id)

    if (!user) {
      return null
    }

    user.name = data.name?.toString() || user.name
    user.email = data.email?.toString() || user.email
    user.password = data.password?.toString() || user.password
    user.level = Number(data.level) || user.level

    return user
  }

  async delete(id: string): Promise<User | null> {
    const userIndex = this.fakeDatabase.findIndex((user) => user.id === id)

    if (userIndex === -1) {
      return null
    }

    const user = this.fakeDatabase[userIndex]

    this.fakeDatabase.splice(userIndex, 1)

    return user
  }
}
