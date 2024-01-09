import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'
import {AsymmetricKeyService} from './api/services/asymmetric_key.service'
import {PrismaCredentialsService} from './api/services/prisma/prisma_credentials_service'
import {SymmetricKeyService} from './api/services/symmetric_key.service'
import {FindPublicKeyUseCase} from './domain/use_cases/credentials/find_public_key'
import {Encrypt} from './domain/use_cases/rsa_crypto/encrypt'
import {CreateTwofishKey} from './domain/use_cases/twofish_crypto/create_twofish_key'

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
                new PrismaCredentialsService(),
            )
            const publicKeyUser = await findPublicKeyUseCase.execute(id)
            const publicKeyFriend = await findPublicKeyUseCase.execute(friendId)

            // Generate a new session key
            const generateSymmetricKeyUC = new CreateTwofishKey(
                new SymmetricKeyService(),
            )
            const sessionKey = generateSymmetricKeyUC.execute().key

            console.log('[WS] Nova chave de sessão gerada: ', sessionKey)

            // Encrypt session key with public keys
            const asymmetricService = new AsymmetricKeyService()
            const encryptUC = new Encrypt(asymmetricService)
            // const decryptUC = new Decrypt(asymmetricService)
            const userEncryptedSessionKey = encryptUC.execute(
                publicKeyUser,
                sessionKey,
            )
            const friendEncryptedSessionKey = encryptUC.execute(
                publicKeyFriend,
                sessionKey,
            )

            console.log(
                '[WS] Criptografando chave do usuário: ',
                userEncryptedSessionKey,
            )

            console.log(
                '[WS] Criptografando chave do amigo: ',
                friendEncryptedSessionKey,
            )

            // Emit session keys to your respective owner
            io.to(`${id}:${friendId}`).emit('set-session-key', {
                encryptedSessionKey: userEncryptedSessionKey,
            })
            io.to(`${friendId}:${id}`).emit('set-session-key', {
                encryptedSessionKey: friendEncryptedSessionKey,
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
