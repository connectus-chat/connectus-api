import {Request, Response, Router} from 'express'
import {Group2Create, Group2Update} from '../../domain/entities/group'
import {AddParticipantUseCase} from '../../domain/use_cases/groups/add_participant'
import {CreateUseCase} from '../../domain/use_cases/groups/create'
import {DeleteUseCase} from '../../domain/use_cases/groups/delete'
import {FetchAllByUserUseCase} from '../../domain/use_cases/groups/fetch_all_by_user'
import {FindByIdUseCase} from '../../domain/use_cases/groups/find_by_id'
import {UpdateUseCase} from '../../domain/use_cases/groups/update'
import {useAuthorization} from '../middlewares/use_authorization'
import {PrismaGroupRepository} from '../services/repositories/prisma/prisma_group_repository'
import {preventError} from './preventError'

export const GroupRoutes = Router()

const groupRepository = new PrismaGroupRepository()

GroupRoutes.get(
    '/users/:userId/groups',
    useAuthorization,
    async (request: Request<{userId: string}>, response: Response) => {
        return await preventError(response, async () => {
            const {userId} = request.params
            const fetchAllUC = new FetchAllByUserUseCase(groupRepository)
            const groups = await fetchAllUC.execute(userId)
            return groups
        })
    },
)

GroupRoutes.get(
    '/users/groups/:id',
    useAuthorization,
    async (request: Request<{id: string}>, response: Response) => {
        return await preventError(response, async () => {
            const {id} = request.params
            const findUC = new FindByIdUseCase(groupRepository)
            const foundGroup = await findUC.execute(id)
            return foundGroup
        })
    },
)

GroupRoutes.delete(
    '/users/groups/:id',
    useAuthorization,
    async (request: Request<{id: string}>, response: Response) => {
        return await preventError(response, async () => {
            const {id} = request.params
            const deleteUC = new DeleteUseCase(groupRepository)
            const deletedGroup = await deleteUC.execute(id)
            return deletedGroup
        })
    },
)

GroupRoutes.post(
    '/users/:adminId/groups',
    useAuthorization,
    async (
        request: Request<{adminId: string}, unknown, Group2Create>,
        response: Response,
    ) => {
        return await preventError(response, async () => {
            const {adminId} = request.params
            const data = request.body
            const createUC = new CreateUseCase(groupRepository)
            const createdGroup = await createUC.execute(adminId, data)
            return createdGroup
        })
    },
)

GroupRoutes.post(
    '/users/:userId/groups/:id',
    useAuthorization,
    async (
        request: Request<{id: string; userId: string}>,
        response: Response,
    ) => {
        return await preventError(response, async () => {
            const {userId, id} = request.params
            const addParticipantUC = new AddParticipantUseCase(groupRepository)
            const updatedGroup = await addParticipantUC.execute(id, userId)
            return updatedGroup
        })
    },
)

GroupRoutes.patch(
    '/users/groups/:id',
    useAuthorization,
    async (
        request: Request<{id: string}, unknown, Group2Update>,
        response: Response,
    ) => {
        return await preventError(response, async () => {
            const {id} = request.params
            const data = request.body
            const updateUC = new UpdateUseCase(groupRepository)
            const updatedGroup = await updateUC.execute(id, data)
            return updatedGroup
        })
    },
)
