'use client';
import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  AppContainer,
  Header,
  HeaderContent,
  Logo,
  Main,
  Button,
  Input,
  Link,
  Vazio,
  VazioIcon,
  VazioTexto,
  VazioSubtexto
} from '../components/StyledComponents';
import GraficoHistorico from '../components/GraficoHistorico';

// Cores
const colors = {
  primary: '#667eea',
  secondary: '#764ba2',
  success: '#48bb78',
  danger: '#f56565',
  warning: '#fbbf24',
  info: '#4299e1',
  gray100: '#f7fafc',
  gray200: '#edf2f7',
  gray300: '#e2e8f0',
  gray400: '#cbd5e0',
  gray500: '#a0aec0',
  gray600: '#718096',
  gray700: '#4a5568',
  gray800: '#2d3748',
  white: '#ffffff',
};

// Animações
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Componentes estilizados
const AdminContainer = styled.div`
  background: ${colors.gray100};
  min-height: 100vh;
`;

const FeedbackOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease;
`;

const FeedbackCard = styled.div`
  background: linear-gradient(135deg, ${props => props.variant === 'add' ? colors.success : colors.danger} 0%, ${props => props.variant === 'add' ? '#38a169' : '#e53e3e'} 100%);
  padding: 4rem;
  border-radius: 2rem;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.3s ease;
  border: 4px solid ${colors.white};
`;

const FeedbackNumero = styled.div`
  font-size: 12rem;
  font-weight: 900;
  color: ${colors.white};
  text-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  line-height: 1;
  margin-bottom: 2rem;
`;

const FeedbackTexto = styled.div`
  font-size: 2rem;
  color: ${colors.white};
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const FeedbackSubtexto = styled.div`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 1rem;
`;

const BotoesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const BotaoGrande = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  background: ${props => {
    if (props.variant === 'success') return `linear-gradient(135deg, ${colors.success} 0%, #38a169 100%)`;
    if (props.variant === 'danger') return `linear-gradient(135deg, ${colors.danger} 0%, #e53e3e 100%)`;
    return `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`;
  }};
  
  color: ${colors.white};
  
  &:hover:not(:disabled) {
    transform: scale(1.02);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const BotaoIcone = styled.span`
  font-size: 2.5rem;
`;

const BotaoTexto = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

const BotaoSubtexto = styled.span`
  font-size: 0.875rem;
  opacity: 0.9;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatsCard = styled.div`
  background: ${colors.white};
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const StatsIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: ${props => props.color || colors.primary}20;
  color: ${props => props.color || colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const StatsInfo = styled.div`
  flex: 1;
`;

const StatsLabel = styled.p`
  color: ${colors.gray600};
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const StatsValue = styled.p`
  color: ${colors.gray800};
  font-size: 1.5rem;
  font-weight: bold;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${colors.gray200};
  padding-bottom: 1rem;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  background: ${props => props.active ? colors.primary : 'transparent'};
  color: ${props => props.active ? colors.white : colors.gray600};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? colors.primary : colors.gray200};
  }
`;

const FilaLista = styled.div`
  background: ${colors.white};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const FilaItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: ${props => props.isFirst ? colors.gray100 : 'transparent'};
  border-radius: 0.75rem;
  margin-bottom: 0.5rem;
  border: ${props => props.isFirst ? `2px solid ${colors.warning}` : 'none'};
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.gray100};
  }
`;

const FilaPosicao = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${props => props.isFirst ? colors.warning : colors.primary};
  color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
`;

const FilaNumero = styled.div`
  flex: 1;
  font-size: 1.25rem;
  font-weight: bold;
  color: ${colors.gray800};
`;

const FilaStatus = styled.span`
  background: ${props => props.isFirst ? colors.warning : colors.gray200};
  color: ${props => props.isFirst ? colors.gray900 : colors.gray700};
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const TabelaHistorico = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  color: ${colors.gray600};
  font-weight: 600;
  border-bottom: 2px solid ${colors.gray200};
`;

