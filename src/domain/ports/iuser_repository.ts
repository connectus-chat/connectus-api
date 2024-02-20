import {OptionalUser, User, User2Create, User2Update} from '../entities/user'

export interface IUserRepository {
    create(newUser: User2Create): Promise<OptionalUser>
    update(id: string, newUser: User2Update): Promise<OptionalUser>
    fetchAll(): Promise<User[]>
    fetchFriends(userId: string): Promise<User[]>
    findById(id: string): Promise<OptionalUser>
    deleteById(id: string): Promise<OptionalUser>
    findByUsernameAndPassword(
        username: string,
        password: string,
    ): Promise<OptionalUser>
    follow(id: string, followedUserId: string): Promise<OptionalUser>
    unfollow(id: string, followedUserId: string): Promise<OptionalUser>
}
