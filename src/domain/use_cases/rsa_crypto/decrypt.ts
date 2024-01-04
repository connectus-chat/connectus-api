import { IAsymmetricKeyService } from '../../ports/iasymmetric_key_service'

export class Decrypt {
    constructor(private readonly service: IAsymmetricKeyService) {}

    execute(privateKey: string, encryptedMessage: string) {
        return this.service.decrypt(privateKey, encryptedMessage)
    }
}
