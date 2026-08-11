"use client";

import Header from "@/components/Header";
import { produtos, formatarReais, formatarNumero } from "@/data/mock";
import { useState } from "react";

export default function ComparadorPage() {
  const [selecionados, setSelecionados] = useState<string[]>(["1", "2"]);

  const toggle = (id: string) => {
    setSelecionados((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const comparados = produtos.filter((p) => selecionados.includes(p.id));

  return (
    <div>
      <Header eyebrow="ANÁLISE LADO A LADO" title="Comparador de produtos" />

      <p className="text-xs text-[#7a9bb8] mb-5">
        Selecione até 3 produtos para comparar GMV, vendas, views e crescimento.
      </p>

      <div className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5 mb-5">
        <h3 className="text-sm font-semibold text-white mb-3">Escolher produtos ({selecionados.length}/3)</h3>
        <div className="flex flex-wrap gap-2">
          {produtos.map((p) => (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                selecionados.includes(p.id)
                  ? "bg-[#0c62b5] text-white"
                  : "bg-[#0b1628] border border-[#1e3a5f] text-[#8aa4c0] hover:border-[#0c62b5]"
              }`}
            >
              {p.nome}
            </button>
          ))}
        </div>
      </div>

      {comparados.length > 0 && (
        <div className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#7a9bb8] text-[11px] border-b border-[#1e3a5f]">
                <th className="pb-3 font-medium">Métrica</th>
                {comparados.map((p) => (
                  <th key={p.id} className="pb-3 font-medium text-white">{p.nome}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Categoria", get: (p: typeof produtos[0]) => p.categoria },
                { label: "Preço", get: (p: typeof produtos[0]) => `R$ ${p.preco.toFixed(2).replace(".", ",")}` },
                { label: "Vendas", get: (p: typeof produtos[0]) => formatarNumero(p.vendas) },
                { label: "Views", get: (p: typeof produtos[0]) => formatarNumero(p.views) },
                { label: "GMV", get: (p: typeof produtos[0]) => formatarReais(p.gmvReais) },
                { label: "Crescimento", get: (p: typeof produtos[0]) => `+${p.crescimento}%` },
              ].map((row) => (
                <tr key={row.label} className="border-b border-[#1a3050] last:border-0">
                  <td className="py-3 text-[#7a9bb8]">{row.label}</td>
                  {comparados.map((p) => (
                    <td key={p.id} className="py-3 text-[#cfe0f2] font-medium">
                      {row.get(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
