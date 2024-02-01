import {
    GroupMessage,
    GroupMessage2Create,
    OptionalGroupMessage,
} from '../../../../domain/entities/message'
import {IMessageGroupRepository} from '../../../../domain/ports/imessage_repository'
import {prisma} from './connection'
import {generateCryptoId} from './generate_id'

export class PrismaMessageGroupRepository implements IMessageGroupRepository {
    async create(
        fromUserId: string,
        groupId: string,
        newMessage: GroupMessage2Create,
    ): Promise<OptionalGroupMessage> {
        const createdMessage = await prisma.messageGroup.create({
            data: {
                ...newMessage,
                id: generateCryptoId(),
                groupId,
                fromUserId,
            },
        })
        return createdMessage
    }

    async fetchAllByGroupId(groupId: string): Promise<GroupMessage[]> {
        const messages = await prisma.messageGroup.findMany({
            where: {
                groupId,
            },
        })
        return messages
    }
}
