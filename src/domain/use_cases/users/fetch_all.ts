import {User} from '../../entities/user'
import {IUserRepository} from '../../ports/iuser_repository'

export class FetchAllUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(): Promise<User[]> {
        const users = await this.userRepository.fetchAll()
        return users
    }
}
