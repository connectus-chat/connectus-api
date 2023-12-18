import {Group2Update} from '../../entities/group'
import {IGroupRepository} from '../../ports/igroup_repository'

export class UpdateUseCase {
    constructor(private readonly groupRepository: IGroupRepository) {}

    async execute(id: string, newGroup: Group2Update) {
        const updatedGroup = await this.groupRepository.update(id, newGroup)
        if (!updatedGroup)
            throw new Error('Erro ao atualizar informações de grupos.')
        return updatedGroup
    }
}
