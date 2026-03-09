import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const hoje = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('historico')
      .select('*')
      .eq('data', hoje)
      .order('hora_saida', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    return NextResponse.json({ erro: 'Erro ao buscar histórico' }, { status: 500 });
  }
}