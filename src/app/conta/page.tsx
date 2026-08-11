"use client";

import Header from "@/components/Header";
import { useState } from "react";

export default function ContaPage() {
  const [username, setUsername] = useState("");
  const [conectado, setConectado] = useState(false);
  const [analisando, setAnalisando] = useState(false);
  const [analise, setAnalise] = useState<null | {
    score: number;
    pontosFortes: string[];
    pontosFracos: string[];
    melhoresDias: string[];
    melhoresHorarios: string[];
    hashtags: string[];
    ideias: string[];
    frequencia: string;
    crescimento: string[];
  }>(null);

  const conectar = () => {
    if (!username.trim()) return;
    setAnalisando(true);
    setTimeout(() => {
      setConectado(true);
      setAnalisando(false);
      setAnalise({
        score: 72,
        pontosFortes: [
          "Boa taxa de retenção nos primeiros 3 segundos",
          "Nicho claro e consistente (produtos de casa/beleza)",
          "CTAs frequentes e bem posicionados",
          "Uso correto de trending sounds",
        ],
        pontosFracos: [
          "Poucos posts por semana (média atual: 2,1)",
          "Horários de postagem inconsistentes",
          "Hashtags genéricas demais (#fyp #viral)",
          "Pouca variação de formato (só talking-head)",
        ],
        melhoresDias: ["Terça", "Quarta", "Sábado"],
        melhoresHorarios: ["11h–13h", "19h–21h", "22h–23h"],
        hashtags: [
          "#tiktokshopbrasil",
          "#achadinhos",
          "#produtosvirais",
          "#dicasdebeleza",
          "#casaorganizada",
          "#reviewhonesto",
          "#comprinhas",
          "#achadosdok",
        ],
        ideias: [
          "Antes e depois em 7 dias (formato série)",
          "Testando produto barato vs caro",
          "O que eu compraria de novo / o que não compraria",
          "Unboxing rápido + 3 prós e 1 contra",
          "Respondendo comentários de dúvidas sobre o produto",
          "Day in the life usando o produto",
          "Comparativo lado a lado com concorrente",
          "Storytime + produto no final (soft sell)",
        ],
        frequencia: "Ideal: 5–7 vídeos por semana · Mínimo: 4",
        crescimento: [
          "Poste sempre nos horários de pico do seu nicho",
          "Responda comentários nas primeiras 1–2 horas (aumenta entrega)",
          "Faça duetos/stitch com criadores maiores do mesmo nicho",
          "Use 3–5 hashtags específicas + 1–2 amplas",
          "Crie séries (parte 1, 2, 3) para aumentar retenção de seguidores",
          "Coloque o link do produto nos primeiros 3 segundos quando possível",
        ],
      });
    }, 2200);
  };

  return (
    <div>
      <Header eyebrow="ASSISTENTE PESSOAL" title="Minha Conta TikTok" />

      {!conectado ? (
        <div className="max-w-lg">
          <div className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-6">
            <h2 className="text-base font-semibold text-white m-0 mb-1">Conectar sua conta</h2>
            <p className="text-xs text-[#7a9bb8] mb-5">
              Digite o @ da sua conta do TikTok. A IA vai analisar o perfil e gerar um plano personalizado de crescimento.
            </p>

            <label className="text-[11px] text-[#7a9bb8] block mb-1.5">Usuário do TikTok</label>
            <div className="flex gap-2 mb-4">
              <div className="flex-1 flex items-center bg-[#0b1628] border border-[#1e3a5f] rounded-lg overflow-hidden focus-within:border-[#0c62b5]">
                <span className="pl-3 text-[#5a7a9a] text-sm">@</span>
                <input
                  className="flex-1 bg-transparent px-2 py-2.5 text-sm text-white outline-none placeholder:text-[#5a7a9a]"
                  placeholder="seuperfil"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace("@", ""))}
                  onKeyDown={(e) => e.key === "Enter" && conectar()}
                />
              </div>
              <button
                onClick={conectar}
                disabled={analisando || !username.trim()}
                className="px-5 py-2.5 bg-[#0c62b5] hover:bg-[#1a8cff] text-white text-sm font-medium rounded-lg disabled:opacity-50 transition-colors border-0 cursor-pointer"
              >
                {analisando ? "Analisando..." : "Analisar"}
              </button>
            </div>

            <p className="text-[11px] text-[#5a7a9a]">
              Versão demo · A análise é gerada por IA com base em padrões de contas de sucesso no TikTok Shop Brasil.
            </p>
          </div>
        </div>
      ) : (
        <div>
          {/* Header da conta */}
          <div className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5 mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0c62b5] to-[#1a8cff] flex items-center justify-center text-white text-xl font-bold">
                {username.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white m-0">@{username}</h2>
                <p className="text-xs text-[#7a9bb8] m-0 mt-0.5">Conta conectada · Análise atualizada agora</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1a8cff]">{analise?.score}</div>
                <div className="text-[10px] text-[#7a9bb8]">Score de saúde</div>
              </div>
              <button
                onClick={() => { setConectado(false); setAnalise(null); setUsername(""); }}
                className="text-xs text-[#8aa4c0] hover:text-white px-3 py-1.5 border border-[#1e3a5f] rounded-lg"
              >
                Trocar conta
              </button>
            </div>
          </div>

          {analise && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Pontos fortes / fracos */}
              <div className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Pontos fortes</h3>
                <ul className="space-y-2">
                  {analise.pontosFortes.map((p, i) => (
                    <li key={i} className="text-[13px] text-[#cfe0f2] flex gap-2">
                      <span className="text-[#10b981]">✓</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Pontos a melhorar</h3>
                <ul className="space-y-2">
                  {analise.pontosFracos.map((p, i) => (
                    <li key={i} className="text-[13px] text-[#cfe0f2] flex gap-2">
                      <span className="text-[#f59e0b]">!</span> {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Melhores dias e horários */}
              <div className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Melhores dias pra postar</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {analise.melhoresDias.map((d) => (
                    <span key={d} className="px-3 py-1.5 bg-[#0c62b5]/25 text-[#1a8cff] text-xs rounded-lg font-medium">
                      {d}
                    </span>
                  ))}
                </div>
                <h3 className="text-sm font-semibold text-white mb-3">Melhores horários</h3>
                <div className="flex flex-wrap gap-2">
                  {analise.melhoresHorarios.map((h) => (
                    <span key={h} className="px-3 py-1.5 bg-[#0d3a2a] text-[#34d399] text-xs rounded-lg font-medium">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frequência */}
              <div className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Frequência recomendada</h3>
                <p className="text-[13px] text-[#cfe0f2] mb-4">{analise.frequencia}</p>
                <h3 className="text-sm font-semibold text-white mb-3">Estratégia de crescimento</h3>
                <ul className="space-y-2">
                  {analise.crescimento.map((c, i) => (
                    <li key={i} className="text-[13px] text-[#cfe0f2] flex gap-2">
                      <span className="text-[#1a8cff]">{i + 1}.</span> {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hashtags */}
              <div className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Hashtags recomendadas</h3>
                <div className="flex flex-wrap gap-2">
                  {analise.hashtags.map((h) => (
                    <span key={h} className="px-2.5 py-1 bg-[#0b1628] border border-[#1e3a5f] text-[#8aa4c0] text-xs rounded-md">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ideias de conteúdo */}
              <div className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Ideias de conteúdo (alta entrega)</h3>
                <ul className="space-y-2">
                  {analise.ideias.map((ideia, i) => (
                    <li key={i} className="text-[13px] text-[#cfe0f2] flex gap-2">
                      <span className="text-[#1a8cff]">▸</span> {ideia}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
