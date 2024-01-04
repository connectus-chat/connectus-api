import {ISymmetricKeyService} from '../../ports/isymmetric_key_service'

export class DecryptTwofishKey {
    constructor(private readonly service: ISymmetricKeyService) {}

    execute(symmetricKey: string, encryptedMessage: string) {
        return this.service.decrypt(symmetricKey, encryptedMessage)
    }
}
