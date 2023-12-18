import {HttpError} from '../../errors/http_error'
import {IUserRepository} from '../../ports/iuser_repository'

export class LoginUseCase {
    constructor(private readonly userService: IUserRepository) {}

    async execute(username: string, password: string) {
        const foundUser = await this.userService.findByUsernameAndPassword(
            username,
            password,
        )
        if (!foundUser)
            throw new HttpError('Usuário/senha incorretos ou não existem')
        return foundUser
    }
}
