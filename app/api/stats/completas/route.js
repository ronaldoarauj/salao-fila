import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const hoje = new Date().toISOString().split('T')[0];
    const inicioSemana = new Date();
    inicioSemana.setDate(inicioSemana.getDate() - 6);
    const inicioMes = new Date();
    inicioMes.setDate(inicioMes.getDate() - 29);

    // Atendimentos hoje
    const { data: hojeData } = await supabase
      .from('historico')
      .select('*')
      .eq('data', hoje);

    // Atendimentos da semana
    const { data: semanaData } = await supabase
      .from('historico')
      .select('*')
      .gte('data', inicioSemana.toISOString().split('T')[0]);

    // Atendimentos do mês
    const { data: mesData } = await supabase
      .from('historico')
      .select('*')
      .gte('data', inicioMes.toISOString().split('T')[0]);

    // Média de espera hoje
    const { data: temposHoje } = await supabase
      .from('historico')
      .select('tempo_espera')
      .eq('data', hoje);

    const mediaEsperaHoje = temposHoje?.length > 0
      ? Math.round(temposHoje.reduce((acc, curr) => acc + curr.tempo_espera, 0) / temposHoje.length)
      : 0;

    // Horário de pico (hora com mais atendimentos)
    const { data: todosHoje } = await supabase
      .from('historico')
      .select('created_at')
      .eq('data', hoje);

    const horas = {};
    todosHoje?.forEach(item => {
      const hora = new Date(item.created_at).getHours();
      horas[hora] = (horas[hora] || 0) + 1;
    });

    let horarioPico = 'Não disponível';
    let maxAtendimentos = 0;
    Object.entries(horas).forEach(([hora, qtd]) => {
      if (qtd > maxAtendimentos) {
        maxAtendimentos = qtd;
        horarioPico = `${hora}:00 - ${hora}:59`;
      }
    });

    return NextResponse.json({
      hoje: {
        atendimentos: hojeData?.length || 0,
        mediaEspera: mediaEsperaHoje,
        horarioPico
      },
      semana: {
        atendimentos: semanaData?.length || 0,
        mediaPorDia: Math.round((semanaData?.length || 0) / 7)
      },
      mes: {
        atendimentos: mesData?.length || 0,
        mediaPorDia: Math.round((mesData?.length || 0) / 30)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas completas:', error);
    return NextResponse.json(
      { erro: 'Erro ao buscar estatísticas' },
      { status: 500 }
    );
  }
}