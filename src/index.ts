import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import {FRONTEND_URL} from './constants'
import {router} from './routes'
import {createWebsocketServer, setDefaultEvents} from './websockets'

const app = express()
app.use(express.json())
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
    }),
)
app.use(router)

const PORT = process.env.PORT || 3000

const {io, server} = createWebsocketServer(app)
setDefaultEvents(io)

server.listen(PORT)
