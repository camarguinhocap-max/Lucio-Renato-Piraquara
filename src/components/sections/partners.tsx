import fioearoma from "@/assets/partner-fioearoma.jpg";
import sunnesul from "@/assets/partner-sunnesul.webp";
import altonia from "@/assets/partner-altonia.jpeg";

const logos = [
  { src: fioearoma, alt: "Fio e Aroma", href: "https://fioearoma.com.br", size: "square" as const },
  { src: sunnesul, alt: "Sunne Sul", href: "https://sunnesul.com.br", size: "wide" as const },
  {
    src: altonia,
    alt: "Distribuidora Altônia",
    href: "https://www.instagram.com/altonia.distribuidora",
    size: "square" as const,
  },
];

export function Partners() {
  return (
    <section id="parceiros" className="py-20 md:py-28 bg-foreground text-background">
      <div className="container-editorial">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="text-xs tracking-[0.22em] uppercase opacity-60">Já são nossos parceiros</p>
          <a
            href="/parceiros"
            className="text-xs font-medium uppercase tracking-[0.18em] text-background/80 hover:text-background transition"
          >
            Conhecer os parceiros →
          </a>
        </div>
        <div className="marquee-viewport mt-6 mb-16">
          <div className="marquee-track gap-6">
            {[...logos, ...logos].map((l, i) => {
              const cardClass =
                l.size === "square"
                  ? "flex h-24 w-24 flex-none items-center justify-center rounded-sm bg-background p-2.5 transition-transform sm:h-32 sm:w-32"
                  : "flex h-20 w-40 flex-none items-center justify-center rounded-sm bg-background p-4 transition-transform sm:h-24 sm:w-48";
              const img = (
                <img src={l.src} alt={l.alt} className="max-h-full max-w-full object-contain" />
              );
              return l.href ? (
                <a
                  key={`${l.alt}-${i}`}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visitar ${l.alt}`}
                  className={`${cardClass} hover:scale-[1.03]`}
                >
                  {img}
                </a>
              ) : (
                <div key={`${l.alt}-${i}`} className={cardClass}>
                  {img}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-editorial grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <p className="text-xs tracking-[0.22em] uppercase opacity-60">Capítulo 05 — Parceiros</p>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-[1.05]">
            Anuncie onde a sua cidade está olhando.
          </h2>
          <p className="mt-6 text-base md:text-lg opacity-80 max-w-xl leading-relaxed">
            Comércios, prestadores de serviço, profissionais liberais e instituições locais
            encontram no Piraquara On-line um canal direto com o público da cidade. Posts, vídeos,
            menções em pauta e formatos sob medida.
          </p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <ul className="space-y-4 text-sm">
            {[
              "Posts patrocinados em Instagram e Facebook",
              "Vídeos e reels com produção própria",
              "Menção em coberturas e matérias locais",
              "Pacotes mensais com relatório de alcance",
            ].map((p) => (
              <li key={p} className="flex gap-3 border-t border-background/15 pt-4">
                <span className="text-ochre">—</span>
                <span className="opacity-90">{p}</span>
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            className="mt-8 inline-flex items-center rounded-sm bg-background text-foreground px-6 py-3.5 text-sm font-medium hover:opacity-90 transition"
          >
            Quero anunciar →
          </a>
        </div>
      </div>
    </section>
  );
}
