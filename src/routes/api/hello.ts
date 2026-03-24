import { Router } from 'express'

export const helloRouter = Router()

helloRouter.get('/', (_req, res) => {
  res.status(200).type('text/plain').send('Hello Tom')
})
