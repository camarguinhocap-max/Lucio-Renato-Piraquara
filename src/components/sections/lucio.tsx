import lucio from "@/assets/lucio-renato.jpg";
import lucioRosangela from "@/assets/lucio-evento-1.jpg";
import lucioMoro from "@/assets/lucio-evento-2.jpg";
import { useReveal } from "@/hooks/use-reveal";

const encontros = [
  {
    src: lucio,
    alt: "Retrato de Lúcio Renato, ex-vereador e comunicador local em Piraquara",
    caption: "Lúcio Renato · Ex-vereador e comunicador",
  },
  {
    src: lucioRosangela,
    alt: "Lúcio Renato com Rosângela Moro",
    caption: "Com Rosângela Moro, senadora",
  },
];

const pillars = [
  { t: "Missão", d: "Informar Piraquara com proximidade, responsabilidade e clareza." },
  { t: "Visão", d: "Ser a principal referência digital da cidade e da região metropolitana." },
  { t: "Valores", d: "Verdade, escuta, utilidade pública e respeito pela comunidade." },
];

export function Lucio() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="lucio" className="py-20 md:py-32 bg-petrol text-petrol-foreground">
      <div ref={ref} className="container-editorial grid lg:grid-cols-12 gap-12 items-start">
        <div className="reveal lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={lucioMoro}
              alt="Lúcio Renato com Sérgio Moro"
              loading="lazy"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-petrol/70 via-transparent to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-4 text-xs uppercase tracking-[0.22em] opacity-90">
              Com Sérgio Moro, no apoio a um novo governo para o Paraná
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {encontros.map((e) => (
              <figure key={e.caption} className="relative aspect-square overflow-hidden rounded-sm">
                <img
                  src={e.src}
                  alt={e.alt}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 text-[11px] leading-snug text-petrol-foreground/90">
                  {e.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="reveal lg:col-span-6 lg:col-start-7" style={{ transitionDelay: "120ms" }}>
          <p className="text-xs tracking-[0.22em] uppercase opacity-70">Capítulo 01 — Quem é ele</p>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-[1.05]">
            De vereador a comunicador, sem nunca sair das ruas de Piraquara.
          </h2>

          <div className="mt-8 space-y-5 text-base md:text-lg leading-relaxed opacity-90">
            <p>
              Lúcio Renato é o fundador e rosto do Piraquara On-line. Ex-vereador, morador e
              defensor da cidade, ele construiu ao longo de mais de uma década um canal reconhecido
              pela presença constante nas ruas, pelos vídeos que circulam diariamente e pelo
              compromisso com a informação de utilidade pública.
            </p>
            <p>
              Mais do que um veículo de notícias, o Piraquara On-line é uma extensão da forma como
              ele entende a comunicação local: próxima, humana e a serviço da comunidade — a pauta
              começa na esquina, no posto de saúde, na escola do bairro, e termina na tela de quem
              precisa de informação confiável.
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

          <div className="mt-12 grid sm:grid-cols-3 gap-8 pt-8 border-t border-petrol-foreground/15">
            {pillars.map((p) => (
              <div key={p.t}>
                <p className="font-serif text-xl">{p.t}</p>
                <p className="mt-2 text-sm opacity-75 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
