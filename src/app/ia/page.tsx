"use client";

import Header from "@/components/Header";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function IAContent() {
  const searchParams = useSearchParams();
  const produtoParam = searchParams.get("produto") || "";
  const videoParam = searchParams.get("video") || "";

  const [etapa, setEtapa] = useState<1 | 2 | 3>(1);
  const [transcricao, setTranscricao] = useState("");
  const [roteiro, setRoteiro] = useState("");
  const [status, setStatus] = useState<"idle" | "transcrevendo" | "gerando">("idle");
  const [contexto, setContexto] = useState("");
  const [arquivoVideo, setArquivoVideo] = useState<File | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (produtoParam || videoParam) {
      const ctx = [videoParam && `Vídeo: ${videoParam}`, produtoParam && `Produto: ${produtoParam}`]
        .filter(Boolean)
        .join(" · ");
      setContexto(ctx);
      setEtapa(1);
    }
  }, [produtoParam, videoParam]);

  const handleTranscrever = async () => {
    if (!arquivoVideo) {
      setErro("Selecione um arquivo de vídeo/áudio primeiro.");
      return;
    }
    setErro("");
    setStatus("transcrevendo");
    try {
      const formData = new FormData();
      formData.append("arquivo", arquivoVideo);

      const resp = await fetch("/api/transcrever", {
        method: "POST",
        body: formData,
      });
      const dados = await resp.json();

      if (!resp.ok) {
        setErro(dados.erro || "Erro ao transcrever.");
        setStatus("idle");
        return;
      }

      setTranscricao(dados.transcricao);
      setStatus("idle");
      setEtapa(2);
    } catch (e) {
      setErro(`Falha de conexão: ${(e as Error).message}`);
      setStatus("idle");
    }
  };

  const handleGerarRoteiro = async () => {
    if (!transcricao) return;
    setErro("");
    setStatus("gerando");
    try {
      const resp = await fetch("/api/roteiro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcricao, contexto }),
      });
      const dados = await resp.json();

      if (!resp.ok) {
        setErro(dados.erro || "Erro ao gerar roteiro.");
        setStatus("idle");
        return;
      }

      setRoteiro(dados.roteiro);
      setStatus("idle");
      setEtapa(3);
    } catch (e) {
      setErro(`Falha de conexão: ${(e as Error).message}`);
      setStatus("idle");
    }
  };

  return (
    <div>
      <Header eyebrow="CRIAÇÃO COM IA" title="Ferramentas de IA" />

      {contexto && (
        <div className="mb-5 bg-[#0c62b5]/15 border border-[#0c62b5]/40 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-[#1a8cff] text-lg">✦</span>
          <div>
            <p className="text-xs text-[#8aa4c0] m-0">Conteúdo selecionado</p>
            <p className="text-sm text-white m-0 font-medium">{contexto}</p>
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="flex items-center gap-2 mb-6">
        {[
          { n: 1, label: "Transcrever" },
          { n: 2, label: "Revisar texto" },
          { n: 3, label: "Roteiro pronto" },
        ].map((s, i) => (
          <div key={s.n} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                etapa >= s.n
                  ? "bg-[#0c62b5] text-white"
                  : "bg-[#1a3050] text-[#5a7a9a]"
              }`}
            >
              {s.n}
            </div>
            <span className={`text-xs ${etapa >= s.n ? "text-white" : "text-[#5a7a9a]"}`}>
              {s.label}
            </span>
            {i < 2 && <div className="w-8 h-px bg-[#1e3a5f] mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Esquerda */}
        <div className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">1. Origem do conteúdo</h3>
          <p className="text-xs text-[#7a9bb8] mb-4">
            Faça upload de um vídeo ou use o conteúdo que você selecionou em outra página.
          </p>

          <div className="border-2 border-dashed border-[#1e3a5f] rounded-xl p-6 text-center mb-4 hover:border-[#0c62b5]/60 transition-colors">
            <div className="text-2xl mb-2 opacity-60">🎬</div>
            <p className="text-sm text-[#8aa4c0] mb-1">
              {arquivoVideo ? arquivoVideo.name : "Arraste o vídeo aqui"}
            </p>
            <p className="text-[11px] text-[#5a7a9a]">MP4, MOV, WEBM, MP3 ou WAV · até 100 MB</p>
            <input
              type="file"
              accept="video/*,audio/*"
              className="mt-3 text-xs text-[#7a9bb8]"
              onChange={(e) => setArquivoVideo(e.target.files?.[0] ?? null)}
            />
          </div>

          {erro && (
            <p className="text-xs text-[#f87171] bg-[#3a0d0d]/40 border border-[#f87171]/30 rounded-lg px-3 py-2 mb-3">
              {erro}
            </p>
          )}

          <button
            onClick={handleTranscrever}
            disabled={status === "transcrevendo"}
            className="w-full bg-[#0c62b5] hover:bg-[#1a8cff] text-white py-2.5 rounded-lg text-sm font-medium disabled:opacity-50 transition-colors border-0 cursor-pointer"
          >
            {status === "transcrevendo" ? "Transcrevendo..." : "Transcrever agora"}
          </button>
        </div>

        {/* Direita */}
        <div className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">2. Transcrição</h3>
          <p className="text-xs text-[#7a9bb8] mb-4">
            Revise o texto antes de gerar o roteiro.
          </p>

          <textarea
            className="w-full h-40 bg-[#0b1628] border border-[#1e3a5f] rounded-lg p-3 text-sm text-[#cfe0f2] resize-none focus:outline-none focus:border-[#0c62b5] placeholder:text-[#5a7a9a]"
            placeholder="A transcrição aparecerá aqui..."
            value={transcricao}
            onChange={(e) => setTranscricao(e.target.value)}
          />

          <button
            onClick={handleGerarRoteiro}
            disabled={status === "gerando" || !transcricao}
            className="w-full mt-3 bg-[#0d3a2a] hover:bg-[#0f4a35] text-[#34d399] py-2.5 rounded-lg text-sm font-medium disabled:opacity-40 transition-colors border border-[#10b981]/30 cursor-pointer"
          >
            {status === "gerando" ? "Gerando roteiro..." : "3. Gerar roteiro otimizado"}
          </button>
        </div>
      </div>

      {/* Roteiro gerado */}
      {roteiro && (
        <div className="mt-5 bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-white m-0">Roteiro gerado</h3>
            <button
              onClick={() => navigator.clipboard.writeText(roteiro)}
              className="text-xs text-[#1a8cff] hover:underline bg-transparent border-0 cursor-pointer"
            >
              Copiar tudo
            </button>
          </div>
          <pre className="bg-[#0b1628] border border-[#1e3a5f] rounded-lg p-4 text-[13px] text-[#cfe0f2] whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
            {roteiro}
          </pre>
        </div>
      )}

      <p className="text-[11px] text-[#5a7a9a] mt-5">
        Powered by Groq · Whisper (transcrição) + Llama 3.3 (roteiro)
      </p>
    </div>
  );
}

export default function IAPage() {
  return (
    <Suspense fallback={<div className="text-[#7a9bb8] p-8">Carregando...</div>}>
      <IAContent />
    </Suspense>
  );
}
