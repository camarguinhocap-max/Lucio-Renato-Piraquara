import { useReveal } from "@/hooks/use-reveal";

const items = [
  {
    n: "/01",
    t: "Notícias locais",
    d: "Cobertura diária do que acontece em Piraquara e nos bairros da região metropolitana.",
  },
  {
    n: "/02",
    t: "Utilidade pública",
    d: "Telefones, serviços, horários, avisos e tudo que o morador precisa saber para o dia a dia.",
  },
  {
    n: "/03",
    t: "Cobertura comunitária",
    d: "Histórias de gente da cidade, ações sociais, mobilizações de bairro e iniciativas locais.",
  },
  {
    n: "/04",
    t: "Agenda da cidade",
    d: "Eventos culturais, esportivos, religiosos e institucionais que movimentam Piraquara.",
  },
  {
    n: "/05",
    t: "Vídeos e reels",
    d: "Conteúdo audiovisual gravado nas ruas, com a linguagem direta que o público conhece.",
  },
  {
    n: "/06",
    t: "Redes sociais ativas",
    d: "Facebook, Instagram e canais de vídeo atualizados praticamente em tempo real.",
  },
];

export function Content() {
  const ref = useReveal<HTMLUListElement>();

  return (
    <section id="conteudos" className="py-20 md:py-28 border-t border-border">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="folio">Capítulo 02 — Conteúdos</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-tight max-w-2xl">
              O que Lúcio Renato cobre no Piraquara On-line.
            </h2>
          </div>
          <p className="md:max-w-sm text-muted-foreground">
            Seis frentes de conteúdo que somam um único objetivo: manter a cidade informada e
            conectada.
          </p>
        </div>

        <ul ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((i, idx) => (
            <li key={i.t} className="reveal" style={{ transitionDelay: `${idx * 70}ms` }}>
              <div className="group surface-card h-full p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
                <p className="font-mono text-xs text-petrol">{i.n}</p>
                <span
                  aria-hidden
                  className="mt-3 block h-px w-10 bg-petrol/40 transition-all duration-300 group-hover:w-16"
                />
                <h3 className="mt-3 font-serif text-2xl md:text-3xl">{i.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{i.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
