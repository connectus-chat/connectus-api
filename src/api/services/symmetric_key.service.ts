import { KeyObject, randomBytes } from "crypto";
import { ISymmetricKeyService, SymmetricKey } from '../../domain/ports/isymmetric_key_service';
const Twofish = require("twofish");

export class SymmetricKeyService implements ISymmetricKeyService {
    generateKey(): SymmetricKey {
        return { key: randomBytes(64).toString('hex') };
    }

    encrypt(key: KeyObject, message: string): string {
        console.log(key, message);

        const twofish = new Twofish();

        const data = Buffer.from(message, 'utf8');
        const dataArray = Uint8Array.from(data);
        const keyArray = Uint8Array.from(key.export());

        const cipherText = twofish.encrypt(keyArray, dataArray);
        const encryptedString = cipherText.map((x: number) => x.toString(16).padStart(2, '0')).join('');

        return encryptedString;
    }

    decrypt(key: KeyObject, encryptedMessage: string): string {
        console.log(key, encryptedMessage);

        const twofish = new Twofish();

        const encryptedMessageBuffer = Buffer.from(encryptedMessage, 'utf8');
        const encryptedMessageArray = Uint8Array.from(encryptedMessageBuffer);
        const keyArray = Uint8Array.from(key.export());

        const data = twofish.decrypt(keyArray, encryptedMessageArray);
        const decryptedString = data.map((x: number) => String.fromCharCode(x)).join('');
        
        return decryptedString;
    }
    
}