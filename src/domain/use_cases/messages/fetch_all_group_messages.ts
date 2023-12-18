import {IMessageGroupRepository} from '../../ports/imessage_repository'

export class FetchAllGroupMessagesUseCase {
    constructor(private readonly messageRepository: IMessageGroupRepository) {}

    async execute(groupId: string) {
        const messages = await this.messageRepository.fetchAllByGroupId(groupId)
        return messages
    }
}
