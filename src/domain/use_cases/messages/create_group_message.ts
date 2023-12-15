import {GroupMessage2Create} from '../../entities/message'
import {IMessageGroupRepository} from '../../ports/imessage_repository'

export class CreateGroupMessageUseCase {
    constructor(private readonly messageRepository: IMessageGroupRepository) {}

    async execute(
        fromId: string,
        groupId: string,
        newMessage: GroupMessage2Create,
    ) {
        const createdMessage = await this.messageRepository.create(
            fromId,
            groupId,
            newMessage,
        ) // persist messages in database
        return createdMessage
    }
}
