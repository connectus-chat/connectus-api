import {Credentials2Create} from '../../entities/credentials'
import {ICredentialsRepository} from '../../ports/icredentials_repository'

export class CreateUseCase {
    constructor(private readonly credentialsService: ICredentialsRepository) {}

    async execute(userId: string, newCredentials: Credentials2Create) {
        const createdCredentials = await this.credentialsService.create(
            newCredentials,
            userId,
        )
        return createdCredentials
    }
}
