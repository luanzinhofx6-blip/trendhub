"use client";

import Header from "@/components/Header";

const historico = [
  {
    id: "1",
    tipo: "Roteiro",
    titulo: "Massageador Facial - Resultado em 7 dias",
    data: "11/08/2026 · 14:32",
    preview: "HOOK: Gente, eu usei isso por poucos dias e o resultado foi absurdo...",
  },
  {
    id: "2",
    tipo: "Análise de conta",
    titulo: "@trendbeauty",
    data: "11/08/2026 · 11:05",
    preview: "Score 72 · Melhores dias: Terça, Quarta, Sábado · 8 hashtags sugeridas",
  },
  {
    id: "3",
    tipo: "Roteiro",
    titulo: "Mini Projetor na sala - vale a pena?",
    data: "10/08/2026 · 20:18",
    preview: "HOOK: Será que esse mini projetor realmente vale o preço?",
  },
  {
    id: "4",
    tipo: "Transcrição",
    titulo: "Organizei a casa inteira com isso",
    data: "10/08/2026 · 16:44",
    preview: "Olá pessoal, hoje eu trouxe o organizador portátil que está bombando...",
  },
];

export default function HistoricoPage() {
  return (
    <div>
      <Header eyebrow="SUAS GERAÇÕES" title="Histórico de IA" />

      <p className="text-xs text-[#7a9bb8] mb-5">
        Roteiros, transcrições e análises geradas anteriormente.
      </p>

      <div className="space-y-3">
        {historico.map((h) => (
          <div
            key={h.id}
            className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-4 hover:border-[#0c62b5]/50 transition-colors"
          >
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#0c62b5]/25 text-[#1a8cff] font-medium">
                  {h.tipo}
                </span>
                <span className="text-sm font-medium text-white">{h.titulo}</span>
              </div>
              <span className="text-[11px] text-[#5a7a9a] whitespace-nowrap">{h.data}</span>
            </div>
            <p className="text-[12px] text-[#8aa4c0] m-0 line-clamp-1">{h.preview}</p>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[#5a7a9a] mt-5">
        Na versão com IA real, cada geração será salva automaticamente aqui.
      </p>
    </div>
  );
}
