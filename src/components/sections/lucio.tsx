import lucio from "@/assets/lucio-renato.jpg";

export function Lucio() {
  return (
    <section id="lucio" className="py-20 md:py-32 bg-petrol text-petrol-foreground">
      <div className="container-editorial grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={lucio}
              alt="Retrato de Lúcio Renato, fundador do Piraquara On-line"
              width={896}
              height={1152}
              loading="lazy"
              className="h-full w-full object-cover grayscale-[15%]"
            />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.22em] opacity-70">
            Lúcio Renato · Fundador
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-xs tracking-[0.22em] uppercase opacity-70">02 — Quem está por trás</p>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-[1.05]">
            “Cobrir Piraquara é, antes de tudo, ouvir Piraquara.”
          </h2>

          <div className="mt-8 space-y-5 text-base md:text-lg leading-relaxed opacity-90">
            <p>
              Lúcio Renato é o fundador e rosto do Piraquara On-line. Comunicador, morador e
              defensor da cidade, ele construiu ao longo dos anos um canal reconhecido pela
              presença constante nas ruas, pelos vídeos que circulam diariamente e pelo
              compromisso com a informação de utilidade pública.
            </p>
            <p>
              Mais do que um veículo de notícias, o projeto é uma extensão da forma como ele
              entende o jornalismo local: próximo, humano e a serviço da comunidade.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <div>
              <p className="font-serif text-2xl">10+</p>
              <p className="opacity-70">anos cobrindo a cidade</p>
            </div>
            <div>
              <p className="font-serif text-2xl">Milhares</p>
              <p className="opacity-70">de moradores impactados</p>
            </div>
            <div>
              <p className="font-serif text-2xl">Diário</p>
              <p className="opacity-70">presença nas redes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
