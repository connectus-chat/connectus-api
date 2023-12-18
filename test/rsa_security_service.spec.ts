import { AsymmetricKeyService } from '../src/api/services/asymmetric_key.service';
import { SymmetricKeyService } from '../src/api/services/symmetric_key.service';
import { AsymmetricKeys } from '../src/domain/ports/iasymmetric_key_service';
import { CreateRSAKeyPairs } from '../src/domain/use_cases/rsa_crypto/create_rsa_key_pairs';
import { DecryptTwofishKey } from '../src/domain/use_cases/rsa_crypto/decrypt_twofish_key';
import { EncryptTwofishKey } from '../src/domain/use_cases/rsa_crypto/encrypt_twofish_key';
import { CreateTwofishKey } from '../src/domain/use_cases/twofish_crypto/create_twofish_key';

describe('RSA', () => {
    let keyPair: AsymmetricKeys;
    const rsaService = new AsymmetricKeyService();
    const encryptUC = new EncryptTwofishKey(rsaService);
    const decryptUC = new DecryptTwofishKey(rsaService);
    const twofishService = new SymmetricKeyService();
    const createTwofishKeyUC = new CreateTwofishKey(twofishService);

    beforeAll(() => {
        const createKeyPair = new CreateRSAKeyPairs(new AsymmetricKeyService());
        keyPair = createKeyPair.execute();
    });
    it('Should encrypt a message with RSA', () => {
        const result = encryptUC.execute(keyPair.publicKey, 'teste');
        expect(result).not.toBeNull();
    })

    it('Should decrypt a message encrypted with RSA', () => {
        const message = 'mensagem teste'
        const encryptedMessage = encryptUC.execute(keyPair.publicKey, message);
        const decryptedMessage = decryptUC.execute(keyPair.privateKey, encryptedMessage);
        expect(decryptedMessage).toBe(message);
    })

    it('Should encrypt and decrypt a twofish key', () => {
        const key = createTwofishKeyUC.execute();
        console.log(`CHAVE TWOFISH DA SESSÃO tamanho = ${key.key.length} \n${key.key}`)
        const encryptedKey = encryptUC.execute(keyPair.publicKey, key.key);
        console.log(`encrypted twofish key in size ${encryptedKey.length}: ${encryptedKey}`);
        const decryptedKey = decryptUC.execute(keyPair.privateKey, encryptedKey);
        console.log(`decrypted twofish key in size ${decryptedKey.length}: ${decryptedKey}`);
        expect(decryptedKey).toBe(key.key);
    })
})