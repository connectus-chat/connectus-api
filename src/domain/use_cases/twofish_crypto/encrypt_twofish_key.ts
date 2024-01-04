import {ISymmetricKeyService} from '../../ports/isymmetric_key_service'

export class EncryptTwofishKey {
    constructor(private readonly service: ISymmetricKeyService) {}

    execute(symmetricKey: string, message: string) {
        return this.service.encrypt(symmetricKey, message)
    }
}
