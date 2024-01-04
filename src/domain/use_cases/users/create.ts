import { credentials } from '../../../api/services/repositories/local_credentials_repository';
import { users } from '../../../api/services/repositories/local_user_repository';
import { User2Create } from '../../entities/user';
import { IAsymmetricKeyService } from '../../ports/iasymmetric_key_service';
import { ICredentialsRepository } from '../../ports/icredentials_repository';
import { IUserRepository } from '../../ports/iuser_repository';
import { CreateUseCase as CreateCredentials } from '../credentials/create';
import { CreateRSAKeyPairs } from '../rsa_crypto/create_rsa_key_pairs';

export class CreateUseCase {
    constructor(private readonly userRepository: IUserRepository, 
                private readonly credentialRepository: ICredentialsRepository,
                private readonly asymmetricKeyService: IAsymmetricKeyService) {}

    async execute(newUser: User2Create) {
        const createKeyPair = new CreateRSAKeyPairs(this.asymmetricKeyService);
        const keyPair = createKeyPair.execute();
        const createdUser = await this.userRepository.create(newUser)
        if (!createdUser) throw new Error('Erro ao criar novo usuário.')
        const createCredential = new CreateCredentials(this.credentialRepository);
        await createCredential.execute(createdUser.id, keyPair);
        console.log('users: ', users);
        console.log('credentials: ', credentials);
        return createdUser
    }
}
