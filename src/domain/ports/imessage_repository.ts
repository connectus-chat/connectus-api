import {
    GroupMessage,
    GroupMessage2Create,
    Message,
    Message2Create,
} from '../entities/message'

export interface IMessageRepository {
    create(
        fromUserId: string,
        toUserId: string,
        newMessage: Message2Create,
    ): Promise<Message>
    fetchAllByFromUserIdAndToUserId(
        fromUserId: string,
        toUserId: string,
    ): Promise<Message[]>
}

export interface IMessageGroupRepository {
    create(
        fromUserId: string,
        groupId: string,
        newMessage: GroupMessage2Create,
    ): Promise<GroupMessage>
    fetchAllByGroupId(groupId: string): Promise<GroupMessage[]>
}
