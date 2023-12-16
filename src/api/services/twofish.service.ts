import { randomBytes } from "crypto";
import { ISymmetricKeyService, SymmetricKey } from "../../domain/ports/isymmetric_key_service";

export class TwofishService implements ISymmetricKeyService {
    generateKey(): SymmetricKey {
        return { key: randomBytes(32).toString('hex')};
    }
    encrypt(key: string, message: string): string {
        throw new Error("Method not implemented.");
    }
    decrypt(key: string, encryptedMessage: string): string {
        throw new Error("Method not implemented.");
    }
    
}