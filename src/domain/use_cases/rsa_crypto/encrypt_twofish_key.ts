import { KeyObject } from "crypto";
import { IAsymmetricKeyService } from "../../ports/iasymmetric_key_service";

export class EncryptTwofishKey {
    constructor(private readonly service: IAsymmetricKeyService) {}

    execute(publicKey: KeyObject, message: string) {
        return this.service.encrypt(publicKey, message);
    }
}