import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 1. Importa o navegador de rotas

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate(); // 2. Inicializa o gancho de navegação

  const lidarComLogin = async (e) => {
    e.preventDefault();
    setStatus('Autenticando...');

    try {
      // Altere a linha 17 para ficar exatamente assim:
  const resposta = await axios.post('https://frontend-react-etcm.onrender.com/', {

        username: username,
        password: password
      });

      const { access } = resposta.data;
      
      // Salva o token de segurança no navegador
      localStorage.setItem('token_acesso', access);
      
      setStatus('🎉 Login efetuado com sucesso! Redirecionando...');
      
      // 3. Muda a tela do usuário para o painel de cadastro instantaneamente
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (erro) {
      console.error(erro);
      setStatus('❌ Usuário ou senha incorretos.');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Área de Login</h2>
      <form onSubmit={lidarComLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>
          Usuário:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </label>
        <label>
          Senha:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </label>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Entrar no Sistema
        </button>
      </form>
      {status && <p style={{ marginTop: '20px', textAlign: 'center', fontWeight: 'bold' }}>{status}</p>}
    </div>
  );
}

export default Login;
