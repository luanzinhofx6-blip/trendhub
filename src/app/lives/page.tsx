import Header from "@/components/Header";
import ActionButtons from "@/components/ActionButtons";
import { lives, formatarReais, formatarNumero } from "@/data/mock";

export default function LivesPage() {
  return (
    <div>
      <Header eyebrow="INTELIGÊNCIA DE LIVES" title="Lives" />

      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-5">
        <div>
          <h2 className="text-base font-semibold text-white m-0">Lives com maior tração</h2>
          <p className="text-xs text-[#7a9bb8] mt-1 mb-0">
            Monitoramento em tempo real de lives promovendo produtos
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="bg-[#12253f] border border-[#1e3a5f] px-3 py-2 rounded-lg text-xs text-[#8aa4c0]">
            Brasil ▾
          </button>
          <button className="bg-[#12253f] border border-[#1e3a5f] px-3 py-2 rounded-lg text-xs text-[#8aa4c0]">
            Agora ▾
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Lives ao vivo agora", value: "147", change: "+8,2% hoje" },
          { label: "Espectadores totais", value: "2,8M", change: "+12,7% hoje" },
          { label: "GMV monitorado", value: "R$ 9,1M", change: "+21,3% hoje" },
          { label: "Vendas em tempo real", value: "68.421", change: "+16,9% hoje" },
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
            <h3 className="text-sm font-semibold text-white m-0">Lives em destaque</h3>
            <p className="text-xs text-[#7a9bb8] mt-1 mb-0">Ordenadas por desempenho em tempo real</p>
          </div>
          <div className="flex gap-1 flex-wrap">
            {["Ao vivo", "Maior GMV", "Mais espectadores", "Mais vendas"].map((tab, i) => (
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
                <th className="pb-3 font-medium">Live / Loja</th>
                <th className="pb-3 font-medium">Espectadores</th>
                <th className="pb-3 font-medium">Vendas</th>
                <th className="pb-3 font-medium">GMV</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {lives.map((l, i) => (
                <tr key={l.id} className="border-b border-[#1a3050] last:border-0 hover:bg-[#0d2138]/50">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#0c62b5]/20 text-[#1a8cff] flex items-center justify-center text-xs font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="font-medium text-white text-[13px]">{l.loja}</div>
                        <div className="text-[11px] text-[#7a9bb8]">{l.produto} · {l.criador}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-[#cfe0f2]">{formatarNumero(l.espectadores)}</td>
                  <td className="py-3 text-[#cfe0f2]">{formatarNumero(l.vendas)}</td>
                  <td className="py-3 text-[#1a8cff] font-medium">{formatarReais(l.gmvReais)}</td>
                  <td className="py-3">
                    <span className="text-[11px] text-red-400 font-medium">● {l.status}</span>
                  </td>
                  <td className="py-3">
                    <ActionButtons
                      criadorUrl={l.criadorUrl}
                      tiktokUrl={l.liveUrl}
                      showCriador
                      showTranscrever={false}
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
