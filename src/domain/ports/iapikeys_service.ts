export interface IApiKeyService {
    fetchKeys(): Promise<string[]>
    generateKey(): Promise<string>
}
