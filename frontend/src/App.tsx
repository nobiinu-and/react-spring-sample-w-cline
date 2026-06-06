import { useEffect, useState } from 'react'

function App() {
  const [name, setName] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [history, setHistory] = useState<string[]>([])
  const [error, setError] = useState<string>('')

  const fetchHistory = () => {
    fetch('/api/hello/history')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
        return res.json()
      })
      .then((data: { message: string }[]) => {
        setHistory(data.map((d) => d.message))
        setError('')
      })
      .catch((err: Error) => setError(err.message))
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const handleSubmit = () => {
    const url = name.trim()
      ? `/api/hello?name=${encodeURIComponent(name.trim())}`
      : '/api/hello'
    fetch(url, { method: 'POST' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
        return res.json()
      })
      .then((data: { message: string }) => {
        setMessage(data.message)
        setError('')
        fetchHistory()
      })
      .catch((err: Error) => setError(err.message))
  }

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '4rem' }}>
      <h1>Hello World App</h1>
      <div>
        <input
          type="text"
          placeholder="名前を入力"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSubmit}>送信</button>
      </div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {message && <h2>{message}</h2>}
      {history.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>履歴</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {history.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
      <p style={{ color: 'gray' }}>React + Spring Boot + PostgreSQL</p>
    </div>
  )
}

export default App
