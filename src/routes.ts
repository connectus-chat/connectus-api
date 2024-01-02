import express from 'express'
import {GroupRoutes} from './api/routes/groups'
import {MessageRoutes} from './api/routes/messages'
import {UserRoutes} from './api/routes/users'

export const router = express.Router()

router.use(UserRoutes)
router.use(GroupRoutes)
router.use(MessageRoutes)
