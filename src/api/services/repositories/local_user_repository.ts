import {randomUUID} from 'crypto'
import {OptionalUser, User, User2Create} from '../../../domain/entities/user'
import {IUserRepository} from '../../../domain/ports/iuser_repository'

export let users: User[] = []

export class LocalUserRepository implements IUserRepository {
    async findByUsernameAndPassword(
        username: string,
        password: string,
    ): Promise<OptionalUser> {
        return users.find(
            user => user.username === username && user.password === password,
        )
    }
    async create(newUser: User2Create): Promise<OptionalUser> {
        const id = randomUUID().toString()
        const user: User = {
            ...newUser,
            id,
            groups: [],
            friends: [],
        }
        users.push(user)
        return user
    }

    async update(
        id: string,
        newUser: Partial<User2Create>,
    ): Promise<OptionalUser> {
        const userIndex = users.findIndex(u => u.id === id)
        if (userIndex === -1) return
        const updatedUser: User = {
            ...users[userIndex],
            ...newUser,
        }
        users[userIndex] = updatedUser
        return updatedUser
    }

    async fetchAll(): Promise<User[]> {
        return users
    }

    async findById(id: string): Promise<OptionalUser> {
        return users.find(user => user.id === id)
    }

    async deleteById(id: string): Promise<OptionalUser> {
        const deletedUser = users.find(user => user.id === id)
        users = users.filter(user => user.id !== id)
        return deletedUser
    }

    async follow(id: string, followedUserId: string): Promise<OptionalUser> {
        const followedUser = await this.findById(followedUserId)
        let user = await this.findById(id)

        if (!followedUser || !user) return

        user = {
            ...user,
            friends: [...(user.friends || []), followedUser],
        }
        users = [...users.filter(u => u.id !== id), user]
        return user
    }

    async unfollow(id: string, followedUserId: string): Promise<OptionalUser> {
        const followedUser = await this.findById(followedUserId)
        let user = await this.findById(id)

        if (!followedUser || !user) return

        user = {
            ...user,
            friends: user.friends?.filter(u => u.id !== followedUserId),
        }
        users = [...users.filter(u => u.id !== id), user]
        return user
    }
}
