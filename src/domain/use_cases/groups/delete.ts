import {IGroupRepository} from '../../ports/igroup_repository'

export class DeleteUseCase {
    constructor(private readonly groupRepository: IGroupRepository) {}

    async execute(id: string) {
        const deletedGroup = this.groupRepository.deleteById(id)
        if (!deletedGroup) throw new Error('Erro ao excluir grupo')
        return deletedGroup
    }
}
