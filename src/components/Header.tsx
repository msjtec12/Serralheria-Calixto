import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Início", href: "#inicio" },
    { label: "Serviços", href: "#servicos" },
    { label: "Portfólio", href: "#portfolio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-2 px-4 md:py-4">
        <a href="#inicio" className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight">
          <img src={logo} alt="Serralheria Calixto Logo" className="h-12 w-auto md:h-16" />
          <span className="hidden sm:inline">
            SERRALHERIA <span className="text-primary">CALIXTO</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/5511999999999?text=Olá! Gostaria de um orçamento."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground text-xs font-bold px-6 py-3 rounded-sm hover:scale-105 transition-all shadow-lg shadow-primary/20"
          >
            SOLICITAR ORÇAMENTO
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground" aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground" aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background px-4 pb-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider border-b border-border last:border-0">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
