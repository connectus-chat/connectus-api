import {NextFunction, Request, Response} from 'express'
import {FindByIdUseCase} from '../../domain/use_cases/users/find_by_id'
import {PrismaUserRepository} from '../services/repositories/prisma/prisma_user.repository'

const userService = new PrismaUserRepository()

export async function useAuthorization(
    req: Request<unknown, unknown, unknown, {auth: string}>,
    res: Response,
    next: NextFunction,
) {
    const {auth} = req.query
    console.log(
        `[AUTHENTICATION] Usuário de ID '${auth}' requisitando recurso.`,
    )

    if (!auth)
        return res.status(403).json({
            message: 'Acesso não autorizado.',
            status: 403,
            time: new Date(),
        })

    const foundUserUC = new FindByIdUseCase(userService)
    const foundUser = await foundUserUC.execute(auth)

    if (!foundUser)
        return res.status(403).json({
            message: 'Acesso não autorizado.',
            status: 403,
            time: new Date(),
        })

    console.log(
        `[AUTHENTICATION] Acesso concedido para usuário de nome '${foundUser.name}'`,
    )
    next()
}
