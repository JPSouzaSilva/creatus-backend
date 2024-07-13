import { Prisma, User } from '@prisma/client'
import { IUserRepository } from './interfaces/user-interface-repository'
import { prisma } from '@/lib/prisma'

export class UserRepository implements IUserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({
      data,
    })
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany()
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    return await prisma.user.update({
      data,
      where: {
        id,
      },
    })
  }

  async delete(id: string): Promise<User | null> {
    return await prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
