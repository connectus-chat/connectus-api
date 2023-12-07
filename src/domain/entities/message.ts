import {Group} from './group'
import {User} from './user'

export interface Message {
    content: string
    time: Date
    fromUserId: string
    toUserId: string
    fromUser: User
    toUser: User
}

export type Message2Create = Pick<Message, 'content' | 'time'>

export interface GroupMessage
    extends Pick<Message, 'content' | 'time' | 'fromUser' | 'fromUserId'> {
    groupId: string
    group?: Group
}

export type GroupMessafe2Create = Pick<GroupMessage, 'content' | 'time'>
