import {
    Message,
    Message2Create,
    OptionalMessage,
} from '../../../domain/entities/message'
import {IMessageRepository} from '../../../domain/ports/imessage_repository'
import {prisma} from './connection'

export class PrismaMessageRepository implements IMessageRepository {
    async create(
        fromUserId: string,
        toUserId: string,
        newMessage: Message2Create,
    ): Promise<OptionalMessage> {
        const createdMessage = await prisma.message.create({
            data: {
                ...newMessage,
                id: crypto.randomUUID().toString(),
                fromUserId,
                toUserId,
            },
            include: {
                fromUser: true,
                toUser: true,
            },
        })
        return createdMessage
    }

    async fetchAllByFromUserIdAndToUserId(
        fromUserId: string,
        toUserId: string,
    ): Promise<Message[]> {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        fromUserId: fromUserId,
                        toUserId: toUserId,
                    },
                    {
                        fromUserId: toUserId,
                        toUserId: fromUserId,
                    },
                ],
            },
            include: {
                fromUser: true,
                toUser: true,
            },
            orderBy: {
                time: 'asc',
            },
        })
        return messages
    }
}
