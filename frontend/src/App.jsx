import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [texto, setTexto] = useState('Carregando dados do Django...')

  useEffect(() => {
    // Faz a requisição para a API do Django
    axios.get('http://localhost:8000/api/teste/')
      .then(response => {
        // Guarda a mensagem recebida no estado do React
        setTexto(response.data.mensagem)
      })
      .catch(error => {
        console.error("Erro ao conectar com o Django:", error)
        setTexto('Erro ao conectar com o servidor.')
      })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
        <h2>Frontend React (Vite)</h2>
        <p style={{ color: '#4caf50', fontWeight: 'bold' }}>{texto}</p>
      </div>
    </div>
  )
}

export default App
