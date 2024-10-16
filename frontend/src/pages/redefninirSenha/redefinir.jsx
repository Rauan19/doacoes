// RedefinirSenha.js
import { useState } from 'react';
import api from '../../api/api'; // Certifique-se de que o caminho para a API está correto
import { Formulario, Label, Input, Button, ContainerEMail } from './style'; // Importe os estilos
import { Commet } from 'react-loading-indicators'; // Importando o componente de loading

const RedefinirSenha = () => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');
    setIsLoading(true); // Ativa o loading

    try {
      const response = await api.post('/redefinirsenha', { email });
      setMensagem(response.data.message);
      setEmail("");
    } catch (error) {
      setErro(error.response?.data.message || 'Erro ao enviar e-mail.');
    } finally {
      setIsLoading(false); // Desativa o loading
    }
  };

  return (
    <ContainerEMail>
      <Formulario onSubmit={handleSubmit}>
        <h2>Email de redefinição de senha</h2>
        <Label>Email</Label>
        <Input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          placeholder='Digite seu email'
        />
        {isLoading ? ( // Verifica se está em loading
          <Commet
            width={40}
            height={40}
            color="#6D54CF"
            ariaLabel="loading"
          />
        ) : (
          <Button type="submit">Enviar</Button>
        )}
        
        {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
      </Formulario>
    </ContainerEMail>
  );
};

export default RedefinirSenha;
