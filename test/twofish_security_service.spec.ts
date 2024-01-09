import {SymmetricKeyService} from '../src/api/services/symmetric_key.service'
import {CreateTwofishKey} from '../src/domain/use_cases/twofish_crypto/create_twofish_key'
import {DecryptTwofishKey} from '../src/domain/use_cases/twofish_crypto/decrypt_twofish_key'
import {EncryptTwofishKey} from '../src/domain/use_cases/twofish_crypto/encrypt_twofish_key'

const symmetricService = new SymmetricKeyService()

describe('Twofish', () => {
    let key: string = ''

    beforeAll(() => {
        const createUC = new CreateTwofishKey(symmetricService)
        key = createUC.execute().key
    })

    it('Should encrypt correctly', () => {
        const message = 'ola mundo'
        const encryptUC = new EncryptTwofishKey(symmetricService)
        const encryptedMessage = encryptUC.execute(key, message)
        expect(encryptedMessage).toBeTruthy()
    })

    it('Should decrypt correctly', () => {
        const message = 'salve'
        const encryptUC = new EncryptTwofishKey(symmetricService)
        const encryptedMessage = encryptUC.execute(key, message)

        const decryptUC = new DecryptTwofishKey(symmetricService)
        const decryptedMessage = decryptUC.execute(key, encryptedMessage)
        expect(decryptedMessage).toMatch(message)
    })
})
