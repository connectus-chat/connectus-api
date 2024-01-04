import {IAsymmetricKeyService} from '../../ports/iasymmetric_key_service'

export class EncryptTwofishKey {
    constructor(private readonly service: IAsymmetricKeyService) {}

    execute(publicKey: string, message: string) {
        return this.service.encrypt(publicKey, message)
    }
}
