import {IGroupRepository} from '../../ports/igroup_repository'

export class FindByIdUseCase {
    constructor(private readonly groupRepository: IGroupRepository) {}

    async execute(id: string) {
        const foundGroup = await this.groupRepository.findById(id)
        if (!foundGroup) throw new Error('Grupo não foi encontrado.')
        return foundGroup
    }
}
