import { randomBytes } from "crypto";
import { ISymmetricKeyService, SymmetricKey } from '../../domain/ports/isymmetric_key_service';

export class SymmetricKeyService implements ISymmetricKeyService {
    generateKey(): SymmetricKey {
        return { key: randomBytes(64).toString('hex') };
    }
    encrypt(key: string, message: string): string {
        // TODO implement encrypt logic
        console.log(key, message);
        throw new Error("Method not implemented.");
    }
    decrypt(key: string, encryptedMessage: string): string {
        // TODO implement decrypt logic
        console.log(key, encryptedMessage);
        throw new Error("Method not implemented.");
    }
    
}