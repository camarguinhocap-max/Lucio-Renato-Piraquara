import { useEffect, useState } from "react";

const nav = [
  { href: "/#lucio", label: "Quem é ele" },
  { href: "/#conteudos", label: "Conteúdos" },
  { href: "/#utilidade", label: "Utilidade Pública" },
  { href: "/#redes", label: "Redes" },
  { href: "/parceiros", label: "Parceiros" },
  { href: "/#contato", label: "Contato" },
];

interface SiteHeaderProps {
  /**
   * Pass true only on pages that render a dark, full-bleed hero right behind
   * the header (currently just the homepage) — lets the header start
   * transparent with white text over the photo, then swap to the solid
   * light-background style once the user scrolls past it. Everywhere else
   * defaults to the solid style immediately, since those pages have a light
   * background from the very top and white-on-white text is unreadable.
   */
  overHero?: boolean;
}

export function SiteHeader({ overHero = false }: SiteHeaderProps = {}) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const scrolled = !overHero || scrolledPastHero;

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setScrolledPastHero(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-editorial flex h-16 items-center justify-between gap-6 md:h-20">
        <a href="/#top" className="flex items-center gap-2.5 group">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-sm bg-petrol text-petrol-foreground font-serif text-lg leading-none"
          >
            LR
          </span>
          <span className="flex flex-col leading-tight">
            <span
              className={`font-serif text-lg transition-colors ${scrolled ? "text-foreground" : "text-white"}`}
            >
              Lúcio Renato
            </span>
            <span
              className={`text-[10px] tracking-[0.22em] uppercase transition-colors ${
                scrolled ? "text-muted-foreground" : "text-white/70"
              }`}
            >
              Piraquara On-line · Portal local
            </span>
          </span>
        </a>

        <nav
          className={`hidden lg:flex items-center gap-8 text-sm transition-colors ${
            scrolled ? "text-foreground/80" : "text-white/85"
          }`}
        >
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`transition-colors ${scrolled ? "hover:text-foreground" : "hover:text-white"}`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#contato"
            className="hidden sm:inline-flex items-center rounded-sm bg-petrol px-4 py-2.5 text-sm font-medium text-petrol-foreground hover:opacity-90 transition"
          >
            Falar com a equipe
          </a>
          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden inline-grid h-10 w-10 place-items-center rounded-sm border transition-colors ${
              scrolled ? "border-border" : "border-white/40"
            }`}
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-px w-5 transition-colors ${scrolled ? "bg-foreground" : "bg-white"}`}
              />
              <span
                className={`block h-px w-5 transition-colors ${scrolled ? "bg-foreground" : "bg-white"}`}
              />
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
