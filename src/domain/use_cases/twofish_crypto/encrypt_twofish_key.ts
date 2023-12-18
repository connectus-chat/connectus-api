import { KeyObject } from "crypto";
import { ISymmetricKeyService } from "../../ports/isymmetric_key_service";

export class EncryptTwofishKey {
    constructor(private readonly service: ISymmetricKeyService) {}

    execute(symmetricKey: KeyObject, message: string) {
        return this.service.encrypt(symmetricKey, message);
    }
}