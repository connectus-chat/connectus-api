import {IUserRepository} from '../../ports/iuser_repository'

export class DeleteByIdUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(id: string) {
        const deletedUser = await this.userRepository.deleteById(id)
        if (!deletedUser)
            throw new Error('Usuário não encontrado ou não existe.')
        return deletedUser
    }
}
