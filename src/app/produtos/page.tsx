import Header from "@/components/Header";
import ActionButtons from "@/components/ActionButtons";
import { produtos, formatarReais, formatarNumero } from "@/data/mock";

export default function ProdutosPage() {
  return (
    <div>
      <Header eyebrow="INTELIGÊNCIA DE PRODUTOS" title="Produtos" />

      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-5">
        <div>
          <h2 className="text-base font-semibold text-white m-0">Ranking de produtos</h2>
          <p className="text-xs text-[#7a9bb8] mt-1 mb-0">
            Produtos com maior tração, vendas e potencial
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            className="bg-[#12253f] border border-[#1e3a5f] px-3 py-2 rounded-lg text-xs text-white w-48 placeholder:text-[#5a7a9a] focus:outline-none focus:border-[#0c62b5]"
            placeholder="⌕  Pesquisar produto..."
          />
          <button className="bg-[#12253f] border border-[#1e3a5f] px-3 py-2 rounded-lg text-xs text-[#8aa4c0]">
            Brasil ▾
          </button>
          <button className="bg-[#12253f] border border-[#1e3a5f] px-3 py-2 rounded-lg text-xs text-[#8aa4c0]">
            7 dias ▾
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Produtos monitorados", value: "24.681", change: "+8,2% esta semana" },
          { label: "GMV total", value: "R$ 64,2M", change: "+19,4% esta semana" },
          { label: "Vendas totais", value: "684,2K", change: "+14,7% esta semana" },
          { label: "Novos produtos", value: "3.842", change: "+27,1% esta semana" },
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
            <h3 className="text-sm font-semibold text-white m-0">Produtos em alta</h3>
            <p className="text-xs text-[#7a9bb8] mt-1 mb-0">Ordenados por desempenho</p>
          </div>
          <div className="flex gap-1 flex-wrap">
            {["Mais vendidos", "Maior GMV", "Mais visualizados", "Novos"].map((tab, i) => (
              <button
                key={tab}
                className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                  i === 0
                    ? "bg-[#0c62b5] text-white"
                    : "text-[#8aa4c0] hover:bg-[#1a3050]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#7a9bb8] text-[11px] border-b border-[#1e3a5f]">
                <th className="pb-3 font-medium">Produto</th>
                <th className="pb-3 font-medium">Vendas</th>
                <th className="pb-3 font-medium">Views</th>
                <th className="pb-3 font-medium">GMV</th>
                <th className="pb-3 font-medium">Crescimento</th>
                <th className="pb-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p, i) => (
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
    </div>
  );
}
