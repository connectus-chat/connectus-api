import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { AsymmetricKeyService } from './api/services/asymmetric_key.service'
import { LocalCredentialsRepository } from './api/services/repositories/local_credentials_repository'
import { SymmetricKeyService } from './api/services/symmetric_key.service'
import { FindPublicKeyUseCase } from './domain/use_cases/credentials/find_public_key'
import { DecryptTwofishKey } from './domain/use_cases/rsa_crypto/decrypt_twofish_key'
import { EncryptTwofishKey } from './domain/use_cases/rsa_crypto/encrypt_twofish_key'
import { CreateTwofishKey } from './domain/use_cases/twofish_crypto/create_twofish_key'

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

        socket.on('join', async (data: {id: string; friendId: string}) => {
            const {id, friendId} = data
            // Join in a room (friendId)
            socket.join(`${id}:${friendId}`)

            // Find public keys os users
            const findPublicKeyUseCase = new FindPublicKeyUseCase(
                new LocalCredentialsRepository(),
            )
            const publicKeyUser = await findPublicKeyUseCase.execute(id)
            const publicKeyFriend = await findPublicKeyUseCase.execute(friendId)

            // Generate a new session key
            const generateSymmetricKeyUC = new CreateTwofishKey(
                new SymmetricKeyService(),
            )
            const sessionKey = generateSymmetricKeyUC.execute().key

            // Encrypt session key with public keys
            const asymmetricService = new AsymmetricKeyService()
            const encryptUC = new EncryptTwofishKey(asymmetricService)
            const decryptUC = new DecryptTwofishKey(asymmetricService)
            const userEncryptedSessionKey = encryptUC.execute(
                publicKeyUser,
                sessionKey,
            )
            const friendEncryptedSessionKey = decryptUC.execute(
                publicKeyFriend,
                sessionKey,
            )

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
