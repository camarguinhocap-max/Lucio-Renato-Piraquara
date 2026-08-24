const channels = [
  { name: "Instagram", handle: "@piraquaraonline", desc: "Reels, bastidores e cobertura ao vivo." },
  {
    name: "Facebook",
    handle: "/piraquaraonline",
    desc: "Notícias, debates e a comunidade reunida.",
  },
  {
    name: "YouTube",
    handle: "/piraquaraonline",
    desc: "Reportagens em vídeo e entrevistas locais.",
  },
  { name: "WhatsApp", handle: "Canal oficial", desc: "Alertas, utilidade pública e plantão." },
];

export function Social() {
  return (
    <section id="redes" className="py-20 md:py-28">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7">
            <p className="folio">Capítulo 04 — Redes</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-tight">
              A cidade também acontece nas redes — e a gente está em todas.
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 self-end text-muted-foreground">
            Acompanhe a cobertura em tempo real, vídeos diários e os bastidores das pautas que estão
            movimentando Piraquara.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((c) => (
            <a
              key={c.name}
              href="#"
              className="group flex flex-col justify-between rounded-sm border border-border p-6 min-h-44 hover:border-petrol transition-colors"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {c.name}
                </p>
                <p className="mt-2 font-serif text-2xl text-foreground">{c.handle}</p>
              </div>
              <div className="mt-6 flex items-end justify-between">
                <p className="text-sm text-muted-foreground max-w-[14ch] leading-snug">{c.desc}</p>
                <span className="text-petrol group-hover:translate-x-1 transition-transform">
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
