export function About() {
  return (
    <section id="sobre" className="py-20 md:py-28 border-t border-border bg-paper">
      <div className="container-editorial grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">01 — Sobre</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-tight">
            Um portal feito de bairro em bairro.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 space-y-6 text-foreground/90 text-base md:text-lg leading-relaxed">
          <p>
            O Piraquara On-line nasceu da vontade de dar voz a uma cidade que, durante muito
            tempo, dependeu de coberturas feitas de longe. Aqui, a pauta começa na esquina, no
            posto de saúde, na escola do bairro — e termina na tela de quem precisa de
            informação confiável.
          </p>
          <p>
            Acreditamos no jornalismo local como serviço público: noticiar o que acontece,
            traduzir o que importa e estar perto da população quando ela mais precisa.
          </p>

          <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-border">
            {[
              { t: "Missão", d: "Informar Piraquara com proximidade, responsabilidade e clareza." },
              { t: "Visão", d: "Ser a principal referência digital da cidade e da região metropolitana." },
              { t: "Valores", d: "Verdade, escuta, utilidade pública e respeito pela comunidade." },
            ].map((v) => (
              <div key={v.t}>
                <p className="font-serif text-xl text-petrol">{v.t}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
