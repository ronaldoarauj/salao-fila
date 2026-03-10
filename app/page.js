'use client';
import { useState, useEffect } from 'react';
import {
  AppContainer,
  Header,
  HeaderContent,
  Logo,
  Clock,
  Main,
  Title,
  Subtitle,
  Card,
  Atendimento,
  AtendimentoLabel,
  AtendimentoNumero,
  AtendimentoTexto,
  Proximos,
  ProximosHeader,
  ProximosTitulo,
  TotalBadge,
  Grid,
  GridItem,
  GridNumero,
  GridPosicao,
  Vazio,
  VazioIcon,
  VazioTexto,
  VazioSubtexto,
  Estimativa,
  EstimativaTexto,
  Link
} from './components/StyledComponents';

export default function Home() {
  const [fila, setFila] = useState([]);
  const [hora, setHora] = useState('');

  useEffect(() => {
    buscarFila();
    const intervaloFila = setInterval(buscarFila, 60000);
    const intervaloRelogio = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(intervaloFila);
      clearInterval(intervaloRelogio);
    };
  }, []);

  const buscarFila = async () => {
    try {
      const res = await fetch('/api/fila');
      const data = await res.json();
      setFila(data);
    } catch (error) {
      console.error('Erro ao buscar fila:', error);
    }
  };

  return (
    <AppContainer>
      <Header>
        <HeaderContent>
          <Logo>
            <span>💈</span>
            <span>SISTEMA DE FILA</span>
          </Logo>
          <Clock>{hora}</Clock>
        </HeaderContent>
      </Header>

      <Main>
        <Title>Acompanhe sua vez</Title>
        <Subtitle>Fila atualizada em tempo real</Subtitle>

        <Card>
          <Atendimento>
            <AtendimentoLabel>🔴 EM ATENDIMENTO AGORA</AtendimentoLabel>
            <AtendimentoNumero>
              {fila.length > 0 ? fila[0] : '---'}
            </AtendimentoNumero>
            <AtendimentoTexto>
              {fila.length > 0 
                ? 'Por favor, dirija-se ao balcão' 
                : 'Aguardando cliente'}
            </AtendimentoTexto>
          </Atendimento>

          <Proximos>
            <ProximosHeader>
              <ProximosTitulo>📋 Próximos da fila</ProximosTitulo>
              <TotalBadge>Total: {fila.length}</TotalBadge>
            </ProximosHeader>

            {fila.length <= 1 ? (
              <Vazio>
                <VazioIcon>🪑</VazioIcon>
                <VazioTexto>Nenhum cliente na fila</VazioTexto>
                <VazioSubtexto>A fila será exibida aqui</VazioSubtexto>
              </Vazio>
            ) : (
              <>
                <Grid>
                  {fila.slice(1).map((numero, index) => (
                    <GridItem key={index}>
                      <GridNumero>{numero}</GridNumero>
                      <GridPosicao>{index + 1}º lugar</GridPosicao>
                    </GridItem>
                  ))}
                </Grid>

                <Estimativa>
                  <EstimativaTexto>
                    <span>⏱️</span>
                    <span>Tempo estimado: {(fila.length - 1) * 15} minutos</span>
                  </EstimativaTexto>
                </Estimativa>
              </>
            )}
          </Proximos>
        </Card>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/admin" white>
            ⚙️ Área do Administrador
          </Link>
        </div>
      </Main>
    </AppContainer>
  );
}