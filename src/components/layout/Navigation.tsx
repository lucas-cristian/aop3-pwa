"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Menor/Maior", href: "/consultas/menor-maior" },
    { label: "Média Ouro", href: "/consultas/preco-medio" },
    { label: "Recente", href: "/consultas/preco-recente" },
    { label: "Evolução", href: "/consultas/evolucao" },
    { label: "Gráficos", href: "/graficos" },
  ];

  return (
    <header className="fixed w-full z-50 top-0 transition-all duration-300">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md border-b border-stone-200/50"></div>
      <div className="max-w-[1440px] mx-auto px-6 py-4 relative flex justify-between items-center">
        
        {/* LOGO Baseada no Artools */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer z-20">
          <div className="w-8 h-8 bg-stone-900 text-white flex items-center justify-center rounded-sm transition-transform group-hover:rotate-90 duration-500">
             <iconify-icon icon="solar:gas-station-bold-duotone" className="text-xl"></iconify-icon>
          </div>
          <span className="font-display font-medium tracking-tight text-lg leading-none">
            AOP3<span className="text-stone-400">.ANP</span>
          </span>
        </Link>

        {/* Links Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-stone-500 z-10">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`hover:text-stone-900 transition-colors ${pathname === link.href ? 'text-stone-900 font-bold' : ''}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Mobile */}
        <div className="flex bg-stone-100 p-2 rounded-lg md:hidden z-20" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <iconify-icon icon={mobileMenuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} className="text-xl cursor-pointer hover:text-stone-500 transition-colors"></iconify-icon>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-stone-200 md:hidden z-10 flex flex-col p-6 gap-6 text-sm font-mono uppercase tracking-widest text-stone-500">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`hover:text-stone-900 transition-colors ${pathname === link.href ? 'text-stone-900 font-bold' : ''}`}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
