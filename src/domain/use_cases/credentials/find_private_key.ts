import {ICredentialsRepository} from '../../ports/icredentials_repository'

export class FindPrivateKeyUseCase {
    constructor(private readonly credentialsService: ICredentialsRepository) {}

    async execute(userId: string) {
        return this.credentialsService.findPrivateKeyByUserId(userId)
    }
}
