import express from 'express'
import userRouter from './user.routes'
import authRouter from './auth.routes'
import cvTemplateRouter from './cv-template.routes'


const router = express.Router()


router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/template', cvTemplateRouter)

export default router