// src/components/PaginaRedefinirSenha.js
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formulario, Label, Input, Button, ContainerSenhaTOken } from './styleRdefinir'; // Importando os estilos
import api from '../../api/api'; // Ajuste o caminho para o seu arquivo de API
import { Commet } from 'react-loading-indicators'; // Importação do componente de loading

const PaginaRedefinirSenha = () => {
  const { token } = useParams(); // Recupera o token da URL
  const [novaSenha, setNovaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');
    setIsLoading(true); // Ativa o loading

    try {
      const response = await api.post(`/redefinirSenha/${token}`, { password: novaSenha });
      setMensagem(response.data.message);
      setNovaSenha("");
    } catch (error) {
      setErro(error.response?.data.message || 'Erro ao redefinir a senha.');
    } finally {
      setIsLoading(false); // Desativa o loading
    }
  };

  return (
    <ContainerSenhaTOken>
      <h2>Redefinir Senha</h2>
      {isLoading ? (
        <Commet
          width={80}
          height={80}
          color="#6D54CF"
          ariaLabel="loading"
        />
      ) : (
        <Formulario onSubmit={handleSubmit}>
          <Label>Nova Senha</Label>
          <Input 
            type="password" 
            value={novaSenha} 
            onChange={(e) => setNovaSenha(e.target.value)} 
            required 
            placeholder='Digite nova senha'
          />
          <Button type="submit">Redefinir Senha</Button>

          {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
        </Formulario>
      )}
    </ContainerSenhaTOken>
  );
};

export default PaginaRedefinirSenha;
