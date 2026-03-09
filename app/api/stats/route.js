import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const hoje = new Date().toISOString().split('T')[0];

    // Atendidos hoje
    const { data: atendidosHoje, error: erroHoje } = await supabase
      .from('historico')
      .select('*')
      .eq('data', hoje);

    if (erroHoje) throw erroHoje;

    // Média de espera
    const { data: tempos, error: erroTempo } = await supabase
      .from('historico')
      .select('tempo_espera')
      .eq('data', hoje);

    if (erroTempo) throw erroTempo;

    const mediaEspera = tempos.length > 0
      ? Math.round(tempos.reduce((acc, curr) => acc + curr.tempo_espera, 0) / tempos.length)
      : 0;

    // Últimos 7 dias
    const { data: ultimos7, error: erro7 } = await supabase
      .from('historico')
      .select('data, count')
      .gte('data', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

    if (erro7) throw erro7;

    // Agrupar por data
    const atendimentosPorDia = {};
    ultimos7.forEach(item => {
      atendimentosPorDia[item.data] = (atendimentosPorDia[item.data] || 0) + 1;
    });

    return NextResponse.json({
      atendidosHoje: atendidosHoje.length,
      mediaEspera,
      totalGeral: atendidosHoje.length,
      atendimentosPorDia: Object.entries(atendimentosPorDia).map(([data, count]) => ({ data, count }))
    });
  } catch (error) {
    console.error('Erro ao buscar stats:', error);
    return NextResponse.json({ erro: 'Erro ao buscar estatísticas' }, { status: 500 });
  }
}