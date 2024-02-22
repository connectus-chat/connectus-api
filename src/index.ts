import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import {FRONTEND_URL} from './constants'
import {router} from './routes'
import {createWebsocketServer, setDefaultEvents} from './websockets'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
    }),
)

app.use('/', (_, resp) => {
    return resp.json({
        name: 'Connectus API v2.0',
        description: '🔐 A Node.js Web API to chat safely',
        nowIs: new Date(),
    })
})
app.use('/dashboard', express.static('public'))
app.use(router)

const PORT = process.env.PORT || 3000

const {io, server} = createWebsocketServer(app)
setDefaultEvents(io)

server.listen(PORT)
