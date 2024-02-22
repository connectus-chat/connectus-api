import {HttpError} from '../../errors/http_error'
import {IApiKeyService} from '../../ports/iapikeys_service'

export class VerifyUseCase {
    constructor(private readonly apikeyService: IApiKeyService) {}

    async execute(key: string) {
        const keys = await this.apikeyService.fetchKeys()
        const exists = keys.findIndex(k => k === key) !== -1
        if (!exists) throw new HttpError('Acesso não autorizado', 403)
        return exists
    }
}
