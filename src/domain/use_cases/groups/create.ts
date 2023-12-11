import {Group2Create} from '../../entities/group'
import {IGroupRepository} from '../../ports/igroup_repository'

export class CreateUseCase {
    constructor(private readonly groupRepository: IGroupRepository) {}

    async execute(adminUserId: string, newGroup: Group2Create) {
        const createdGroup = await this.groupRepository.create(
            adminUserId,
            newGroup,
        )
        if (!createdGroup) throw new Error('Erro ao criar um novo grupo.')
        return createdGroup
    }
}
