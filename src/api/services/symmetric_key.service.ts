import { randomBytes } from 'crypto'
import * as twf from 'twofish'
import {
    ISymmetricKeyService,
    SymmetricKey,
} from '../../domain/ports/isymmetric_key_service'
import { Logger } from './Logger'

export class SymmetricKeyService implements ISymmetricKeyService {
    generateKey(): SymmetricKey {
        return {key: randomBytes(64).toString('hex')}
    }

    encrypt(key: string, message: string): string {
        // console.log(key, message)
        Logger.cryptoLog('Encriptando mensagens utilizando RSA...', `Encriptando utilizando a chave ${key}`, `Mensagem: ${message}`)
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
        // console.log(key, encryptedMessage)
        Logger.cryptoLog('Decriptando mensagens utilizando RSA...', 
        `Decriptando utilizando a chave ${key}`, 
        `Mensagem encriptada: ${encryptedMessage}`);

        const twofish = twf.twofish()
        const encryptedMessageArray =
            this.hexStringToByteArray(encryptedMessage)
        const keyArray = Uint8Array.from(Buffer.from(key, 'utf-8'))

        const data = twofish.decrypt(keyArray, encryptedMessageArray)

        const decryptedHex = data
            .map((x: number) => x.toString(16).padStart(2, '0'))
            .join('')

        const decryptedString = new TextDecoder('utf-8').decode(
            new Uint8Array(
                decryptedHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)),
            ),
        )

        return decryptedString
    }

    private hexStringToByteArray(hexString: string) {
        const byteArray = new Uint8Array(hexString.length / 2)
        for (let i = 0; i < byteArray.length; i++) {
            byteArray[i] = parseInt(hexString.slice(i * 2, i * 2 + 2), 16)
        }
        return byteArray
    }
}
