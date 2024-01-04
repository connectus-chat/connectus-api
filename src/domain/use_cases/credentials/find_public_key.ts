import {ICredentialsRepository} from '../../ports/icredentials_repository'

export class FindPublicKeyUseCase {
    constructor(private readonly credentialsService: ICredentialsRepository) {}

    async execute(userId: string) {
        return this.credentialsService.findPublicKeyByUserId(userId)
    }
}
