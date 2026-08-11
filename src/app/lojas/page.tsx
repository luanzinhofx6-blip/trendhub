import Header from "@/components/Header";
import ActionButtons from "@/components/ActionButtons";
import { lojas, formatarReais, formatarNumero } from "@/data/mock";

export default function LojasPage() {
  return (
    <div>
      <Header eyebrow="INTELIGÊNCIA DE LOJAS" title="Lojas" />

      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-5">
        <div>
          <h2 className="text-base font-semibold text-white m-0">Ranking de lojas</h2>
          <p className="text-xs text-[#7a9bb8] mt-1 mb-0">
            Lojas com maior desempenho no TikTok Shop
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            className="bg-[#12253f] border border-[#1e3a5f] px-3 py-2 rounded-lg text-xs text-white w-48 placeholder:text-[#5a7a9a] focus:outline-none focus:border-[#0c62b5]"
            placeholder="⌕  Pesquisar loja..."
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
          { label: "Lojas monitoradas", value: "8.420", change: "+6,1% esta semana" },
          { label: "GMV total", value: "R$ 156M", change: "+14,2% esta semana" },
          { label: "Vendas totais", value: "2,1M", change: "+11,8% esta semana" },
          { label: "Novas lojas", value: "412", change: "+9,4% esta semana" },
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
            <h3 className="text-sm font-semibold text-white m-0">Lojas em alta</h3>
            <p className="text-xs text-[#7a9bb8] mt-1 mb-0">Ordenadas por GMV</p>
          </div>
          <div className="flex gap-1 flex-wrap">
            {["Ranking de vendas", "Buscas populares"].map((tab, i) => (
              <button
                key={tab}
                className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                  i === 0 ? "bg-[#0c62b5] text-white" : "text-[#8aa4c0] hover:bg-[#1a3050]"
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
                <th className="pb-3 font-medium">Loja</th>
                <th className="pb-3 font-medium">Produtos</th>
                <th className="pb-3 font-medium">Vendas</th>
                <th className="pb-3 font-medium">GMV</th>
                <th className="pb-3 font-medium">Crescimento</th>
                <th className="pb-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {lojas.map((l, i) => (
                <tr key={l.id} className="border-b border-[#1a3050] last:border-0 hover:bg-[#0d2138]/50">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#0c62b5]/20 text-[#1a8cff] flex items-center justify-center text-xs font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="font-medium text-white text-[13px]">{l.nome}</div>
                    </div>
                  </td>
                  <td className="py-3 text-[#cfe0f2]">{l.produtos}</td>
                  <td className="py-3 text-[#cfe0f2]">{formatarNumero(l.vendas)}</td>
                  <td className="py-3 text-[#1a8cff] font-medium">{formatarReais(l.gmvReais)}</td>
                  <td className="py-3 text-[#10b981] font-medium">+{l.crescimento}%</td>
                  <td className="py-3">
                    <ActionButtons tiktokUrl={l.tiktokUrl} showTranscrever={false} />
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
