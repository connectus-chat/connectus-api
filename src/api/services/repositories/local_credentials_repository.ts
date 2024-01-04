import {
    Credentials,
    Credentials2Create,
} from '../../../domain/entities/credentials'
import {HttpError} from '../../../domain/errors/http_error'
import {ICredentialsRepository} from '../../../domain/ports/icredentials_repository'
import {users} from './local_user_repository'

export const credentials: Credentials[] = []

export class LocalCredentialsRepository implements ICredentialsRepository {
    async create(
        newCredentials: Credentials2Create,
        userId: string,
    ): Promise<Credentials> {
        const user = users.find(u => u.id === userId)
        if (!user) throw new HttpError('Usuário não encontrado ou não existe.')
        const createdCredentials: Credentials = {
            privateKey: newCredentials.privateKey,
            publicKey: newCredentials.publicKey,
            user,
            userId,
        }
        credentials.push(createdCredentials)
        return createdCredentials
    }

    private findCredentialsByUserId(userId: string): Credentials | undefined {
        return credentials.find(c => c.userId === userId)
    }

    async findPublicKeyByUserId(userId: string): Promise<string> {
        const foundCredentials = this.findCredentialsByUserId(userId)
        if (!foundCredentials)
            throw new HttpError('Credenciais não foram encontradas.')
        return foundCredentials.publicKey
    }

    async findPrivateKeyByUserId(userId: string): Promise<string> {
        const foundCredentials = this.findCredentialsByUserId(userId)
        if (!foundCredentials)
            throw new HttpError('Credenciais não foram encontradas.')
        return foundCredentials.privateKey
    }
}
