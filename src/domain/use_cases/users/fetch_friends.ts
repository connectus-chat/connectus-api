import {User} from '../../entities/user'
import {IUserRepository} from '../../ports/iuser_repository'

export class FetchFriendsUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(id: string): Promise<User[]> {
        const users = await this.userRepository.fetchFriends(id)
        return users
    }
}
