export interface SymmetricKey {
    key: string
}

export interface ISymmetricKeyService {
    generateKey(): Promise<SymmetricKey>
    encrypt(key: string, message: string): Promise<string>
    decrypt(key: string, encryptedMessage: string): Promise<string>
}
