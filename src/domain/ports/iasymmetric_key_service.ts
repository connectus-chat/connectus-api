export interface AsymmetricKeys {
    privateKey: string
    publicKey: string
}

export interface IAsymmetricKeyService {
    generateKeyPair(): Promise<AsymmetricKeys>
    encrypt(publicKey: string, message: string): Promise<string>
    decrypt(privateKey: string, encryptedMessage: string): Promise<string>
}
