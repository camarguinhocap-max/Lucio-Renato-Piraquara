import heroImg from "@/assets/piraquara-hero.jpg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 hairline-grid opacity-60" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[70vh]"
        style={{ backgroundImage: "var(--gradient-sheen)" }}
      />
      <div className="container-editorial relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <div className="lg:col-span-7 rise-in">
            <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-muted-foreground mb-8">
              <span className="h-px w-10 bg-petrol" />
              <span>Edição diária · Piraquara, Paraná</span>
            </div>
            <h1 className="font-serif text-[2.7rem] leading-[1.03] sm:text-6xl lg:text-7xl text-foreground">
              A cidade contada por
              <br />
              <span className="text-petrol italic">quem vive Piraquara</span>
              <span className="text-ochre">.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              O Piraquara On-line é o canal de comunicação de <strong className="font-medium text-foreground">Lúcio Renato</strong>:
              informação local, utilidade pública e cobertura do que acontece nos bairros, nas
              escolas, nas ruas e nos serviços essenciais da nossa cidade.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#contato"
                className="inline-flex items-center rounded-sm bg-gradient-petrol px-6 py-3.5 text-sm font-medium text-petrol-foreground shadow-elegant hover:opacity-95 transition"
              >
                Falar com a equipe
              </a>
              <a
                href="#conteudos"
                className="inline-flex items-center rounded-sm border border-foreground/20 px-6 py-3.5 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition"
              >
                Ver conteúdos →
              </a>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { k: "+10", v: "anos de cobertura local" },
                { k: "24/7", v: "olhos abertos pela cidade" },
                { k: "100%", v: "Piraquara e região" },
              ].map((s) => (
                <div key={s.v} className="border-t border-border pt-3">
                  <dt className="font-serif text-3xl text-foreground">{s.k}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground leading-snug">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5 relative rise-in">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-sm bg-gradient-petrol opacity-[0.12] blur-xl"
            />
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted shadow-elegant ring-1 ring-foreground/10">
                <img
                  src={heroImg}
                  alt="Lúcio Renato, fundador do Piraquara On-line, durante pronunciamento em Piraquara, Paraná"
                  width={1600}
                  height={1200}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-petrol/45 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-petrol-foreground">
                  <p className="text-[10px] uppercase tracking-[0.22em] opacity-80">
                    Fundador · Comunicador local
                  </p>
                  <p className="mt-1 font-serif text-2xl">Lúcio Renato</p>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
