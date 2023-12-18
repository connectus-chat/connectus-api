import {IGroupRepository} from '../../ports/igroup_repository'

export class FetchAllByUserUseCase {
    constructor(private readonly groupRepository: IGroupRepository) {}

    async execute(userId: string) {
        const groups = await this.groupRepository.fetchAllByUser(userId)
        return groups
    }
}
