import express from 'express'
import {GroupRoutes} from './api/routes/groups'
import {UserRoutes} from './api/routes/users'

export const router = express.Router()

router.use(UserRoutes)
router.use(GroupRoutes)
