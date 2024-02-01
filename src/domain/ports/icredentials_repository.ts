import {Credentials, Credentials2Create} from '../entities/credentials'

export interface ICredentialsRepository {
    create(
        newCredentials: Credentials2Create,
        userId: string,
    ): Promise<Credentials>
    findPublicKeyByUserId(userId: string): Promise<string>
}
