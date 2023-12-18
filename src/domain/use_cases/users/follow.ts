import {IUserRepository} from '../../ports/iuser_repository'

export class FollowUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(id: string, followedUserId: string) {
        const updatedUser = await this.userRepository.follow(id, followedUserId)
        if (!updatedUser) throw new Error('Erro ao seguir usuário.')
        return updatedUser
    }
}
