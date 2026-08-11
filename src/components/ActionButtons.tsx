"use client";

import { useRouter } from "next/navigation";

interface ActionButtonsProps {
  tiktokUrl?: string;
  videoUrl?: string;
  criadorUrl?: string;
  showTranscrever?: boolean;
  showVideo?: boolean;
  showCriador?: boolean;
  produtoNome?: string;
  videoTitulo?: string;
}

export default function ActionButtons({
  tiktokUrl,
  videoUrl,
  criadorUrl,
  showTranscrever = true,
  showVideo = false,
  showCriador = false,
  produtoNome,
  videoTitulo,
}: ActionButtonsProps) {
  const router = useRouter();

  const irParaIA = () => {
    const params = new URLSearchParams();
    if (produtoNome) params.set("produto", produtoNome);
    if (videoTitulo) params.set("video", videoTitulo);
    if (videoUrl) params.set("videoUrl", videoUrl);
    router.push(`/ia?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {tiktokUrl && (
        <a
          href={tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] px-2.5 py-1 rounded-md bg-[#0c62b5] text-white hover:bg-[#1a8cff] transition-colors whitespace-nowrap"
          title="Abrir no TikTok Shop"
        >
          TikTok
        </a>
      )}
      {showVideo && videoUrl && (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] px-2.5 py-1 rounded-md bg-[#1a3050] text-[#8aa4c0] hover:bg-[#243d5c] hover:text-white transition-colors whitespace-nowrap"
          title="Ver vídeo de destaque"
        >
          Vídeo
        </a>
      )}
      {showCriador && criadorUrl && (
        <a
          href={criadorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] px-2.5 py-1 rounded-md bg-[#1a3050] text-[#8aa4c0] hover:bg-[#243d5c] hover:text-white transition-colors whitespace-nowrap"
          title="Ver perfil do criador"
        >
          Perfil
        </a>
      )}
      {showTranscrever && (
        <button
          onClick={irParaIA}
          className="text-[11px] px-2.5 py-1 rounded-md bg-[#0d3a2a] text-[#34d399] hover:bg-[#0f4a35] transition-colors whitespace-nowrap border-0 cursor-pointer"
          title="Transcrever e gerar roteiro"
        >
          Transcrever
        </button>
      )}
    </div>
  );
}
