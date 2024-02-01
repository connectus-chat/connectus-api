import {Group} from './group'
import {User} from './user'

export interface Message {
    id: string
    content: string
    time: Date
    fromUserId: string
    toUserId: string
    fromUser?: User
    toUser?: User
    publicCredentials: string
}

export type Message2Create = Pick<
    Message,
    'content' | 'time' | 'publicCredentials'
>
export type OptionalMessage = Message | undefined | null

export interface GroupMessage
    extends Pick<
        Message,
        | 'content'
        | 'time'
        | 'fromUser'
        | 'fromUserId'
        | 'id'
        | 'publicCredentials'
    > {
    groupId: string
    group?: Group
}

export type GroupMessage2Create = Pick<
    GroupMessage,
    'content' | 'time' | 'publicCredentials'
>
export type OptionalGroupMessage = GroupMessage | undefined | null
