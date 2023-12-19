import { KeyObject } from "crypto";

export interface SymmetricKey {
    key: string
}

export interface ISymmetricKeyService {
    generateKey(): SymmetricKey
    encrypt(key: KeyObject, message: string): string;
    decrypt(key: KeyObject, encryptedMessage: string): string;
}