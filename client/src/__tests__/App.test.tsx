import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

// Prevent actual network requests in tests
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

describe('App layout', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /api explorer/i })).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<App />)
    expect(screen.getByText(/live responses from the express backend/i)).toBeInTheDocument()
  })
})

describe('Endpoint cards', () => {
  it('shows all three GET endpoint paths', () => {
    render(<App />)
    expect(screen.getByText('/api/hello')).toBeInTheDocument()
    expect(screen.getByText('/api/health')).toBeInTheDocument()
    expect(screen.getByText('/api/message')).toBeInTheDocument()
  })

  it('shows the Echo POST card path', () => {
    render(<App />)
    expect(screen.getByText('/api/echo')).toBeInTheDocument()
  })

  it('renders a Call button for each GET endpoint', () => {
    render(<App />)
    const callButtons = screen.getAllByRole('button', { name: /^call$/i })
    expect(callButtons).toHaveLength(3)
  })

  it('renders a Send button for the Echo card', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /^send$/i })).toBeInTheDocument()
  })
})

describe('EchoCard interaction', () => {
  it('has a pre-filled textarea with default JSON', () => {
    render(<App />)
    const textarea = screen.getByRole('textbox', { name: /request body/i }) as HTMLTextAreaElement
    expect(textarea.value).toContain('"message"')
  })

  it('shows an error when Send is clicked with invalid JSON', async () => {
    render(<App />)
    const textarea = screen.getByRole('textbox', { name: /request body/i })
    await userEvent.clear(textarea)
    await userEvent.type(textarea, 'not valid json')
    await userEvent.click(screen.getByRole('button', { name: /^send$/i }))
    expect(screen.getByText(/invalid json/i)).toBeInTheDocument()
  })
})
