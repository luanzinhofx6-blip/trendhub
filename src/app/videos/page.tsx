import Header from "@/components/Header";
import ActionButtons from "@/components/ActionButtons";
import { videos, formatarReais, formatarNumero } from "@/data/mock";

export default function VideosPage() {
  return (
    <div>
      <Header eyebrow="INTELIGÊNCIA DE CONTEÚDO" title="Vídeos" />

      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-5">
        <div>
          <h2 className="text-base font-semibold text-white m-0">Vídeos populares</h2>
          <p className="text-xs text-[#7a9bb8] mt-1 mb-0">
            Conteúdos com maior tração e conversão
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            className="bg-[#12253f] border border-[#1e3a5f] px-3 py-2 rounded-lg text-xs text-white w-48 placeholder:text-[#5a7a9a] focus:outline-none focus:border-[#0c62b5]"
            placeholder="⌕  Pesquisar vídeo..."
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
          { label: "Vídeos monitorados", value: "18.420", change: "+11,3% esta semana" },
          { label: "GMV total", value: "R$ 28,4M", change: "+16,8% esta semana" },
          { label: "Views totais", value: "92,1M", change: "+22,4% esta semana" },
          { label: "Taxa de conversão", value: "3,8%", change: "+0,4pp" },
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
            <h3 className="text-sm font-semibold text-white m-0">Ranking de vídeos</h3>
            <p className="text-xs text-[#7a9bb8] mt-1 mb-0">Ordenados por GMV gerado</p>
          </div>
          <div className="flex gap-1 flex-wrap">
            {["Maior GMV", "Mais views", "Músicas", "Tags"].map((tab, i) => (
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
                <th className="pb-3 font-medium">Vídeo / Criador</th>
                <th className="pb-3 font-medium">Data</th>
                <th className="pb-3 font-medium">Produto</th>
                <th className="pb-3 font-medium">Views</th>
                <th className="pb-3 font-medium">GMV</th>
                <th className="pb-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((v, i) => (
                <tr key={v.id} className="border-b border-[#1a3050] last:border-0 hover:bg-[#0d2138]/50">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#0c62b5]/20 text-[#1a8cff] flex items-center justify-center text-xs font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="font-medium text-white text-[13px]">{v.titulo}</div>
                        <div className="text-[11px] text-[#7a9bb8]">{v.criador}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-[#8aa4c0] text-xs">{v.dataPost}</td>
                  <td className="py-3 text-[#8aa4c0] text-[13px]">{v.produto}</td>
                  <td className="py-3 text-[#cfe0f2]">{formatarNumero(v.views)}</td>
                  <td className="py-3 text-[#1a8cff] font-medium">{formatarReais(v.gmvReais)}</td>
                  <td className="py-3">
                    <ActionButtons
                      criadorUrl={v.criadorUrl}
                      videoUrl={v.videoUrl}
                      showCriador
                      showTranscrever
                      videoTitulo={v.titulo}
                      produtoNome={v.produto}
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
