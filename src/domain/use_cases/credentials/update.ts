import {ICredentialsRepository} from '../../ports/icredentials_repository'

export class UpdatePublicKey {
    constructor(private credentialsService: ICredentialsRepository) {}

    async execute(userId: string, newPublicKey: string) {
        return this.credentialsService.update(userId, newPublicKey)
    }
}
