export function Partners() {
  return (
    <section id="parceiros" className="py-20 md:py-28 bg-foreground text-background">
      <div className="container-editorial grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <p className="text-xs tracking-[0.22em] uppercase opacity-60">06 — Parceiros</p>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-[1.05]">
            Anuncie onde a sua cidade está olhando.
          </h2>
          <p className="mt-6 text-base md:text-lg opacity-80 max-w-xl leading-relaxed">
            Comércios, prestadores de serviço, profissionais liberais e instituições locais
            encontram no Piraquara On-line um canal direto com o público da cidade. Posts,
            vídeos, menções em pauta e formatos sob medida.
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
