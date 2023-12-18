import { IAsymmetricKeyService } from "../../ports/iasymmetric_key_service";

export class CreateRSAKeyPairs {
    constructor (private readonly service: IAsymmetricKeyService) {}
    
    execute(){
        return this.service.generateKeyPair();
    }
}