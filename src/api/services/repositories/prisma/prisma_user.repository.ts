import {OptionalUser, User, User2Create} from '../../../../domain/entities/user'
import {HttpError} from '../../../../domain/errors/http_error'
import {IUserRepository} from '../../../../domain/ports/iuser_repository'
import {prisma} from './connection'
import {generateCryptoId} from './generate_id'

export class PrismaUserRepository implements IUserRepository {
    async create(newUser: User2Create): Promise<OptionalUser> {
        const createdUser = await prisma.user.create({
            data: {
                ...newUser,
                id: generateCryptoId(),
            },
        })
        return createdUser
    }

    async update(
        id: string,
        newUser: Partial<User2Create>,
    ): Promise<OptionalUser> {
        const updatedUser = await prisma.user.update({
            data: newUser,
            where: {
                id,
            },
        })
        return updatedUser
    }

    async fetchAll(): Promise<User[]> {
        const users = await prisma.user.findMany({})
        return users
    }

    async fetchFriends(userId: string): Promise<User[]> {
        const user = await prisma.user.findUnique({
          where: {
            id: userId
          },
          include: {
            friends: true
          }
        })
        return user.friends
      }

    async findById(id: string): Promise<OptionalUser> {
        const foundUser = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                groups: {
                    include: {
                        admin: true,
                        participants: true,
                    },
                },
                friends: true,
            },
        })
        return foundUser
    }

    async deleteById(id: string): Promise<OptionalUser> {
        const deletedUser = await prisma.user.delete({
            where: {
                id,
            },
        })
        return deletedUser
    }

    async findByUsernameAndPassword(
        username: string,
        password: string,
    ): Promise<OptionalUser> {
        const foundUser = await prisma.user.findUnique({
            where: {
                username,
                password,
            },
        })
        return foundUser
    }

    async follow(id: string, followedUserId: string): Promise<OptionalUser> {
        const foundUser = await this.findById(followedUserId)
        if (!foundUser) throw new HttpError('Amigo não foi encontrado.')
        const user = await prisma.user.update({
            data: {
                friends: {
                    connect: {
                        id: foundUser.id,
                    },
                },
            },
            where: {
                id,
            },
            include: {
                groups: {
                    include: {
                        admin: true,
                        participants: true,
                    },
                },
                friends: true,
            },
        })
        return user
    }

    async unfollow(id: string, followedUserId: string): Promise<OptionalUser> {
        const foundUser = await this.findById(followedUserId)
        if (!foundUser) throw new HttpError('Amigo não foi encontrado.')
        const user = await prisma.user.update({
            data: {
                friends: {
                    disconnect: {
                        id: followedUserId,
                    },
                },
            },
            where: {
                id,
            },
            include: {
                groups: {
                    include: {
                        admin: true,
                        participants: true,
                    },
                },
                friends: true,
            },
        })
        return user
    }
}
