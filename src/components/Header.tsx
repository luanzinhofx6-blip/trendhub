interface HeaderProps {
  eyebrow: string;
  title: string;
}

export default function Header({ eyebrow, title }: HeaderProps) {
  return (
    <header className="flex justify-between items-center mb-7">
      <div>
        <p className="text-[9px] tracking-[1.5px] text-[#5a8ab0] font-extrabold uppercase m-0">
          {eyebrow}
        </p>
        <h1 className="text-[26px] font-bold text-white m-0 mt-1">{title}</h1>
      </div>
      <button className="w-9 h-9 rounded-full bg-[#0c62b5] text-white font-extrabold text-sm border-0 cursor-pointer hover:bg-[#1a8cff] transition-colors">
        M
      </button>
    </header>
  );
}
