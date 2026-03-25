import fs from 'node:fs'
import path from 'node:path'
import express, { type Express } from 'express'
import { logger } from '../logger'

export function registerClientStaticAndSpa(app: Express, serverRootDir: string) {
  const clientDist = path.join(serverRootDir, '../client/dist')
  const hasClient = fs.existsSync(path.join(clientDist, 'index.html'))

  if (hasClient) {
    logger.debug({ clientDist }, 'serving static client build')
    app.use(express.static(clientDist))
  } else {
    logger.warn({ clientDist }, 'client build not found — SPA serving disabled')
  }

  app.use((req, res) => {
    if (req.path.startsWith('/api')) {
      res.status(404).json({ error: 'Not found' })
      return
    }
    if (req.method === 'GET' && hasClient) {
      res.sendFile(path.join(clientDist, 'index.html'))
      return
    }
    res.status(404).send('Not found')
  })
}
