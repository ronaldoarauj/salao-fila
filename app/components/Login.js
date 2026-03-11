'use client';
import { useState } from 'react';
import styled from 'styled-components';
import { createClient } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoginCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const LoginTitle = styled.h1`
  color: #2d3748;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 2rem;
`;

const LoginSubtitle = styled.p`
  color: #718096;
  text-align: center;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 90%;
  padding: 1rem;
  border: 2px solid ${props => props.error ? '#f56565' : '#e2e8f0'};
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 15px -3px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #f56565;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  font-size: 0.875rem;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #cbd5e0;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

const DemoButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #48bb78;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #38a169;
  }
`;

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        // Cadastro
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        });

        if (error) throw error;

        if (data.user) {
          alert('Cadastro realizado! Verifique seu email para confirmar a conta.');
          setIsSignUp(false);
        }
      } else {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          onLogin(data.user);
          router.push('/admin');
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');

    try {
      // Login com usuário demo
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'demo@example.com',
        password: 'demo123456',
      });

      if (error) {
        // Se não existir, cria o usuário demo
        if (error.message.includes('Invalid login credentials')) {
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: 'demo@example.com',
            password: 'demo123456',
          });

          if (signUpError) throw signUpError;

          if (signUpData.user) {
            alert('Conta demo criada! Faça login novamente.');
          }
        } else {
          throw error;
        }
      } else if (data.user) {
        onLogin(data.user);
        router.push('/admin');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginTitle>🎮 Fila Fácil</LoginTitle>
        <LoginSubtitle>
          {isSignUp ? 'Crie sua conta' : 'Faça login para continuar'}
        </LoginSubtitle>

        <form onSubmit={handleAuth}>
          <Input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={error}
          />
          <Input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={error}
            minLength={6}
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : (isSignUp ? 'Cadastrar' : 'Entrar')}
          </Button>
        </form>

        <ToggleButton onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp 
            ? 'Já tem uma conta? Faça login' 
            : 'Não tem uma conta? Cadastre-se'}
        </ToggleButton>

        <Divider>ou</Divider>

        <DemoButton onClick={handleDemoLogin} disabled={loading}>
          🚀 Entrar com conta demo
        </DemoButton>

        <p style={{ 
          textAlign: 'center', 
          marginTop: '1rem', 
          fontSize: '0.75rem', 
          color: '#a0aec0' 
        }}>
          Conta demo: demo@example.com / demo123456
        </p>
      </LoginCard>
    </LoginContainer>
  );
}