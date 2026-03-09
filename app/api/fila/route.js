import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Listar fila
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('fila')
      .select('*')
      .eq('status', 'na_fila')
      .order('posicao', { ascending: true });

    if (error) throw error;

    const numeros = data.map(item => item.numero);
    return NextResponse.json(numeros);
  } catch (error) {
    console.error('Erro ao buscar fila:', error);
    return NextResponse.json({ erro: 'Erro ao buscar fila' }, { status: 500 });
  }
}

// POST - Adicionar cliente
export async function POST(request) {
  try {
    const { numero } = await request.json();

    // Buscar última posição
    const { data: ultimaPosicao, error: erroPosicao } = await supabase
      .from('fila')
      .select('posicao')
      .eq('status', 'na_fila')
      .order('posicao', { ascending: false })
      .limit(1);

    if (erroPosicao) throw erroPosicao;

    const novaPosicao = ultimaPosicao?.length > 0 ? ultimaPosicao[0].posicao + 1 : 1;

    // Inserir novo cliente
    const { error } = await supabase
      .from('fila')
      .insert([
        { 
          numero, 
          posicao: novaPosicao,
          status: 'na_fila'
        }
      ]);

    if (error) throw error;

    // Atualizar última senha na config
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ultimaSenha: numero })
    });

    return NextResponse.json({ 
      success: true, 
      mensagem: 'Cliente adicionado',
      numero,
      posicao: novaPosicao
    });
  } catch (error) {
    console.error('Erro ao adicionar:', error);
    return NextResponse.json({ erro: 'Erro ao adicionar' }, { status: 500 });
  }
}

// DELETE - Remover primeiro da fila
export async function DELETE() {
  try {
    // Buscar primeiro da fila
    const { data: primeiro, error: erroBusca } = await supabase
      .from('fila')
      .select('*')
      .eq('status', 'na_fila')
      .order('posicao', { ascending: true })
      .limit(1);

    if (erroBusca) throw erroBusca;

    if (!primeiro || primeiro.length === 0) {
      return NextResponse.json({ erro: 'Fila vazia' }, { status: 400 });
    }

    const cliente = primeiro[0];

    // Registrar no histórico
    const horaSaida = new Date().toLocaleTimeString();
    const horaEntrada = new Date(cliente.created_at).toLocaleTimeString();
    const tempoEspera = Math.floor((Date.now() - new Date(cliente.created_at)) / 60000);

    const { error: erroHistorico } = await supabase
      .from('historico')
      .insert([
        {
          numero: cliente.numero,
          hora_entrada: horaEntrada,
          hora_saida: horaSaida,
          tempo_espera: tempoEspera
        }
      ]);

    if (erroHistorico) throw erroHistorico;

    // Remover da fila
    const { error: erroDelete } = await supabase
      .from('fila')
      .delete()
      .eq('id', cliente.id);

    if (erroDelete) throw erroDelete;

    return NextResponse.json({ 
      success: true, 
      mensagem: 'Cliente removido',
      numero: cliente.numero
    });
  } catch (error) {
    console.error('Erro ao remover:', error);
    return NextResponse.json({ erro: 'Erro ao remover' }, { status: 500 });
  }
}

// PUT - Reiniciar fila
export async function PUT() {
  try {
    // Deleta todos da fila
    const { error } = await supabase
      .from('fila')
      .delete()
      .neq('id', 0);

    if (error) throw error;

    // Reinicia a última senha para 100
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ultimaSenha: 100 })
    });

    return NextResponse.json({ success: true, mensagem: 'Fila reiniciada' });
  } catch (error) {
    console.error('Erro ao reiniciar:', error);
    return NextResponse.json({ erro: 'Erro ao reiniciar' }, { status: 500 });
  }
}