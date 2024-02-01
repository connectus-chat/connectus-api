import {
    Credentials,
    Credentials2Create,
} from '../../../domain/entities/credentials'
import {HttpError} from '../../../domain/errors/http_error'
import {ICredentialsRepository} from '../../../domain/ports/icredentials_repository'
import {prisma} from './connection'

export class PrismaCredentialsService implements ICredentialsRepository {
    async create(
        newCredentials: Credentials2Create,
        userId: string,
    ): Promise<Credentials> {
        const createdCredential = await prisma.credential.create({
            data: {...newCredentials, userId},
            include: {
                user: true,
            },
        })
        return createdCredential
    }

    async findPublicKeyByUserId(userId: string): Promise<string> {
        const foundKey = await prisma.credential.findFirst({
            select: {
                publicKey: true,
            },
            where: {
                userId,
            },
        })
        if (!foundKey) throw new HttpError('Chave não encontrada')
        return foundKey.publicKey
    }
}
