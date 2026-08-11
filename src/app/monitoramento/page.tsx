"use client";

import Header from "@/components/Header";
import ActionButtons from "@/components/ActionButtons";
import { monitoramentoVideos, monitoramentoLives, formatarReais, formatarNumero } from "@/data/mock";
import { useState } from "react";

export default function MonitoramentoPage() {
  const [aba, setAba] = useState<"todos" | "videos" | "lives">("todos");

  const lista =
    aba === "videos"
      ? monitoramentoVideos
      : aba === "lives"
      ? monitoramentoLives
      : [...monitoramentoLives, ...monitoramentoVideos];

  return (
    <div>
      <Header eyebrow="ALERTAS E SINAIS" title="Monitoramento" />

      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-5">
        <div>
          <h2 className="text-base font-semibold text-white m-0">Atividade detectada</h2>
          <p className="text-xs text-[#7a9bb8] mt-1 mb-0">
            Eventos recentes com maior potencial de impacto
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="bg-[#12253f] border border-[#1e3a5f] px-3 py-2 rounded-lg text-xs text-[#8aa4c0]">
            Brasil ▾
          </button>
          <button className="bg-[#12253f] border border-[#1e3a5f] px-3 py-2 rounded-lg text-xs text-[#8aa4c0]">
            Últimas 24h ▾
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Alertas ativos", value: "38", change: "+14,2% hoje" },
          { label: "Lives detectadas", value: "127", change: "+9,8% hoje" },
          { label: "Vídeos virais", value: "54", change: "+28,6% hoje" },
          { label: "Influencers ativos", value: "1.426", change: "+11,8% hoje" },
        ].map((c) => (
          <div key={c.label} className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-4">
            <label className="block text-[#7a9bb8] text-[10px] uppercase tracking-wide">{c.label}</label>
            <strong className="block text-xl text-white mt-1">{c.value}</strong>
            <span className="text-[10px] text-[#10b981]">{c.change}</span>
          </div>
        ))}
      </section>

      <section className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white m-0">Eventos recentes</h3>
            <p className="text-xs text-[#7a9bb8] mt-1 mb-0">Separe por tipo de conteúdo</p>
          </div>
          <div className="flex gap-1 flex-wrap">
            {(
              [
                { key: "todos", label: "Todos" },
                { key: "videos", label: "Vídeos" },
                { key: "lives", label: "Lives" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setAba(tab.key)}
                className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                  aba === tab.key
                    ? "bg-[#0c62b5] text-white"
                    : "text-[#8aa4c0] hover:bg-[#1a3050]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#7a9bb8] text-[11px] border-b border-[#1e3a5f]">
                <th className="pb-3 font-medium">Evento / Influencer</th>
                <th className="pb-3 font-medium">Produto</th>
                <th className="pb-3 font-medium">Views</th>
                <th className="pb-3 font-medium">GMV</th>
                <th className="pb-3 font-medium">Sinal</th>
                <th className="pb-3 font-medium">Quando</th>
                <th className="pb-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((m, i) => (
                <tr key={m.id} className="border-b border-[#1a3050] last:border-0 hover:bg-[#0d2138]/50">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#0c62b5]/20 text-[#1a8cff] flex items-center justify-center text-xs font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="font-medium text-white text-[13px]">{m.influencer}</div>
                        <div className="text-[11px] text-[#7a9bb8]">{m.tipo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-[#8aa4c0]">{m.produto}</td>
                  <td className="py-3 text-[#cfe0f2]">{formatarNumero(m.views)}</td>
                  <td className="py-3 text-[#1a8cff] font-medium">{formatarReais(m.gmvReais)}</td>
                  <td className="py-3">
                    <span className="text-[11px] font-medium text-[#fbbf24]">{m.sinal}</span>
                  </td>
                  <td className="py-3 text-[#7a9bb8] text-xs">{m.data}</td>
                  <td className="py-3">
                    <ActionButtons
                      criadorUrl={m.criadorUrl}
                      showCriador
                      showTranscrever
                      produtoNome={m.produto}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
