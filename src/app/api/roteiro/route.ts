import { NextRequest, NextResponse } from "next/server";

// Rota que pega a transcrição (texto) e pede pra Groq (modelo de texto)
// gerar um roteiro curto otimizado pra vídeo de produto.
export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { erro: "GROQ_API_KEY não configurada no servidor." },
      { status: 500 }
    );
  }

  try {
    const { transcricao, contexto } = await req.json();

    if (!transcricao) {
      return NextResponse.json(
        { erro: "Nenhuma transcrição enviada." },
        { status: 400 }
      );
    }

    const prompt = `Você é um especialista em roteiros curtos para TikTok Shop (vídeos de 30-45 segundos vendendo produtos virais).

${contexto ? `Contexto do produto: ${contexto}\n` : ""}
Transcrição de referência (vídeo similar que já performou bem):
"""
${transcricao}
"""

Gere um roteiro NOVO e otimizado, seguindo esta estrutura:
- [0-3s] HOOK (frase de impacto pra parar o scroll)
- [3-12s] PROBLEMA (o que a pessoa sofre sem o produto)
- [12-25s] SOLUÇÃO + DEMONSTRAÇÃO (como o produto resolve)
- [25-35s] PROVA SOCIAL (número de vendas, avaliação, etc.)
- [35-45s] CTA FORTE (chamada pra ação, urgência)

No final, adicione 3-4 dicas rápidas de performance (música, texto na tela, etc.).
Responda em português, direto, sem introdução nem explicação extra — só o roteiro.`;

    const resposta = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.8,
          max_tokens: 800,
        }),
      }
    );

    if (!resposta.ok) {
      const detalhe = await resposta.text();
      return NextResponse.json(
        { erro: `Erro da Groq (${resposta.status}): ${detalhe}` },
        { status: 502 }
      );
    }

    const dados = await resposta.json();
    const roteiro = dados.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ roteiro });
  } catch (e) {
    return NextResponse.json(
      { erro: `Falha ao gerar roteiro: ${(e as Error).message}` },
      { status: 500 }
    );
  }
}
