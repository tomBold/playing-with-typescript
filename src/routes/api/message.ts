import { Router } from 'express'

export const messageRouter = Router()

messageRouter.get('/', (_req, res) => {
  res.json({
    message: 'Hello from the TypeScript backend',
    echoedPath: '/api/message',
  })
})
