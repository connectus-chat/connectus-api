import {Request, Response, Router} from 'express'
import {FetchAllUseCase} from '../../domain/use_cases/messages/fetch_all'
import {FetchAllGroupMessagesUseCase} from '../../domain/use_cases/messages/fetch_all_group_messages'
import {PrismaMessageRepository} from '../services/prisma/prisma_message_repository'
import {LocalGroupMessageRepository} from '../services/repositories/local_group_message_repository'
import {preventError} from './preventError'

export const MessageRoutes = Router()

const messageRepository = new PrismaMessageRepository()
const groupMessageRepository = new LocalGroupMessageRepository()

MessageRoutes.get(
    '/users/:fromId/:toId/messages',
    async (
        request: Request<{fromId: string; toId: string}>,
        response: Response,
    ) => {
        return await preventError(response, async () => {
            const {fromId, toId} = request.params
            const fetchAllMessages = new FetchAllUseCase(messageRepository)
            const messages = await fetchAllMessages.execute(fromId, toId)
            return messages
        })
    },
)

MessageRoutes.get(
    '/groups/:groupId/messages',
    async (request: Request<{groupId: string}>, response: Response) => {
        return await preventError(response, async () => {
            const {groupId} = request.params
            const fetchAllMessages = new FetchAllGroupMessagesUseCase(
                groupMessageRepository,
            )
            const messages = await fetchAllMessages.execute(groupId)
            return messages
        })
    },
)
