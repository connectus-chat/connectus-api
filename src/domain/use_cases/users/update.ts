import {User2Update} from '../../entities/user'
import {IUserRepository} from '../../ports/iuser_repository'

export class UpdateUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(id: string, newUser: User2Update) {
        const updatedUser = await this.userRepository.update(id, newUser)
        if (!updatedUser)
            throw new Error('Erro ao atualizar informações de usuário')
        return updatedUser
    }
}
