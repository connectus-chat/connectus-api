import {OptionalUser, User, User2Create, User2Update} from '../entities/user'

export interface IUserRepository {
    create(newUser: User2Create): Promise<User>
    update(newUser: User2Update): Promise<User>
    fetchAll(): Promise<User[]>
    findById(id: string): Promise<OptionalUser>
    deleteById(id: string): Promise<User>
}
