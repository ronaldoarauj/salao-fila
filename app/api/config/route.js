import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Buscar última senha
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('config')
      .select('ultima_senha')
      .eq('id', 1)
      .single();

    if (error) throw error;

    return NextResponse.json({ ultimaSenha: data.ultima_senha });
  } catch (error) {
    console.error('Erro ao buscar última senha:', error);
    return NextResponse.json({ ultimaSenha: 100 }); // Valor padrão
  }
}

// POST - Atualizar última senha
export async function POST(request) {
  try {
    const { ultimaSenha } = await request.json();

    const { error } = await supabase
      .from('config')
      .update({ 
        ultima_senha: ultimaSenha,
        updated_at: new Date().toISOString()
      })
      .eq('id', 1);

    if (error) throw error;

    return NextResponse.json({ success: true, ultimaSenha });
  } catch (error) {
    console.error('Erro ao atualizar última senha:', error);
    return NextResponse.json(
      { erro: 'Erro ao atualizar última senha' },
      { status: 500 }
    );
  }
}