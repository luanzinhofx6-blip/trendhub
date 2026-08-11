import Header from "@/components/Header";
import ActionButtons from "@/components/ActionButtons";
import { produtos, formatarReais, formatarNumero } from "@/data/mock";

export default function DashboardPage() {
  const topProdutos = produtos.slice(0, 5);

  return (
    <div>
      <Header eyebrow="VISÃO GERAL" title="Painel de controle" />

      <section className="mb-6">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-base font-semibold text-white m-0">Pulsação do mercado</h2>
            <p className="text-xs text-[#7a9bb8] mt-1 mb-0">
              Desempenho nos últimos 7 dias · Brasil
            </p>
          </div>
          <button className="bg-[#12253f] border border-[#1e3a5f] px-3 py-2 rounded-lg text-xs text-[#8aa4c0] hover:border-[#0c62b5] transition-colors">
            Últimos 7 dias ▾
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Produtos em alta", value: "1.284", change: "+18,4%" },
            { label: "GMV monitorado", value: "R$ 42,1M", change: "+12,7%" },
            { label: "Visualizações", value: "48,6M", change: "+24,1%" },
            { label: "Crescimento médio", value: "+31,8%", change: "produtos monitorados" },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-4 hover:border-[#0c62b5]/50 transition-colors"
            >
              <label className="block text-[#7a9bb8] text-[10px] uppercase tracking-wide">
                {card.label}
              </label>
              <strong className="block text-xl text-white mt-1">{card.value}</strong>
              <span className="text-[10px] text-[#10b981]">{card.change}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#12253f] border border-[#1e3a5f] rounded-xl p-5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white m-0">Produtos em destaque</h3>
            <p className="text-xs text-[#7a9bb8] mt-1 mb-0">Ranking por desempenho</p>
          </div>
          <a href="/produtos" className="text-xs text-[#1a8cff] font-medium hover:underline">
            Ver todos →
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#7a9bb8] text-[11px] border-b border-[#1e3a5f]">
                <th className="pb-3 font-medium">Produto</th>
                <th className="pb-3 font-medium">Vendas</th>
                <th className="pb-3 font-medium">Views</th>
                <th className="pb-3 font-medium">GMV</th>
                <th className="pb-3 font-medium">Cresc.</th>
                <th className="pb-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {topProdutos.map((p, i) => (
                <tr key={p.id} className="border-b border-[#1a3050] last:border-0 hover:bg-[#0d2138]/50">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#0c62b5]/20 text-[#1a8cff] flex items-center justify-center text-xs font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="font-medium text-white text-[13px]">{p.nome}</div>
                        <div className="text-[11px] text-[#7a9bb8]">{p.categoria}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-[#cfe0f2]">{formatarNumero(p.vendas)}</td>
                  <td className="py-3 text-[#cfe0f2]">{formatarNumero(p.views)}</td>
                  <td className="py-3 text-[#1a8cff] font-medium">{formatarReais(p.gmvReais)}</td>
                  <td className="py-3 text-[#10b981] font-medium">+{p.crescimento}%</td>
                  <td className="py-3">
                    <ActionButtons
                      tiktokUrl={p.tiktokUrl}
                      videoUrl={p.videoDestaqueUrl}
                      showVideo
                      showTranscrever
                      produtoNome={p.nome}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-[11px] text-[#5a7a9a] mt-5">
        Dados demonstrativos · Em breve conectaremos a fonte real
      </p>
    </div>
  );
}
