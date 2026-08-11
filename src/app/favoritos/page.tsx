"use client";

import Header from "@/components/Header";
import { produtos, videos, lojas, formatarReais, formatarNumero } from "@/data/mock";
import { useState } from "react";

export default function FavoritosPage() {
  const [aba, setAba] = useState<"produtos" | "videos" | "lojas">("produtos");

  // Demo: alguns itens já "salvos"
  const favProdutos = produtos.slice(0, 3);
  const favVideos = videos.slice(0, 2);
  const favLojas = lojas.slice(0, 2);

  return (
    <div>
      <Header eyebrow="SEUS SALVOS" title="Favoritos" />

      <p className="text-xs text-[#7a9bb8] mb-5">
        Salve produtos, vídeos e lojas para acompanhar depois. (Na versão demo alguns itens já estão salvos)
      </p>

      <div className="flex gap-1 mb-5">
        {(
          [
            { key: "produtos", label: `Produtos (${favProdutos.length})` },
            { key: "videos", label: `Vídeos (${favVideos.length})` },
            { key: "lojas", label: `Lojas (${favLojas.length})` },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            onClick={() => setAba(t.key)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
              aba === t.key ? "bg-[#0c62b5] text-white" : "bg-[#12253f] text-[#8aa4c0] hover:bg-[#1a3050]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5">
        {aba === "produtos" && (
          <div className="space-y-3">
            {favProdutos.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-[#0b1628] border border-[#1a3050]">
                <div>
                  <div className="text-sm font-medium text-white">{p.nome}</div>
                  <div className="text-[11px] text-[#7a9bb8]">{p.categoria} · GMV {formatarReais(p.gmvReais)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#10b981]">+{p.crescimento}%</span>
                  <a href={p.tiktokUrl} target="_blank" className="text-[11px] px-2.5 py-1 rounded-md bg-[#0c62b5] text-white">TikTok</a>
                </div>
              </div>
            ))}
          </div>
        )}
        {aba === "videos" && (
          <div className="space-y-3">
            {favVideos.map((v) => (
              <div key={v.id} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-[#0b1628] border border-[#1a3050]">
                <div>
                  <div className="text-sm font-medium text-white">{v.titulo}</div>
                  <div className="text-[11px] text-[#7a9bb8]">{v.criador} · {formatarNumero(v.views)} views</div>
                </div>
                <a href={v.videoUrl} target="_blank" className="text-[11px] px-2.5 py-1 rounded-md bg-[#0c62b5] text-white">Abrir</a>
              </div>
            ))}
          </div>
        )}
        {aba === "lojas" && (
          <div className="space-y-3">
            {favLojas.map((l) => (
              <div key={l.id} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-[#0b1628] border border-[#1a3050]">
                <div>
                  <div className="text-sm font-medium text-white">{l.nome}</div>
                  <div className="text-[11px] text-[#7a9bb8]">{l.produtos} produtos · GMV {formatarReais(l.gmvReais)}</div>
                </div>
                <a href={l.tiktokUrl} target="_blank" className="text-[11px] px-2.5 py-1 rounded-md bg-[#0c62b5] text-white">Perfil</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
