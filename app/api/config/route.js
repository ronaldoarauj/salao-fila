import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('config')
      .select('ultima_senha')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('Erro ao buscar config:', error);
      if (error.code === 'PGRST116') {
        // Se não existir, cria com 0
        const { data: newData, error: insertError } = await supabase
          .from('config')
          .insert([{ id: 1, ultima_senha: 0 }]) // <-- 0 aqui
          .select()
          .single();
        
        if (insertError) throw insertError;
        return NextResponse.json({ ultimaSenha: newData.ultima_senha });
      }
      throw error;
    }

    return NextResponse.json({ ultimaSenha: data.ultima_senha });
  } catch (error) {
    console.error('Erro ao buscar última senha:', error);
    return NextResponse.json({ ultimaSenha: 0 }); // <-- fallback para 0
  }
}

export async function POST(request) {
  try {
    const { ultimaSenha } = await request.json();

    const { error } = await supabase
      .from('config')
      .update({ ultima_senha: ultimaSenha })
      .eq('id', 1);

    if (error) {
      if (error.code === 'PGRST116') {
        await supabase
          .from('config')
          .insert([{ id: 1, ultima_senha: ultimaSenha }]);
      } else {
        throw error;
      }
    }

    return NextResponse.json({ success: true, ultimaSenha });
  } catch (error) {
    console.error('Erro ao atualizar última senha:', error);
    return NextResponse.json(
      { erro: 'Erro ao atualizar última senha' },
      { status: 500 }
    );
  }
}