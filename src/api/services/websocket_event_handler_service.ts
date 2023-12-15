import {Server} from 'socket.io'
import {IEventHandlerService} from '../../domain/ports/ievent_handler_service'

/* ====== Socket.io Emitter Cheatsheet ======
    // to all clients
    emitter.emit(...);

    // to all clients in "room1"
    emitter.to("room1").emit(...);

    // to all clients in "room1" except those in "room2"
    emitter.to("room1").except("room2").emit(...);

    const adminEmitter = emitter.of("/admin");

    // to all clients in the "admin" namespace
    adminEmitter.emit(...);

    // to all clients in the "admin" namespace and in the "room1" room
    adminEmitter.to("room1").emit(...);
*/

export class WebsocketEventHandlerService implements IEventHandlerService {
    constructor(private readonly io: Server) {}

    emit2Room<DataRequest>(
        topic: string,
        room: string | string[],
        data: DataRequest,
    ): void {
        this.io.to(room).emit(topic, data)
    }

    emit<DataRequest>(topic: string, data: DataRequest): void {
        this.io.emit(topic, data)
    }

    on<DataResponse>(
        topic: string,
        callback: (data: DataResponse) => unknown,
    ): void {
        this.io.on(topic, callback)
    }
}
