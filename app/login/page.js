'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from '../components/Login';
import { createClient } from '@/lib/supabaseClient'; // Usando @ alias

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const supabase = createClient(); // Agora funciona!

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (user) => {
    console.log('Usuário logado:', user);
    router.push('/admin');
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        Carregando...
      </div>
    );
  }

  return <Login onLogin={handleLogin} />;
}