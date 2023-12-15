export interface IEventHandlerService {
    emit<DataRequest>(topic: string, data: DataRequest): void
    emit2Room<DataRequest>(
        topic: string,
        room: string | string[],
        data: DataRequest,
    ): void
    on<DataResponse>(
        topic: string,
        callback: (data: DataResponse) => unknown,
    ): void
}
