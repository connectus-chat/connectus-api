import { KeyObject } from "crypto";
import { IAsymmetricKeyService } from "../../ports/iasymmetric_key_service";

export class DecryptTwofishKey {
    constructor (private readonly service: IAsymmetricKeyService) {}

    execute(privateKey: KeyObject, encryptedMessage: string) {
        return this.service.decrypt(privateKey, encryptedMessage);
    }
}