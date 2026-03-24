import { Router } from 'express'
import { echoRouter } from './echo'
import { healthRouter } from './health'
import { helloRouter } from './hello'
import { messageRouter } from './message'

export const apiRouter = Router()

apiRouter.use('/hello', helloRouter)
apiRouter.use('/health', healthRouter)
apiRouter.use('/message', messageRouter)
apiRouter.use('/echo', echoRouter)
