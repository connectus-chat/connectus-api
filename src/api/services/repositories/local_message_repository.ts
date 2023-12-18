import {randomUUID} from 'crypto'
import {
    Message,
    Message2Create,
    OptionalMessage,
} from '../../../domain/entities/message'
import {IMessageRepository} from '../../../domain/ports/imessage_repository'
import {users} from './local_user_repository'

export const messages: Message[] = []

export class LocalMessageRepository implements IMessageRepository {
    async create(
        fromUserId: string,
        toUserId: string,
        newMessage: Message2Create,
    ): Promise<OptionalMessage> {
        const fromUser = users.find(u => u.id === fromUserId)
        const toUser = users.find(u => u.id === toUserId)
        if (!fromUser || !toUser) return
        const id = randomUUID().toString()
        const message: Message = {
            ...newMessage,
            id,
            fromUserId,
            fromUser,
            toUser,
            toUserId,
        }
        messages.push(message)
        return message
    }

    async fetchAllByFromUserIdAndToUserId(
        fromUserId: string,
        toUserId: string,
    ): Promise<Message[]> {
        return messages
            .filter(
                m =>
                    (m.fromUserId === fromUserId && m.toUserId === toUserId) ||
                    (m.fromUserId === toUserId && m.toUserId === fromUserId),
            )
            .sort((a, b) => a.time.getTime() - b.time.getTime())
    }
}
