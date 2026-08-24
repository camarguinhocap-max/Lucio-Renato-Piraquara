import heroImg from "@/assets/lucio-kombi-3.jpg";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-graphite">
      <img
        src={heroImg}
        alt="Lúcio Renato em frente à Kombi do Piraquara On-line, com o adesivo 'Disque Denúncia' e seu nome"
        width={2397}
        height={1647}
        className="hero-photo absolute inset-0 h-full w-full object-cover object-[62%_15%]"
      />
      {/* Scrim: dark on the left for headline legibility, clearing to reveal
          his face in full color on the right. Desktop-only — on mobile the
          crop is tighter and this horizontal fade doesn't reliably darken
          the text area, so mobile relies on the taller bottom scrim below. */}
      <div
        aria-hidden
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(100deg, oklch(0.17 0.02 250 / 0.96) 0%, oklch(0.17 0.02 250 / 0.9) 32%, oklch(0.17 0.02 250 / 0.55) 55%, transparent 78%)",
        }}
      />
      {/* Bottom scrim: tall and strong on mobile, since the headline wraps
          to more lines there and sits over whatever the photo has behind
          it (including a white shirt) — shorter on desktop, where the
          horizontal scrim above already does most of the work. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black/95 via-black/60 to-transparent md:h-40 md:from-black/60 md:via-transparent"
      />

      {/* Magazine spine, running the full height of the hero. */}
      <div
        aria-hidden
        className="spine-text absolute left-4 top-28 bottom-24 hidden md:flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] uppercase text-white/50"
      >
        <span className="h-8 w-px bg-white/30" />
        Piraquara On-line
        <span className="h-8 w-px bg-white/30" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pt-32 pb-10 md:pb-14">
        <div className="container-editorial md:pl-16">
          <div className="max-w-2xl rise-in">
            <p className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-white/70">
              <span className="h-px w-10 bg-ochre" />
              Ex-vereador e comunicador · Piraquara, PR
            </p>
            <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.5rem] text-white">
              <span
                aria-hidden
                className="quote-mark text-6xl sm:text-7xl align-top mr-1 text-ochre"
              >
                “
              </span>
              Cobrir Piraquara é, antes de tudo, <span className="italic">ouvir Piraquara</span>
              <span className="text-ochre">.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base md:text-lg text-white/75 leading-relaxed">
              Há mais de 10 anos nas ruas da cidade, Lúcio Renato transformou essa forma de ouvir em
              um canal: o Piraquara On-line — informação local, utilidade pública e cobertura do que
              acontece nos bairros, nas escolas e nos serviços essenciais da nossa cidade.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#lucio"
                className="inline-flex items-center rounded-sm bg-white px-6 py-3.5 text-sm font-medium text-graphite shadow-elegant hover:opacity-90 transition"
              >
                Conhecer a trajetória
              </a>
              <a
                href="#conteudos"
                className="inline-flex items-center rounded-sm border border-white/30 px-6 py-3.5 text-sm font-medium text-white hover:bg-white hover:text-graphite transition"
              >
                Ver conteúdos →
              </a>
            </div>
          </div>
        </div>

        <div className="container-editorial md:pl-16 mt-14">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/15 pt-4 text-xs uppercase tracking-[0.18em] text-white/55">
            <span>+10 anos de cobertura local</span>
            <span aria-hidden className="text-ochre">
              ·
            </span>
            <span>Ex-vereador em Piraquara</span>
            <span aria-hidden className="text-ochre">
              ·
            </span>
            <span>24/7 nas ruas da cidade</span>
          </p>
        </div>
      </div>
    </section>
  );
}
