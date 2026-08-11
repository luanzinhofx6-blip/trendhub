"use client";

import Header from "@/components/Header";
import { useState } from "react";

type Alerta = {
  id: string;
  tipo: string;
  alvo: string;
  condicao: string;
  ativo: boolean;
};

const alertasIniciais: Alerta[] = [
  { id: "1", tipo: "Produto", alvo: "Massageador Facial Elétrico", condicao: "Crescimento > 50% em 24h", ativo: true },
  { id: "2", tipo: "Live", alvo: "@trendbeauty", condicao: "Espectadores > 50.000", ativo: true },
  { id: "3", tipo: "Vídeo", alvo: "Mini Projetor na sala", condicao: "Views > 1M em 48h", ativo: false },
];

export default function AlertasPage() {
  const [alertas, setAlertas] = useState(alertasIniciais);
  const [novo, setNovo] = useState({ tipo: "Produto", alvo: "", condicao: "" });

  const toggle = (id: string) => {
    setAlertas((prev) => prev.map((a) => (a.id === id ? { ...a, ativo: !a.ativo } : a)));
  };

  const adicionar = () => {
    if (!novo.alvo.trim() || !novo.condicao.trim()) return;
    setAlertas((prev) => [
      ...prev,
      { id: Date.now().toString(), tipo: novo.tipo, alvo: novo.alvo, condicao: novo.condicao, ativo: true },
    ]);
    setNovo({ tipo: "Produto", alvo: "", condicao: "" });
  };

  return (
    <div>
      <Header eyebrow="NOTIFICAÇÕES INTELIGENTES" title="Alertas" />

      <p className="text-xs text-[#7a9bb8] mb-5">
        Crie alertas para ser avisado quando um produto, vídeo ou live atingir uma condição.
      </p>

      {/* Criar alerta */}
      <div className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5 mb-5">
        <h3 className="text-sm font-semibold text-white mb-3">Novo alerta</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <select
            className="bg-[#0b1628] border border-[#1e3a5f] rounded-lg px-3 py-2 text-xs text-white"
            value={novo.tipo}
            onChange={(e) => setNovo({ ...novo, tipo: e.target.value })}
          >
            <option>Produto</option>
            <option>Vídeo</option>
            <option>Live</option>
            <option>Loja</option>
          </select>
          <input
            className="bg-[#0b1628] border border-[#1e3a5f] rounded-lg px-3 py-2 text-xs text-white placeholder:text-[#5a7a9a]"
            placeholder="Nome / @ / produto"
            value={novo.alvo}
            onChange={(e) => setNovo({ ...novo, alvo: e.target.value })}
          />
          <input
            className="bg-[#0b1628] border border-[#1e3a5f] rounded-lg px-3 py-2 text-xs text-white placeholder:text-[#5a7a9a]"
            placeholder="Ex: Crescimento > 30%"
            value={novo.condicao}
            onChange={(e) => setNovo({ ...novo, condicao: e.target.value })}
          />
          <button
            onClick={adicionar}
            className="bg-[#0c62b5] hover:bg-[#1a8cff] text-white text-xs font-medium rounded-lg py-2 transition-colors border-0 cursor-pointer"
          >
            Criar alerta
          </button>
        </div>
      </div>

      {/* Lista */}
      <div className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Seus alertas</h3>
        <div className="space-y-3">
          {alertas.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between gap-4 p-3 rounded-lg bg-[#0b1628] border border-[#1a3050]"
            >
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#0c62b5]/30 text-[#1a8cff]">{a.tipo}</span>
                  <span className="text-sm font-medium text-white">{a.alvo}</span>
                </div>
                <div className="text-[11px] text-[#7a9bb8]">{a.condicao}</div>
              </div>
              <button
                onClick={() => toggle(a.id)}
                className={`text-[11px] px-3 py-1.5 rounded-md font-medium transition-colors border-0 cursor-pointer ${
                  a.ativo
                    ? "bg-[#0d3a2a] text-[#34d399]"
                    : "bg-[#1a3050] text-[#5a7a9a]"
                }`}
              >
                {a.ativo ? "Ativo" : "Pausado"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
