import fs from 'node:fs'
import path from 'node:path'
import express, { type Express } from 'express'

export function registerClientStaticAndSpa(app: Express, serverRootDir: string) {
  const clientDist = path.join(serverRootDir, '../client/dist')
  const hasClient = fs.existsSync(path.join(clientDist, 'index.html'))

  if (hasClient) {
    app.use(express.static(clientDist))
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
