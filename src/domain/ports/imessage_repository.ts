import {
    GroupMessage,
    GroupMessage2Create,
    Message,
    Message2Create,
    OptionalGroupMessage,
    OptionalMessage,
} from '../entities/message'

export interface IMessageRepository {
    create(
        fromUserId: string,
        toUserId: string,
        newMessage: Message2Create,
    ): Promise<OptionalMessage>
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
    ): Promise<OptionalGroupMessage>
    fetchAllByGroupId(groupId: string): Promise<GroupMessage[]>
}
