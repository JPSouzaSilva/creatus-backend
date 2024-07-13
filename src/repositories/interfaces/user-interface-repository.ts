import { Prisma, User } from '@prisma/client'

export interface IUserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findAll(): Promise<User[]>
  update(id: string, data: Prisma.UserUpdateInput): Promise<User | null>
  delete(id: string): Promise<User | null>
}
