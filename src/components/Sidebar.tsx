"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/", label: "Dashboard", icon: "◈" },
  { href: "/produtos", label: "Produtos", icon: "▣" },
  { href: "/videos", label: "Vídeos", icon: "▶" },
  { href: "/lojas", label: "Lojas", icon: "▤" },
  { href: "/lives", label: "Lives", icon: "◉" },
  { href: "/monitoramento", label: "Monitoramento", icon: "◌" },
  { href: "/comparador", label: "Comparador", icon: "⇄" },
  { href: "/favoritos", label: "Favoritos", icon: "★" },
  { href: "/alertas", label: "Alertas", icon: "🔔" },
  { href: "/conta", label: "Minha Conta TikTok", icon: "◎" },
  { href: "/ia", label: "Ferramentas de IA", icon: "✦" },
  { href: "/historico", label: "Histórico IA", icon: "☰" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-[#061525] text-[#cfe0f2] p-4 z-50 border-r border-[#1a3050] overflow-y-auto">
      <div className="flex items-center gap-3 px-2 mb-6">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0a4a8a] to-[#1a8cff] flex items-center justify-center text-white font-black text-base shadow-lg shadow-blue-900/40">
          △
        </div>
        <div>
          <div className="text-white font-bold text-[15px] leading-tight tracking-tight">TrendHub</div>
          <div className="text-[#5a7a9a] text-[8px] tracking-widest uppercase">Market Intelligence</div>
        </div>
      </div>

      <nav className="flex flex-col gap-0.5">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] transition-all ${
                isActive
                  ? "bg-[#0c62b5] text-white shadow-md shadow-blue-900/30"
                  : "text-[#8aa4c0] hover:bg-[#0d2138] hover:text-white"
              }`}
            >
              <span className="text-sm opacity-90 w-4 text-center">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 px-2">
        <div className="bg-[#0d2138] rounded-lg p-2.5 border border-[#1a3050]">
          <p className="text-[9px] text-[#5a7a9a] mb-0.5">Versão</p>
          <p className="text-[11px] text-[#8aa4c0]">v3 · Completo</p>
        </div>
      </div>
    </aside>
  );
}