const Td = styled.td`
  padding: 1rem;
  color: ${colors.gray800};
  border-bottom: 1px solid ${colors.gray200};
`;

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
`;

const LoginCard = styled.div`
  background: ${colors.white};
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const LoginTitle = styled.h1`
  color: ${colors.gray800};
  text-align: center;
  margin-bottom: 2rem;
`;

export default function AdminPage() {
  const [fila, setFila] = useState([]);
  const [proximaSenha, setProximaSenha] = useState(0);
  const [logado, setLogado] = useState(false);
  const [senhaInput, setSenhaInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [tabAtiva, setTabAtiva] = useState('fila');
  const [stats, setStats] = useState({
    atendidosHoje: 0,
    mediaEspera: 0,
    totalGeral: 0
  });
  const [historico, setHistorico] = useState([]);
  
  const [feedback, setFeedback] = useState({
    show: false,
    numero: null,
    tipo: null,
    mensagem: ''
  });

  // Carregar última senha do banco
  const carregarUltimaSenha = async () => {
    try {
      const res = await fetch('/api/config');
      const data = await res.json();
      setProximaSenha(data.ultimaSenha);
    } catch (error) {
      console.error('Erro ao carregar última senha:', error);
    }
  };

  useEffect(() => {
    if (logado) {
      carregarUltimaSenha();
      buscarFila();
      const intervalo = setInterval(buscarFila, 60000);
      return () => clearInterval(intervalo);
    }
  }, [logado]);

  useEffect(() => {
    if (logado && tabAtiva === 'stats') {
      buscarStats();
    }
  }, [logado, tabAtiva]);

  useEffect(() => {
    if (logado && tabAtiva === 'historico') {
      buscarHistorico();
    }
  }, [logado, tabAtiva]);

  const buscarFila = async () => {
    const res = await fetch('/api/fila');
    const data = await res.json();
    setFila(data);
  };

  const buscarStats = async () => {
    const res = await fetch('/api/stats');
    const data = await res.json();
    setStats(data);
  };

  const buscarHistorico = async () => {
    const res = await fetch('/api/historico');
    const data = await res.json();
    setHistorico(data);
  };

  const mostrarFeedback = (numero, tipo, mensagem) => {
    setFeedback({
      show: true,
      numero,
      tipo,
      mensagem
    });
    
    setTimeout(() => {
      setFeedback({
        show: false,
        numero: null,
        tipo: null,
        mensagem: ''
      });
    }, 2000);
  };

  const adicionar = async () => {
    setLoading(true);
    const nova = proximaSenha + 1;
    
    await fetch('/api/fila', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero: nova })
    });
    
    setProximaSenha(nova);
    await buscarFila();
    
    mostrarFeedback(nova, 'add', 'Cliente adicionado à fila');
    
    if (tabAtiva === 'stats') buscarStats();
    if (tabAtiva === 'historico') buscarHistorico();
    setLoading(false);
  };

  const remover = async () => {
    if (fila.length === 0) {
      alert('Fila vazia!');
      return;
    }
    
    const numeroRemovido = fila[0];
    
    setLoading(true);
    await fetch('/api/fila', { method: 'DELETE' });
    await buscarFila();
    
    mostrarFeedback(numeroRemovido, 'remove', 'Cliente chamado para atendimento');
    
    if (tabAtiva === 'stats') buscarStats();
    if (tabAtiva === 'historico') buscarHistorico();
    setLoading(false);
  };

  const reiniciar = async () => {
    if (confirm('Tem certeza? Isso vai apagar toda a fila!')) {
      setLoading(true);
      await fetch('/api/fila', { method: 'PUT' });
      await carregarUltimaSenha();
      await buscarFila();
      setLoading(false);
    }
  };

  // Tela de Login
  if (!logado) {
    return (
      <LoginContainer>
        <LoginCard>
          <LoginTitle>🔐 Acesso Restrito</LoginTitle>
          <Input
            type="password"
            placeholder="Digite a senha (1234)"
            value={senhaInput}
            onChange={(e) => setSenhaInput(e.target.value)}
            style={{ marginBottom: '1rem', textAlign: 'center' }}
          />
          <Button
            variant="primary"
            onClick={() => {
              if (senhaInput === '1234') {
                setLogado(true);
              } else {
                alert('Senha incorreta!');
              }
            }}
            style={{ width: '100%' }}
          >
            Entrar
          </Button>
        </LoginCard>
      </LoginContainer>
    );
  }

  // Painel Admin
  return (
    <AdminContainer>
      {/* Feedback Overlay */}
      {feedback.show && (
        <FeedbackOverlay>
          <FeedbackCard variant={feedback.tipo}>
            <FeedbackNumero>{feedback.numero}</FeedbackNumero>
            <FeedbackTexto>
              {feedback.tipo === 'add' ? '✅ ADICIONADO' : '🗑️ REMOVIDO'}
            </FeedbackTexto>
            <FeedbackSubtexto>{feedback.mensagem}</FeedbackSubtexto>
          </FeedbackCard>
        </FeedbackOverlay>
      )}

      <Header>
        <HeaderContent>
          <Logo>
            <span>🎮</span>
            <span>PAINEL ADMIN</span>
          </Logo>
          <Button
            variant="danger"
            onClick={() => setLogado(false)}
            style={{ padding: '0.5rem 1rem' }}
          >
            Sair
          </Button>
        </HeaderContent>
      </Header>

      <Main>
        {/* Botões em cima */}
        <BotoesContainer>
          <BotaoGrande
            variant="success"
            onClick={adicionar}
            disabled={loading}
          >
            <BotaoIcone>➕</BotaoIcone>
            <BotaoTexto>ADICIONAR</BotaoTexto>
            <BotaoSubtexto>Próxima senha: {proximaSenha + 1}</BotaoSubtexto>
          </BotaoGrande>

          <BotaoGrande
            variant="danger"
            onClick={remover}
            disabled={fila.length === 0 || loading}
          >
            <BotaoIcone>➖</BotaoIcone>
            <BotaoTexto>REMOVER</BotaoTexto>
            <BotaoSubtexto>Chamar próximo da fila</BotaoSubtexto>
          </BotaoGrande>
        </BotoesContainer>

        {/* Cards de Estatísticas Rápidas */}
        <StatsGrid>
          <StatsCard>
            <StatsIcon color={colors.primary}>👥</StatsIcon>
            <StatsInfo>
              <StatsLabel>Na fila</StatsLabel>
              <StatsValue>{fila.length}</StatsValue>
            </StatsInfo>
          </StatsCard>

          <StatsCard>
            <StatsIcon color={colors.success}>👤</StatsIcon>
            <StatsInfo>
              <StatsLabel>Em atendimento</StatsLabel>
              <StatsValue>{fila.length > 0 ? fila[0] : '---'}</StatsValue>
            </StatsInfo>
          </StatsCard>

          <StatsCard>
            <StatsIcon color={colors.warning}>⏳</StatsIcon>
            <StatsInfo>
              <StatsLabel>Próximo</StatsLabel>
              <StatsValue>{fila.length > 1 ? fila[1] : '---'}</StatsValue>
            </StatsInfo>
          </StatsCard>

          <StatsCard>
            <StatsIcon color={colors.info}>📊</StatsIcon>
            <StatsInfo>
              <StatsLabel>Atendidos hoje</StatsLabel>
              <StatsValue>{stats.atendidosHoje}</StatsValue>
            </StatsInfo>
          </StatsCard>
        </StatsGrid>

        {/* Tabs */}
        <TabsContainer>
          <Tab active={tabAtiva === 'fila'} onClick={() => setTabAtiva('fila')}>
            📋 Fila Atual
          </Tab>
          <Tab active={tabAtiva === 'stats'} onClick={() => setTabAtiva('stats')}>
            📊 Estatísticas
          </Tab>
          <Tab active={tabAtiva === 'historico'} onClick={() => setTabAtiva('historico')}>
            📜 Histórico
          </Tab>
        </TabsContainer>

        {/* Conteúdo das Tabs */}
        {tabAtiva === 'fila' && (
          <FilaLista>
            <h2 style={{ marginBottom: '1.5rem', color: colors.gray800 }}>
              📋 Fila de Espera
            </h2>

            {fila.length === 0 ? (
              <Vazio>
                <VazioIcon>🪑</VazioIcon>
                <VazioTexto>Nenhum cliente na fila</VazioTexto>
                <VazioSubtexto>Clique em ADICIONAR para começar</VazioSubtexto>
              </Vazio>
            ) : (
              fila.map((numero, index) => (
                <FilaItem key={index} isFirst={index === 0}>
                  <FilaPosicao isFirst={index === 0}>
                    {index + 1}
                  </FilaPosicao>
                  <FilaNumero>Senha {numero}</FilaNumero>
                  <FilaStatus isFirst={index === 0}>
                    {index === 0 ? 'ATENDENDO' : 'AGUARDANDO'}
                  </FilaStatus>
                </FilaItem>
              ))
            )}
          </FilaLista>
        )}

        {tabAtiva === 'stats' && (
          <>
            {/* Gráfico de histórico */}
            <GraficoHistorico />
            
            {/* Cards de estatísticas rápidas */}
            <FilaLista>
              <h2 style={{ marginBottom: '1.5rem', color: colors.gray800 }}>
                📊 Resumo Rápido
              </h2>

              <StatsGrid>
                <StatsCard>
                  <StatsInfo>
                    <StatsLabel>Atendidos hoje</StatsLabel>
                    <StatsValue>{stats.atendidosHoje}</StatsValue>
                  </StatsInfo>
                </StatsCard>

                <StatsCard>
                  <StatsInfo>
                    <StatsLabel>Tempo médio de espera</StatsLabel>
                    <StatsValue>{stats.mediaEspera} min</StatsValue>
                  </StatsInfo>
                </StatsCard>

                <StatsCard>
                  <StatsInfo>
                    <StatsLabel>Total na fila</StatsLabel>
                    <StatsValue>{fila.length}</StatsValue>
                  </StatsInfo>
                </StatsCard>
              </StatsGrid>
            </FilaLista>
          </>
        )}

        {tabAtiva === 'historico' && (
          <FilaLista>
            <h2 style={{ marginBottom: '1.5rem', color: colors.gray800 }}>
              📜 Histórico de Hoje
            </h2>

            {historico.length === 0 ? (
              <Vazio>
                <VazioIcon>📭</VazioIcon>
                <VazioTexto>Nenhum atendimento hoje</VazioTexto>
              </Vazio>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <TabelaHistorico>
                  <thead>
                    <tr>
                      <Th>Senha</Th>
                      <Th>Entrada</Th>
                      <Th>Saída</Th>
                      <Th>Tempo</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {historico.map((item) => (
                      <tr key={item.id}>
                        <Td><strong>{item.numero}</strong></Td>
                        <Td>{item.hora_entrada}</Td>
                        <Td>{item.hora_saida}</Td>
                        <Td>{item.tempo_espera} min</Td>
                      </tr>
                    ))}
                  </tbody>
                </TabelaHistorico>
              </div>
            )}
          </FilaLista>
        )}

        {/* Botão Reiniciar (só na aba Fila) */}
        {tabAtiva === 'fila' && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button variant="warning" onClick={reiniciar}>
              🔄 Reiniciar Fila
            </Button>
          </div>
        )}

        {/* Link para tela pública */}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link href="/">← Voltar para tela pública</Link>
        </div>
      </Main>
    </AdminContainer>
  );
}