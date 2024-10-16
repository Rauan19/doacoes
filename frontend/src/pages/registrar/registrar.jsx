import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { UserCircle, Mail, Lock } from 'lucide-react';
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
} from './style';
import api from '../../api/api';
import { useState } from 'react';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false); // Estado de loading

  const onSubmit = async (data) => {
    setIsLoading(true); // Ativa o loading
    try {
      const response = await api.post('/newUser', data);
      alert('Registro realizado com sucesso!');
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      alert('Ocorreu um erro ao registrar. Tente novamente.');
    } finally {
      setIsLoading(false); // Desativa o loading
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
            <StyledCardTitle>Registro</StyledCardTitle>
            <p>Crie sua conta para continuar</p>
          </StyledCardHeader>
          <StyledCardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group">
                <div className="input-icon">
                  <UserCircle color='#6D54CF' />
                  <StyledInput
                    type="text"
                    placeholder="Nome"
                    {...register('name', { required: 'Nome é obrigatório' })}
                  />
                </div>
                {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
              </div>
              <div className="input-group">
                <div className="input-icon">
                  <Mail color='#6D54CF' />
                  <StyledInput
                    type="email"
                    placeholder="Email"
                    {...register('email', {
                      required: 'Email é obrigatório',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Formato de email inválido'
                      }
                    })}
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
                    {...register('password', {
                      required: 'Senha é obrigatória',
                      minLength: { value: 6, message: 'A senha deve ter pelo menos 6 caracteres' }
                    })}
                  />
                </div>
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
              </div>
              <StyledButton type="submit" disabled={isLoading}>
                Registrar
              </StyledButton>
            </form>
          </StyledCardContent>
          <StyledCardFooter>
            <p>
              Já tem uma conta?{' '}
              <Link to="/login">Entrar</Link>
            </p>
          </StyledCardFooter>
        </StyledCard>
      )}
    </StyledContainer>
  );
};

export default Register;
