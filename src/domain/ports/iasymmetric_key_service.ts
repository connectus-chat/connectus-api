export interface AsymmetricKeys {
    privateKey: string
    publicKey: string
}

export interface IAsymmetricKeyService {
    generateKeyPair(): AsymmetricKeys
    encrypt(publicKey: string, message: string): string
    decrypt(privateKey: string, encryptedMessage: string): string
}
