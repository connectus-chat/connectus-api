import {User2Create} from '../../entities/user'
import {IUserRepository} from '../../ports/iuser_repository'

export class CreateUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(newUser: User2Create) {
        const createdUser = await this.userRepository.create(newUser)
        if (!createdUser) throw new Error('Erro ao criar novo usuário.')
        return createdUser
    }
}
