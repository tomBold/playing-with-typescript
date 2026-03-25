import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { createApp } from '../../src/app'

const app = createApp()

describe('GET /api/message', () => {
  it('returns 200 with a message string', async () => {
    const res = await request(app).get('/api/message')
    expect(res.status).toBe(200)
    expect(typeof res.body.message).toBe('string')
    expect(res.body.message.length).toBeGreaterThan(0)
  })

  it('includes echoedPath pointing to /api/message', async () => {
    const res = await request(app).get('/api/message')
    expect(res.body.echoedPath).toBe('/api/message')
  })
})
