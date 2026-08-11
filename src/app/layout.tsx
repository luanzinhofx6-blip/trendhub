import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "TrendHub — Market Intelligence",
  description: "Inteligência de mercado para TikTok Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <div className="min-h-screen flex">
          <Sidebar />
          <main className="ml-60 flex-1 p-7 min-h-screen bg-[#0b1628]">{children}</main>
        </div>
      </body>
    </html>
  );
}
