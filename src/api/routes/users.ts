import {Request, Response, Router} from 'express'
import {User2Create, User2Update} from '../../domain/entities/user'
import {CreateUseCase} from '../../domain/use_cases/users/create'
import {DeleteByIdUseCase} from '../../domain/use_cases/users/delete_by_id'
import {FetchAllUseCase} from '../../domain/use_cases/users/fetch_all'
import {FindByIdUseCase} from '../../domain/use_cases/users/find_by_id'
import {FollowUseCase} from '../../domain/use_cases/users/follow'
import {LoginUseCase} from '../../domain/use_cases/users/login'
import {UnfollowUseCase} from '../../domain/use_cases/users/unfollow'
import {UpdateUseCase} from '../../domain/use_cases/users/update'
import {AsymmetricKeyService} from '../services/asymmetric_key.service'
import {PrismaCredentialsService} from '../services/prisma/prisma_credentials_service'
import {PrismaUserRepository} from '../services/prisma/prisma_user.repository'
import {preventError} from './preventError'

export const UserRoutes = Router()

const userRepository = new PrismaUserRepository()
const credentialsRepository = new PrismaCredentialsService()
const asymmetricKeyService = new AsymmetricKeyService()

UserRoutes.get('/users', async (_: Request, response: Response) => {
    return await preventError(response, async () => {
        const fetchAllUC = new FetchAllUseCase(userRepository)
        const users = await fetchAllUC.execute()
        return users
    })
})

UserRoutes.post(
    '/users',
    async (req: Request<unknown, unknown, User2Create>, response: Response) => {
        return await preventError(response, async () => {
            const data = req.body
            const createUC = new CreateUseCase(
                userRepository,
                credentialsRepository,
                asymmetricKeyService,
            )
            const createdUser = await createUC.execute(data)
            return createdUser
        })
    },
)

UserRoutes.post(
    '/users/login',
    async (
        req: Request<
            unknown,
            unknown,
            Pick<User2Create, 'username' | 'password'>
        >,
        response: Response,
    ) => {
        return await preventError(response, async () => {
            const {password, username} = req.body
            const loginUC = new LoginUseCase(userRepository)
            const authenticatedUser = await loginUC.execute(username, password)
            response.cookie('Authorization', authenticatedUser.id)
            return authenticatedUser
        })
    },
)

UserRoutes.delete(
    '/users/:id',
    async (request: Request<{id: string}>, response: Response) => {
        return await preventError(response, async () => {
            const {id} = request.params
            const deleteUC = new DeleteByIdUseCase(userRepository)
            const deletedUser = await deleteUC.execute(id)
            return deletedUser
        })
    },
)

UserRoutes.get(
    '/users/:id',
    async (request: Request<{id: string}>, response: Response) => {
        return await preventError(response, async () => {
            const {id} = request.params
            const findUC = new FindByIdUseCase(userRepository)
            const foundUser = await findUC.execute(id)
            return foundUser
        })
    },
)

UserRoutes.patch(
    '/users/:id',
    async (
        request: Request<{id: string}, unknown, User2Update>,
        response: Response,
    ) => {
        return await preventError(response, async () => {
            const data = request.body
            const {id} = request.params
            const updateUC = new UpdateUseCase(userRepository)
            const updatedUser = await updateUC.execute(id, data)
            return updatedUser
        })
    },
)

UserRoutes.post(
    '/users/:id/follow/:userId',
    async (
        request: Request<{id: string; userId: string}>,
        response: Response,
    ) => {
        return await preventError(response, async () => {
            const {id, userId} = request.params
            const followUC = new FollowUseCase(userRepository)
            const updatedUser = await followUC.execute(id, userId)
            return updatedUser
        })
    },
)

UserRoutes.post(
    '/users/:id/unfollow/:userId',
    async (
        request: Request<{id: string; userId: string}>,
        response: Response,
    ) => {
        return await preventError(response, async () => {
            const {id, userId} = request.params
            const unfollowUC = new UnfollowUseCase(userRepository)
            const updatedUser = await unfollowUC.execute(id, userId)
            return updatedUser
        })
    },
)
