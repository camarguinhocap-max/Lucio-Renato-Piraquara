import { useEffect, useState } from "react";

const nav = [
  { href: "#sobre", label: "Sobre" },
  { href: "#lucio", label: "Lúcio Renato" },
  { href: "#conteudos", label: "Conteúdos" },
  { href: "#utilidade", label: "Utilidade Pública" },
  { href: "#parceiros", label: "Parceiros" },
  { href: "#contato", label: "Contato" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-editorial flex h-16 items-center justify-between gap-6 md:h-20">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-sm bg-petrol text-petrol-foreground font-serif text-lg leading-none"
          >
            P
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg text-foreground">
              Piraquara <span className="text-petrol">On-line</span>
            </span>
            <span className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
              Portal local · PR
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-sm text-foreground/80">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-foreground transition-colors">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contato"
            className="hidden sm:inline-flex items-center rounded-sm bg-petrol px-4 py-2.5 text-sm font-medium text-petrol-foreground hover:opacity-90 transition"
          >
            Falar com a equipe
          </a>
          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-grid h-10 w-10 place-items-center rounded-sm border border-border"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-foreground" />
              <span className="block h-px w-5 bg-foreground" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-editorial flex flex-col py-4">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm border-b border-border/60 last:border-0"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
