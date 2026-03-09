import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const periodo = searchParams.get('periodo') || 'dia'; // dia, semana, mes

    let dados = [];
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (periodo === 'dia') {
      // Dados de hoje - por hora
      const { data, error } = await supabase
        .from('historico')
        .select('*')
        .eq('data', hoje.toISOString().split('T')[0]);

      if (error) throw error;

      // Agrupar por hora
      const porHora = {};
      for (let i = 0; i < 24; i++) {
        porHora[`${i}h`] = 0;
      }

      data.forEach(item => {
        const hora = new Date(item.created_at).getHours();
        porHora[`${hora}h`] = (porHora[`${hora}h`] || 0) + 1;
      });

      dados = Object.entries(porHora).map(([hora, quantidade]) => ({
        label: hora,
        quantidade
      }));

    } else if (periodo === 'semana') {
      // Últimos 7 dias
      const dataInicio = new Date(hoje);
      dataInicio.setDate(dataInicio.getDate() - 6);

      const { data, error } = await supabase
        .from('historico')
        .select('*')
        .gte('data', dataInicio.toISOString().split('T')[0])
        .lte('data', hoje.toISOString().split('T')[0]);

      if (error) throw error;

      // Agrupar por dia
      const porDia = {};
      for (let i = 0; i < 7; i++) {
        const dia = new Date(hoje);
        dia.setDate(dia.getDate() - i);
        const key = dia.toLocaleDateString('pt-BR', { weekday: 'short' });
        porDia[key] = 0;
      }

      data.forEach(item => {
        const dia = new Date(item.data).toLocaleDateString('pt-BR', { weekday: 'short' });
        porDia[dia] = (porDia[dia] || 0) + 1;
      });

      dados = Object.entries(porDia).map(([dia, quantidade]) => ({
        label: dia,
        quantidade
      }));

    } else if (periodo === 'mes') {
      // Últimos 30 dias
      const dataInicio = new Date(hoje);
      dataInicio.setDate(dataInicio.getDate() - 29);

      const { data, error } = await supabase
        .from('historico')
        .select('*')
        .gte('data', dataInicio.toISOString().split('T')[0])
        .lte('data', hoje.toISOString().split('T')[0]);

      if (error) throw error;

      // Agrupar por dia do mês
      const porDia = {};
      for (let i = 0; i < 30; i++) {
        const dia = new Date(hoje);
        dia.setDate(dia.getDate() - i);
        const key = dia.getDate().toString();
        porDia[key] = 0;
      }

      data.forEach(item => {
        const dia = new Date(item.data).getDate().toString();
        porDia[dia] = (porDia[dia] || 0) + 1;
      });

      // Ordenar por dia
      dados = Object.entries(porDia)
        .map(([dia, quantidade]) => ({
          label: `Dia ${dia}`,
          quantidade
        }))
        .sort((a, b) => {
          const diaA = parseInt(a.label.split(' ')[1]);
          const diaB = parseInt(b.label.split(' ')[1]);
          return diaA - diaB;
        });
    }

    return NextResponse.json({
      periodo,
      dados
    });
  } catch (error) {
    console.error('Erro ao buscar dados do gráfico:', error);
    return NextResponse.json(
      { erro: 'Erro ao buscar dados' },
      { status: 500 }
    );
  }
}