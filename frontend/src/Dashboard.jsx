import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const lidarComEnvio = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');

    // Pega o token de segurança salvo no momento do Login
    const token = localStorage.getItem('token_acesso');

    try {
      const resposta = await axios.post('https://frontend-react-etcm.onrender.com/', 
        { nome: nome, email: email },
        { 
          headers: {
            // Envia o token no formato "Bearer" que o Django Rest Framework exige
            'Authorization': `Bearer ${token}` 
          }
        }
      );

      if (resposta.data.status === 'sucesso') {
        setStatus('✅ Cliente salvo com sucesso no PostgreSQL protegido!');
        setNome('');
        setEmail('');
      }
    } catch (erro) {
      console.error(erro);
      setStatus('❌ Erro: Acesso negado ou token expirado!');
    }
  };

  const fazerLogout = () => {
    localStorage.removeItem('token_acesso'); // Limpa as credenciais
    navigate('/'); // Retorna para a tela de login
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Painel Interno</h2>
        <button onClick={fazerLogout} style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}>
          Sair
        </button>
      </div>
      <form onSubmit={lidarComEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <label>
          Nome: 
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </label>
        <label>
          E-mail: 
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </label>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4caf50', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Cadastrar Cliente
        </button>
      </form>
      {status && <p style={{ marginTop: '20px', textAlign: 'center', fontWeight: 'bold' }}>{status}</p>}
    </div>
  );
}

export default Dashboard;
