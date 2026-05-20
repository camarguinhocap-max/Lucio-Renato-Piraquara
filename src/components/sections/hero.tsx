import heroImg from "@/assets/piraquara-hero.jpg";

export function Hero() {
  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-muted-foreground mb-8">
              <span className="h-px w-10 bg-petrol" />
              <span>Edição diária · Piraquara, Paraná</span>
            </div>
            <h1 className="font-serif text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl text-foreground">
              A cidade contada por
              <br />
              <span className="text-petrol italic">quem vive Piraquara</span>
              <span className="text-ochre">.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              O Piraquara On-line é um canal de comunicação dedicado à informação local, à
              utilidade pública e à cobertura do que acontece nos bairros, nas escolas, nas ruas
              e nos serviços essenciais da nossa cidade.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#contato"
                className="inline-flex items-center rounded-sm bg-petrol px-6 py-3.5 text-sm font-medium text-petrol-foreground hover:opacity-90 transition"
              >
                Falar com a equipe
              </a>
              <a
                href="#conteudos"
                className="inline-flex items-center rounded-sm border border-foreground/25 px-6 py-3.5 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition"
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

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
              <img
                src={heroImg}
                alt="Vista aérea de Piraquara, Paraná, com a Serra do Mar ao fundo"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-petrol/40 via-transparent to-transparent" />
            </div>
            <figcaption className="mt-3 text-xs text-muted-foreground italic">
              Piraquara vista ao amanhecer — entre a Serra e os mananciais.
            </figcaption>
          </div>
        </div>
      </div>
    </section>
  );
}
