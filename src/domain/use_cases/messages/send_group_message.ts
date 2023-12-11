import {GroupMessage2Create} from '../../entities/message'
import {IMessageGroupRepository} from '../../ports/imessage_repository'

export class SendGroupMessageUseCase {
    constructor(private readonly messageRepository: IMessageGroupRepository) {}

    async execute(
        fromId: string,
        groupId: string,
        newMessage: GroupMessage2Create,
    ) {
        // broadcast message

        const createdMessage = await this.messageRepository.create(
            fromId,
            groupId,
            newMessage,
        ) // persist messages in database
        return createdMessage
    }
}
