import { KeyObject } from 'crypto';
export interface AsymmetricKeys {
    privateKey: KeyObject;
    publicKey: KeyObject;
}

export interface IAsymmetricKeyService {
    generateKeyPair(): AsymmetricKeys;
    encrypt(publicKey: KeyObject, message: string): string;
    decrypt(privateKey: KeyObject, encryptedMessage: string): string;
}
