import {IUserRepository} from '../../ports/iuser_repository'

export class FindByIdUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(id: string) {
        const foundUser = await this.userRepository.findById(id)
        if (!foundUser) throw new Error('Usuário não encontrado.')
        return foundUser
    }
}
