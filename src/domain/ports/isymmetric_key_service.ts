export interface SymmetricKey {
    key: string
}

export interface ISymmetricKeyService {
    generateKey(): SymmetricKey
    encrypt(key: string, message: string): string
    decrypt(key: string, encryptedMessage: string): string
}
