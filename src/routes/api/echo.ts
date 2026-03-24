import { Router } from 'express'

export const echoRouter = Router()

echoRouter.post('/', (req, res) => {
  const body = req.body as unknown

  if (body === undefined || body === null || Object.keys(body as object).length === 0) {
    res.status(400).json({ error: 'Request body is required' })
    return
  }

  res.json({
    echoed: body,
    receivedAt: new Date().toISOString(),
  })
})
