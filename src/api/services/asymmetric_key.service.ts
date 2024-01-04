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
    generateKeyPair(): AsymmetricKeys {
        const {publicKey, privateKey} = generateKeyPairSync('rsa', {
            modulusLength: 2048,
        })
        return {
            publicKey: publicKey
                .export({type: 'pkcs1', format: 'pem'})
                .toString(),
            privateKey: privateKey
                .export({
                    type: 'pkcs1',
                    format: 'pem',
                })
                .toString(),
        }
    }

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
