import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle, Lock } from 'lucide-react';
import { Commet } from 'react-loading-indicators'; // Importação do componente de loading
import {
  StyledContainer,
  StyledCard,
  StyledCardHeader,
  StyledCardTitle,
  StyledCardContent,
  StyledCardFooter,
  StyledInput,
  StyledButton,
} from './styles';
import api from '../../api/api';
import { useState } from 'react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post('/loginUser', data);
      const token = response?.data?.token;

      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.id;
        
        localStorage.setItem(
          "doacao",
          JSON.stringify({ token, id: userId })
        );

        navigate('/');

        window.location.reload();
      } else {
        alert("Erro ao obter token");
      }
      
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
      console.error("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledContainer>
      {isLoading ? (
        <Commet
          width={80}
          height={80}
          color="#6D54CF"
          ariaLabel="loading"
        />
      ) : (
        <StyledCard>
          <StyledCardHeader>
            <StyledCardTitle>Login</StyledCardTitle>
            <p>Entre na sua conta para continuar</p>
          </StyledCardHeader>
          <StyledCardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group">
                <div className="input-icon">
                  <UserCircle color='#6D54CF' />
                  <StyledInput
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: 'Email é obrigatório' })}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
              </div>
              <div className="input-group">
                <div className="input-icon">
                  <Lock color='#6D54CF' />
                  <StyledInput
                    type="password"
                    placeholder="Senha"
                    {...register('password', { required: 'Senha é obrigatória' })}
                    disabled={isLoading}
                  />
                </div>
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
              </div>
              <div className="text-right">
                <Link to="/redefinir-senha">Esqueceu a senha?</Link>
              </div>
              <StyledButton type="submit" disabled={isLoading}>
                Entrar
              </StyledButton>
            </form>
          </StyledCardContent>
          <StyledCardFooter>
            <p>
              Não tem uma conta?{' '}
              <Link to="/registro">Registre-se</Link>
            </p>
          </StyledCardFooter>
        </StyledCard>
      )}
    </StyledContainer>
  );
};

export default Login;
