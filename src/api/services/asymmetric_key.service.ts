import {
    constants,
    generateKeyPairSync,
    privateDecrypt,
    publicEncrypt,
} from 'crypto'
import {
    AsymmetricKeys,
    IAsymmetricKeyService,
} from '../../domain/ports/iasymmetric_key_service'

export class AsymmetricKeyService implements IAsymmetricKeyService {
    // DEPRECATED
    generateKeyPair(): AsymmetricKeys {
        const {publicKey, privateKey} = generateKeyPairSync('rsa', {
            modulusLength: 2048,
        })
        return {
            publicKey: publicKey
                .export({type: 'spki', format: 'pem'})
                .toString(),
            privateKey: privateKey
                .export({
                    type: 'pkcs8',
                    format: 'pem',
                })
                .toString(),
        }
    }

    // DEPRECATED
    encrypt(publicKey: string, message: string): string {
        const encryptedMessage = publicEncrypt(
            {
                key: publicKey,
                padding: constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256',
            },
            Buffer.from(message),
        )
        return encryptedMessage.toString('base64')
    }

    // DEPRECATED
    decrypt(privateKey: string, encryptedMessage: string): string {
        const decryptedData = privateDecrypt(
            {
                key: privateKey,
                padding: constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256',
            },
            Buffer.from(encryptedMessage, 'base64'),
        )
        return decryptedData.toString()
    }
}
