import { KeyObject } from "crypto";
import { ISymmetricKeyService } from "../../ports/isymmetric_key_service";

export class DecryptTwofishKey {
    constructor (private readonly service: ISymmetricKeyService) {}

    execute(symmetricKey: KeyObject, encryptedMessage: string) {
        return this.service.decrypt(symmetricKey, encryptedMessage);
    }
}