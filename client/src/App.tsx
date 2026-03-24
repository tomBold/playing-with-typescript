import { useCallback, useState } from 'react'
import './App.css'

interface Endpoint {
  id: string
  label: string
  path: string
  description: string
  responseType: 'text' | 'json'
}

const ENDPOINTS: Endpoint[] = [
  {
    id: 'hello',
    label: 'Hello',
    path: '/api/hello',
    description: 'Plain-text greeting from the server.',
    responseType: 'text',
  },
  {
    id: 'health',
    label: 'Health',
    path: '/api/health',
    description: 'JSON health check with server time.',
    responseType: 'json',
  },
  {
    id: 'message',
    label: 'Message',
    path: '/api/message',
    description: 'JSON message from the TypeScript backend.',
    responseType: 'json',
  },
]

interface CardState {
  loading: boolean
  status?: number
  body?: string
  error?: string
}

function CardResponse({ state }: { state: CardState }) {
  const ok = state.status !== undefined && state.status < 300
  return (
    <div className="card__body">
      {state.body !== undefined && (
        <div className="card__result" key={state.body}>
          <span className={`badge ${ok ? 'badge--ok' : 'badge--err'}`}>
            {state.status} {ok ? 'OK' : 'ERROR'}
          </span>
          <pre className="card__pre">{state.body}</pre>
        </div>
      )}
      {state.error !== undefined && (
        <pre className="card__pre card__pre--err" key={state.error}>{state.error}</pre>
      )}
    </div>
  )
}

function EndpointCard({ endpoint, index }: { endpoint: Endpoint; index: number }) {
  const [state, setState] = useState<CardState>({ loading: false })

  const call = useCallback(() => {
    setState(prev => ({ ...prev, loading: true }))
    fetch(endpoint.path)
      .then(async (res) => {
        const body =
          endpoint.responseType === 'json'
            ? JSON.stringify(await res.json(), null, 2)
            : await res.text()
        setState({ loading: false, status: res.status, body })
      })
      .catch((e: unknown) => {
        setState({ loading: false, error: e instanceof Error ? e.message : String(e) })
      })
  }, [endpoint.path, endpoint.responseType])

  const ok = state.status !== undefined && state.status < 300
  const settled = state.body !== undefined || state.error !== undefined

  return (
    <article
      className={`card ${settled ? (ok ? 'card--ok' : 'card--err') : ''}`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="card__head">
        <span className="badge badge--get">GET</span>
        <code className="card__path">{endpoint.path}</code>
        <span className="card__label">{endpoint.label}</span>
      </div>

      <p className="card__desc">{endpoint.description}</p>

      <CardResponse state={state} />

      <button
        type="button"
        className={`btn${state.loading ? ' btn--loading' : ''}`}
        onClick={call}
        disabled={state.loading}
      >
        {state.loading ? 'Calling…' : settled ? 'Call again' : 'Call'}
      </button>
    </article>
  )
}

function EchoCard({ index }: { index: number }) {
  const [input, setInput] = useState('{\n  "message": "hello"\n}')
  const [state, setState] = useState<CardState>({ loading: false })

  const send = useCallback(() => {
    let parsed: unknown
    try {
      parsed = JSON.parse(input)
    } catch {
      setState({ loading: false, error: 'Invalid JSON — fix the body and try again.' })
      return
    }

    setState(prev => ({ ...prev, loading: true }))
    fetch('/api/echo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    })
      .then(async (res) => {
        const body = JSON.stringify(await res.json(), null, 2)
        setState({ loading: false, status: res.status, body })
      })
      .catch((e: unknown) => {
        setState({ loading: false, error: e instanceof Error ? e.message : String(e) })
      })
  }, [input])

  const ok = state.status !== undefined && state.status < 300
  const settled = state.body !== undefined || state.error !== undefined

  return (
    <article
      className={`card ${settled ? (ok ? 'card--ok' : 'card--err') : ''}`}
      style={{ animationDelay: `${index * 120}ms` }}    >
      <div className="card__head">
        <span className="badge badge--post">POST</span>
        <code className="card__path">/api/echo</code>
        <span className="card__label">Echo</span>
      </div>

      <p className="card__desc">Send a JSON body — the server echoes it back with a timestamp.</p>

      <label className="card__input-label">
        Request body <span className="card__input-hint">— edit the JSON below</span>
      </label>
      <textarea
        className="card__textarea"
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        spellCheck={false}
        aria-label="Request body"
      />

      <CardResponse state={state} />

      <button
        type="button"
        className={`btn${state.loading ? ' btn--loading' : ''}`}
        onClick={send}
        disabled={state.loading}
      >
        {state.loading ? 'Sending…' : 'Send'}
      </button>
    </article>
  )
}

export default function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1>API Explorer</h1>
        <p className="app__sub">Live responses from the Express backend.</p>
      </header>
      <div className="app__grid">
        {ENDPOINTS.map((ep, i) => (
          <EndpointCard key={ep.id} endpoint={ep} index={i} />
        ))}
        <EchoCard index={ENDPOINTS.length} />
      </div>
    </main>
  )
}
