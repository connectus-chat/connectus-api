import * as crypto from 'crypto';
import { AsymmetricKeys, IAsymmetricKeyService } from '../../domain/ports/iasymmetric_key_service';

export class RSAService implements IAsymmetricKeyService {
    generateKeyPair(): AsymmetricKeys  {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
          });
        return {
            publicKey: publicKey,
            privateKey: privateKey,
        }
    }
    encrypt(publicKey: crypto.KeyObject, message: string): string {
        const encryptedMessage = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256'
            },
            Buffer.from(message)
        )
        return encryptedMessage.toString('base64');
    }

    decrypt(privateKey: crypto.KeyObject, encryptedMessage: string): string {
        const decryptedData = crypto.privateDecrypt(
            {
              key: privateKey,
              padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
              oaepHash: "sha256",
            },
            Buffer.from(encryptedMessage, 'base64')
          );

        return decryptedData.toString();
    }

} 