import {IMessageRepository} from '../../ports/imessage_repository'

export class FetchAllUseCase {
    constructor(private readonly messageRepository: IMessageRepository) {}

    async execute(fromId: string, toId: string) {
        const messages =
            await this.messageRepository.fetchAllByFromUserIdAndToUserId(
                fromId,
                toId,
            )
        return messages
    }
}
