'use client';
import styled from 'styled-components';

// Cores fixas - SEM USAR THEME
const colors = {
  primary: '#667eea',
  secondary: '#764ba2',
  success: '#48bb78',
  danger: '#f56565',
  warning: '#fbbf24',
  info: '#4299e1',
  white: '#ffffff',
  gray100: '#f7fafc',
  gray200: '#edf2f7',
  gray300: '#e2e8f0',
  gray400: '#cbd5e0',
  gray500: '#a0aec0',
  gray600: '#718096',
  gray700: '#4a5568',
  gray800: '#2d3748',
  gray900: '#1a202c',
};

// Container Principal
export const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
`;

// Header
export const Header = styled.header`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${colors.white};
  font-weight: bold;
  font-size: 1.25rem;
`;

export const Clock = styled.div`
  background: rgba(255, 255, 255, 0.2);
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
`;

// Main
export const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;

  @media (max-width: 640px) {
    padding: 1.5rem 1rem;
  }
`;

export const Title = styled.h1`
  color: ${colors.white};
  text-align: center;
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
`;

export const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 3rem;
`;

// Card
export const Card = styled.div`
  background: ${colors.white};
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

// Atendimento
export const Atendimento = styled.div`
  background: linear-gradient(135deg, ${colors.warning} 0%, #f59e0b 100%);
  padding: 2.5rem;
  text-align: center;

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

export const AtendimentoLabel = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

export const AtendimentoNumero = styled.div`
  font-size: clamp(4rem, 15vw, 8rem);
  font-weight: 900;
  color: ${colors.white};
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  line-height: 1;
`;

export const AtendimentoTexto = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-top: 1rem;
`;

// Próximos
export const Proximos = styled.div`
  padding: 2rem;

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

export const ProximosHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const ProximosTitulo = styled.h2`
  font-size: 1.5rem;
  color: ${colors.gray800};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TotalBadge = styled.span`
  background: ${colors.gray100};
  color: ${colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
`;

// Grid
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;

export const GridItem = styled.div`
  background: ${colors.gray100};
  padding: 1.5rem;
  border-radius: 0.75rem;
  text-align: center;
  border: 2px solid ${colors.gray200};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.primary};
    transform: translateY(-4px);
  }
`;

export const GridNumero = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.gray800};
`;

export const GridPosicao = styled.div`
  font-size: 0.875rem;
  color: ${colors.gray600};
  margin-top: 0.25rem;
`;

// Vazio
export const Vazio = styled.div`
  text-align: center;
  padding: 4rem 0;
  background: ${colors.gray100};
  border-radius: 0.75rem;
`;

export const VazioIcon = styled.div`
  font-size: 4rem;
  color: ${colors.gray400};
  margin-bottom: 1rem;
`;

export const VazioTexto = styled.p`
  color: ${colors.gray600};
  font-size: 1.125rem;
`;

export const VazioSubtexto = styled.p`
  color: ${colors.gray500};
  margin-top: 0.5rem;
`;

// Estimativa
export const Estimativa = styled.div`
  margin-top: 2rem;
  background: ${colors.gray100};
  padding: 1rem;
  border-radius: 0.75rem;
  border-left: 4px solid ${colors.info};
`;

export const EstimativaTexto = styled.p`
  color: ${colors.info};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Botões
export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${props => props.size === 'large' ? '2rem' : '0.75rem 1.5rem'};
  font-size: ${props => props.size === 'large' ? '1.5rem' : '1rem'};
  font-weight: ${props => props.size === 'large' ? 'bold' : '500'};
  border-radius: ${props => props.size === 'large' ? '1rem' : '0.5rem'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  /* Cores baseadas na variant - SEM USAR THEME */
  background: ${props => {
    if (props.variant === 'success') return `linear-gradient(135deg, ${colors.success} 0%, #38a169 100%)`;
    if (props.variant === 'danger') return `linear-gradient(135deg, ${colors.danger} 0%, #e53e3e 100%)`;
    if (props.variant === 'warning') return `linear-gradient(135deg, ${colors.warning} 0%, #f59e0b 100%)`;
    return `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`;
  }};
  
  color: ${props => props.variant === 'warning' ? colors.gray900 : colors.white};
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Input
export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => props.error ? colors.danger : colors.gray200};
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

// Link
export const Link = styled.a`
  color: ${props => props.white ? 'rgba(255, 255, 255, 0.5)' : colors.primary};
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.white ? colors.white : colors.secondary};
  }
`;