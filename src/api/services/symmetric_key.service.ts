import {randomBytes} from 'crypto'
import * as twf from 'twofish'
import {
    ISymmetricKeyService,
    SymmetricKey,
} from '../../domain/ports/isymmetric_key_service'

export class SymmetricKeyService implements ISymmetricKeyService {
    generateKey(): SymmetricKey {
        return {key: randomBytes(64).toString('hex')}
    }

    encrypt(key: string, message: string): string {
        console.log(key, message)
        const twofish = twf.twofish()

        const dataArray = Uint8Array.from(Buffer.from(message, 'utf8'))
        const keyArray = Uint8Array.from(Buffer.from(key, 'utf-8'))

        const cipherText = twofish.encrypt(keyArray, dataArray)
        const encryptedString = cipherText
            .map((x: number) => x.toString(16).padStart(2, '0'))
            .join('')

        return encryptedString
    }

    decrypt(key: string, encryptedMessage: string): string {
        console.log(key, encryptedMessage)
        console.log(twf)

        const twofish = twf.twofish()

        const encryptedMessageBuffer = Buffer.from(encryptedMessage, 'utf8')
        const encryptedMessageArray = Uint8Array.from(encryptedMessageBuffer)
        const keyArray = Uint8Array.from(Buffer.from(key, 'utf-8'))

        const data = twofish.decrypt(keyArray, encryptedMessageArray)
        const decryptedString = data
            .map((x: number) => String.fromCharCode(x))
            .join('')

        return decryptedString
    }
}
