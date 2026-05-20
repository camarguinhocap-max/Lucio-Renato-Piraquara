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
  return (
    <section id="conteudos" className="py-20 md:py-28 border-t border-border">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow">03 — Conteúdos</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-tight max-w-2xl">
              O que você encontra no Piraquara On-line.
            </h2>
          </div>
          <p className="md:max-w-sm text-muted-foreground">
            Seis frentes de conteúdo que somam um único objetivo: manter a cidade informada e
            conectada.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-border">
          {items.map((i) => (
            <li
              key={i.t}
              className="group p-6 md:p-8 border-b border-border lg:[&:nth-child(3n+1)]:border-l-0 sm:[&:nth-child(2n)]:border-l border-l-0 sm:border-l lg:border-l lg:first:border-l-0 transition-colors hover:bg-accent/40"
            >
              <p className="font-mono text-xs text-petrol">{i.n}</p>
              <h3 className="mt-3 font-serif text-2xl md:text-3xl">{i.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{i.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
