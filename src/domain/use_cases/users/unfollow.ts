import {IUserRepository} from '../../ports/iuser_repository'

export class UnfollowUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(id: string, followedUserId: string) {
        const updatedUser = await this.userRepository.unfollow(
            id,
            followedUserId,
        )
        if (!updatedUser) throw new Error('Erro ao deixar de seguir usuário.')
        return updatedUser
    }
}
