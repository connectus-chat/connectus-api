import {Message2Create} from '../../entities/message'
import {IMessageRepository} from '../../ports/imessage_repository'

export class CreateMessageUseCase {
    constructor(private readonly messageRepository: IMessageRepository) {}

    async execute(fromId: string, toId: string, newMessage: Message2Create) {
        const createdMessage = await this.messageRepository.create(
            fromId,
            toId,
            newMessage,
        ) // persist messages in database
        return createdMessage
    }
}
