import { ISymmetricKeyService } from "../../ports/isymmetric_key_service";

export class CreateTwofishKey {
    constructor (private readonly service: ISymmetricKeyService) {}

    execute() {
        return this.service.generateKey();
    }
}