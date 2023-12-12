export interface IEventHandlerService {
    emit<DataRequest>(topic: string, data: DataRequest): void
    subscribe<DataResponse>(
        topic: string,
        callback: (data: DataResponse) => unknown,
    ): void
}
