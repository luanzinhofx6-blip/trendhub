import { NextRequest, NextResponse } from "next/server";

// Rota que recebe um arquivo de vídeo/áudio do formulário e manda pra Groq
// transcrever usando o modelo Whisper. A chave fica só no servidor,
// nunca é exposta pro navegador.
export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { erro: "GROQ_API_KEY não configurada no servidor." },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const arquivo = formData.get("arquivo") as File | null;

    if (!arquivo) {
      return NextResponse.json(
        { erro: "Nenhum arquivo enviado." },
        { status: 400 }
      );
    }

    // Monta o formulário que a Groq espera
    const groqForm = new FormData();
    groqForm.append("file", arquivo);
    groqForm.append("model", "whisper-large-v3-turbo");
    groqForm.append("language", "pt");
    groqForm.append("response_format", "text");

    const resposta = await fetch(
      "https://api.groq.com/openai/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: groqForm,
      }
    );

    if (!resposta.ok) {
      const detalhe = await resposta.text();
      return NextResponse.json(
        { erro: `Erro da Groq (${resposta.status}): ${detalhe}` },
        { status: 502 }
      );
    }

    const texto = await resposta.text();
    return NextResponse.json({ transcricao: texto });
  } catch (e) {
    return NextResponse.json(
      { erro: `Falha ao transcrever: ${(e as Error).message}` },
      { status: 500 }
    );
  }
}
