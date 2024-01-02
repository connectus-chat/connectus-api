import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'

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
    io.on('connection', socket => {
        console.log('[WS] Novo usuário conectado')

        socket.on('join', (data: {id: string; friendId: string}) => {
            const {id, friendId} = data
            // Join in a room (friendId)
            socket.join(`${id}:${friendId}`)

            // Find public keys os users
            const publicKeyUser = ''
            const publicKeyFriend = ''

            // Generate a new session key
            const sessionKey = ''

            // Encrypt session key with public keys
            const userEncryptedSessionKey = ''
            const friendEncryptedSessionKey = ''

            // Emit session keys to your respective owner
            io.to(`${id}:${friendId}`).emit('set-session-key', {
                userEncryptedSessionKey,
            })
            io.to(`${friendId}:${id}`).emit('set-session-key', {
                friendEncryptedSessionKey,
            })
        })

        socket.on(
            'send-message',
            (data: {
                id: string
                friendId: string
                encryptedMessage: string
            }) => {
                const {id, friendId, encryptedMessage} = data
                console.log(
                    `Recebendo mensagem de ${id} para enviar para ${friendId}`,
                )
                console.log(encryptedMessage)
                io.to(`${friendId}:${id}`).emit('receive-message', {
                    encryptedMessage,
                })
            },
        )
    })
}
