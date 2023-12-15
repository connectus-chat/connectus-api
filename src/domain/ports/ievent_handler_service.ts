export interface IEventHandlerService {
    emit<DataRequest>(topic: string, data: DataRequest): void
    on<DataResponse>(
        topic: string,
        callback: (data: DataResponse) => unknown,
    ): void
}
