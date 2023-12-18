import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'
import {WebsocketEventHandlerService} from './api/services/websocket_event_handler_service'
import {JoinUseCase} from './domain/use_cases/chat/join'

export function createWebsocketServer(app: express.Express) {
    const server = createServer(app)
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
        maxHttpBufferSize: 1e8,
    })
    return {
        io,
        server,
    }
}

export function setDefaultEvents(io: Server) {
    const eventHandler = new WebsocketEventHandlerService(io)
    const joinUC = new JoinUseCase(eventHandler)
    joinUC.execute()
}
