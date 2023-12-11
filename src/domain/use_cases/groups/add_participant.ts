import {IGroupRepository} from '../../ports/igroup_repository'

export class AddParticipantUseCase {
    constructor(private readonly groupRepository: IGroupRepository) {}

    async execute(id: string, userId: string) {
        const updatedGroup = await this.groupRepository.addParticipant(
            userId,
            id,
        )
        if (!updatedGroup)
            throw new Error('Não foi possível adicionar novo participante.')
        return updatedGroup
    }
}
