import {randomUUID} from 'crypto'
import {
    GroupMessage,
    GroupMessage2Create,
    OptionalGroupMessage,
} from '../../../domain/entities/message'
import {IMessageGroupRepository} from '../../../domain/ports/imessage_repository'
import {groups} from './local_group_repository'
import {users} from './local_user_repository'

export const groupMessages: GroupMessage[] = []

export class LocalGroupMessageRepository implements IMessageGroupRepository {
    async create(
        fromUserId: string,
        groupId: string,
        newMessage: GroupMessage2Create,
    ): Promise<OptionalGroupMessage> {
        const fromUser = users.find(u => u.id === fromUserId)
        const group = groups.find(u => u.id === groupId)
        if (!fromUser || !group) return
        const id = randomUUID().toString()
        const message: GroupMessage = {
            ...newMessage,
            id,
            fromUserId,
            fromUser,
            group,
            groupId,
        }
        groupMessages.push(message)
        return message
    }

    async fetchAllByGroupId(groupId: string): Promise<GroupMessage[]> {
        return groupMessages
            .filter(g => g.groupId === groupId)
            .sort((a, b) => a.time.getTime() - b.time.getTime())
    }
}
