import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'
import {Logger} from './api/services/Logger'
import {PrismaCredentialsService} from './api/services/repositories/prisma/prisma_credentials_service'
import {PrismaMessageGroupRepository} from './api/services/repositories/prisma/prisma_message_group_repository'
import {PrismaMessageRepository} from './api/services/repositories/prisma/prisma_message_repository'
import {FindPublicKeyUseCase} from './domain/use_cases/credentials/find_public_key'
import {CreateGroupMessageUseCase} from './domain/use_cases/messages/create_group_message'
import {CreateMessageUseCase} from './domain/use_cases/messages/create_message'

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

const createMessageGroupUC = new CreateGroupMessageUseCase(
    new PrismaMessageGroupRepository(),
)
const createMessageUC = new CreateMessageUseCase(new PrismaMessageRepository())

export function setDefaultEvents(io: Server) {
    io.on('connection', socket => {
        Logger.websocketLog('Checando banco', 'Novo usuário logado', '')

        // ===================  PRIVATE EVENTS =========================

        socket.on(
            'join.private',
            async (data: {id: string; friendId: string}) => {
                const {id, friendId} = data
                // Entra em uma sala (friendId)
                socket.join(`${id}.${friendId}`)
                // Emite evento para saber todos que estão conectados naquela sala.
                io.to(`${friendId}.${id}`).emit('who-is-connected')
            },
        )

        socket.on(
            'confirm-connection.private',
            async (data: {id: string; friendId: string}) => {
                const {id, friendId} = data
                const findPublicKey = new FindPublicKeyUseCase(
                    new PrismaCredentialsService(),
                )
                const userPublicKey = await findPublicKey.execute(id)
                // Emite evento com a chave pública de quem confirmou conexão
                io.to(`${friendId}.${id}`).emit('i-am-connected', {
                    id,
                    whoWantsKnowId: friendId,
                    publicKey: userPublicKey,
                })
            },
        )

        socket.on(
            'send-message.private',
            async (data: {
                id: string
                friendId: string
                encryptedMessage: string
                encryptedSessionKeys: {
                    senderEncryptedSessionKey: string
                    receiverEncryptedSessionKey: string
                }
            }) => {
                const {id, friendId, encryptedMessage, encryptedSessionKeys} =
                    data

                Logger.operationLog(
                    'Troca de mensagens',
                    `Recebendo mensagens do usuário ${id} para o amigo ${friendId}`,
                    encryptedMessage,
                )

                await createMessageUC.execute(id, friendId, {
                    content: encryptedMessage,
                    publicCredentials: JSON.stringify(encryptedSessionKeys),
                })

                io.to(`${friendId}.${id}`).emit('receive-message', {
                    senderId: id,
                    encryptedMessage,
                })
            },
        )

        socket.on(
            'disconnect.private',
            async (data: {id: string; friendId: string}) => {
                const {friendId, id} = data

                io.to(`${friendId}.${id}`).emit('i-am-disconnecting', {
                    whoIsDisconnecting: id,
                })
            },
        )

        // ===================  GROUP EVENTS ========================

        socket.on('join.group', async (data: {id: string; groupId: string}) => {
            const {id, groupId} = data
            // Entra em uma sala (groupId)
            socket.join(groupId)
            // Emite evento para saber todos que estão conectados naquela sala.
            io.to(groupId).emit('who-is-connected', {
                whoWantsKnowId: id,
            })
        })

        socket.on(
            'confirm-connection.group',
            async (data: {
                id: string
                groupId: string
                whoWantsKnowId: string
            }) => {
                const {id, groupId, whoWantsKnowId} = data
                const findPublicKey = new FindPublicKeyUseCase(
                    new PrismaCredentialsService(),
                )
                const userPublicKey = await findPublicKey.execute(id)
                // Emite evento com a chave pública de quem confirmou conexão
                io.to(groupId).emit('i-am-connected', {
                    whoWantsKnowId,
                    id,
                    publicKey: userPublicKey,
                })
            },
        )

        socket.on(
            'send-message.group',
            async (data: {
                id: string
                groupId: string
                encryptedMessage: string
                encryptedSessionKeys: {
                    senderEncryptedSessionKey: string
                    recipients: {
                        id: string // id of each group participant
                        encryptedSessionKey: string // encrypted session key using his public key
                    }[]
                }
            }) => {
                const {id, groupId, encryptedMessage, encryptedSessionKeys} =
                    data
                Logger.operationLog(
                    'Troca de mensagens',
                    `Recebendo mensagens do usuário ${id} para o grupo ${groupId}`,
                    encryptedMessage,
                )
                // Saving group messages
                await createMessageGroupUC.execute(id, groupId, {
                    content: encryptedMessage,
                    publicCredentials: JSON.stringify(encryptedSessionKeys),
                })
                io.to(groupId).emit('receive-message', {
                    senderId: id,
                    encryptedMessage,
                })
            },
        )

        socket.on(
            'disconnect.group',
            async (data: {id: string; groupId: string}) => {
                const {groupId, id} = data
                io.to(groupId).emit('i-am-disconnecting', {
                    whoIsDisconnecting: id,
                })
            },
        )
    })
}
