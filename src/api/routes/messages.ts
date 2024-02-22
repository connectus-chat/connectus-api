import {Request, Response, Router} from 'express'
import {FetchAllUseCase} from '../../domain/use_cases/messages/fetch_all'
import {FetchAllGroupMessagesUseCase} from '../../domain/use_cases/messages/fetch_all_group_messages'
import {useAuthorization} from '../middlewares/use_authorization'
import {PrismaMessageGroupRepository} from '../services/repositories/prisma/prisma_message_group_repository'
import {PrismaMessageRepository} from '../services/repositories/prisma/prisma_message_repository'
import {preventError} from './preventError'

export const MessageRoutes = Router()

const messageRepository = new PrismaMessageRepository()
const groupMessageRepository = new PrismaMessageGroupRepository()

MessageRoutes.get(
    '/users/:fromId/:toId/messages',
    useAuthorization,
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
    useAuthorization,
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
