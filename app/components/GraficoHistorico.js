'use client';
import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import styled from 'styled-components';

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
  gray600: '#718096',
  gray800: '#2d3748',
  white: '#ffffff',
};

const Container = styled.div`
  background: ${colors.white};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Titulo = styled.h3`
  color: ${colors.gray800};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const BotoesPeriodo = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const BotaoPeriodo = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  background: ${props => props.active ? colors.primary : colors.gray100};
  color: ${props => props.active ? colors.white : colors.gray600};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? colors.primary : colors.gray200};
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${colors.gray200};
`;

const StatCard = styled.div`
  background: ${colors.gray100};
  padding: 1rem;
  border-radius: 0.75rem;
  text-align: center;
`;

const StatLabel = styled.p`
  color: ${colors.gray600};
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.p`
  color: ${colors.gray800};
  font-size: 1.5rem;
  font-weight: bold;
`;

const StatSubValue = styled.p`
  color: ${colors.gray600};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

// Cores para o gráfico de pizza
const CORES_PIZZA = ['#667eea', '#764ba2', '#48bb78', '#fbbf24', '#f56565', '#4299e1'];

export default function GraficoHistorico() {
  const [periodo, setPeriodo] = useState('dia');
  const [dados, setDados] = useState([]);
  const [statsCompletas, setStatsCompletas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tipoGrafico, setTipoGrafico] = useState('barra'); // barra, linha, pizza

  useEffect(() => {
    buscarDados();
    buscarStatsCompletas();
  }, [periodo]);

  const buscarDados = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/historico/grafico?periodo=${periodo}`);
      const data = await res.json();
      setDados(data.dados || []);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const buscarStatsCompletas = async () => {
    try {
      const res = await fetch('/api/stats/completas');
      const data = await res.json();
      setStatsCompletas(data);
    } catch (error) {
      console.error('Erro ao buscar stats completas:', error);
    }
  };

  const formatTooltip = (value) => {
    return [`${value} cliente${value !== 1 ? 's' : ''}`, 'Atendimentos'];
  };

  const renderGrafico = () => {
    if (loading) {
      return (
        <div style={{ 
          height: '400px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: colors.gray600
        }}>
          Carregando gráfico...
        </div>
      );
    }

    if (dados.length === 0) {
      return (
        <div style={{ 
          height: '400px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: colors.gray600
        }}>
          Nenhum dado disponível para o período selecionado
        </div>
      );
    }

    if (tipoGrafico === 'barra') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dados}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.gray200} />
            <XAxis dataKey="label" stroke={colors.gray600} />
            <YAxis stroke={colors.gray600} />
            <Tooltip formatter={formatTooltip} />
            <Legend />
            <Bar 
              dataKey="quantidade" 
              fill={colors.primary} 
              name="Atendimentos"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (tipoGrafico === 'linha') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dados}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.gray200} />
            <XAxis dataKey="label" stroke={colors.gray600} />
            <YAxis stroke={colors.gray600} />
            <Tooltip formatter={formatTooltip} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="quantidade" 
              stroke={colors.secondary} 
              name="Atendimentos"
              strokeWidth={3}
              dot={{ fill: colors.secondary, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (tipoGrafico === 'pizza') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dados}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={entry => `${entry.label}: ${entry.quantidade}`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="quantidade"
            >
              {dados.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CORES_PIZZA[index % CORES_PIZZA.length]} />
              ))}
            </Pie>
            <Tooltip formatter={formatTooltip} />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <Container>
      <Header>
        <Titulo>📊 Histórico de Atendimentos</Titulo>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Botões de tipo de gráfico */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <BotaoPeriodo 
              active={tipoGrafico === 'barra'} 
              onClick={() => setTipoGrafico('barra')}
            >
              📊 Barras
            </BotaoPeriodo>
            <BotaoPeriodo 
              active={tipoGrafico === 'linha'} 
              onClick={() => setTipoGrafico('linha')}
            >
              📈 Linha
            </BotaoPeriodo>
            <BotaoPeriodo 
              active={tipoGrafico === 'pizza'} 
              onClick={() => setTipoGrafico('pizza')}
            >
              🥧 Pizza
            </BotaoPeriodo>
          </div>

          {/* Botões de período */}
          <BotoesPeriodo>
            <BotaoPeriodo 
              active={periodo === 'dia'} 
              onClick={() => setPeriodo('dia')}
            >
              Dia
            </BotaoPeriodo>
            <BotaoPeriodo 
              active={periodo === 'semana'} 
              onClick={() => setPeriodo('semana')}
            >
              Semana
            </BotaoPeriodo>
            <BotaoPeriodo 
              active={periodo === 'mes'} 
              onClick={() => setPeriodo('mes')}
            >
              Mês
            </BotaoPeriodo>
          </BotoesPeriodo>
        </div>
      </Header>

      <ChartContainer>
        {renderGrafico()}
      </ChartContainer>

      {/* Estatísticas detalhadas */}
      {statsCompletas && (
        <StatsGrid>
          <StatCard>
            <StatLabel>Hoje</StatLabel>
            <StatValue>{statsCompletas.hoje.atendimentos}</StatValue>
            <StatSubValue>{statsCompletas.hoje.mediaEspera} min média</StatSubValue>
            <StatSubValue>Pico: {statsCompletas.hoje.horarioPico}</StatSubValue>
          </StatCard>

          <StatCard>
            <StatLabel>Esta Semana</StatLabel>
            <StatValue>{statsCompletas.semana.atendimentos}</StatValue>
            <StatSubValue>Média: {statsCompletas.semana.mediaPorDia}/dia</StatSubValue>
          </StatCard>

          <StatCard>
            <StatLabel>Este Mês</StatLabel>
            <StatValue>{statsCompletas.mes.atendimentos}</StatValue>
            <StatSubValue>Média: {statsCompletas.mes.mediaPorDia}/dia</StatSubValue>
          </StatCard>
        </StatsGrid>
      )}
    </Container>
  );
}