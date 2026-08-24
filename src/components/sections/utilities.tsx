const groups = [
  {
    cat: "Saúde",
    items: [
      { name: "SAMU", phone: "192" },
      { name: "UPA Piraquara", phone: "(41) 3590-3500" },
      { name: "Vigilância Sanitária", phone: "(41) 3590-1500" },
    ],
  },
  {
    cat: "Segurança",
    items: [
      { name: "Polícia Militar", phone: "190" },
      { name: "Polícia Civil", phone: "197" },
      { name: "Guarda Municipal", phone: "153" },
    ],
  },
  {
    cat: "Emergência",
    items: [
      { name: "Bombeiros", phone: "193" },
      { name: "Defesa Civil", phone: "199" },
      { name: "Copel (energia)", phone: "0800 51 00 116" },
    ],
  },
  {
    cat: "Serviços essenciais",
    items: [
      { name: "Sanepar (água)", phone: "0800 200 0115" },
      { name: "Prefeitura Municipal", phone: "(41) 3590-1100" },
      { name: "Procon Piraquara", phone: "(41) 3590-3300" },
    ],
  },
];

export function Utilities() {
  return (
    <section id="utilidade" className="py-20 md:py-28 bg-paper border-y border-border">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-5">
            <p className="folio">Capítulo 03 — Utilidade pública</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-tight">
              Os contatos que toda família de Piraquara precisa ter à mão.
            </h2>
          </div>
          <p className="lg:col-span-6 lg:col-start-7 text-muted-foreground text-base md:text-lg leading-relaxed self-end">
            Reunimos numa única página os telefones de emergência, atendimento ao cidadão e serviços
            essenciais do município. Salve, compartilhe e use sempre que precisar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {groups.map((g) => (
            <div key={g.cat} className="bg-paper p-6 md:p-7">
              <div className="flex items-baseline justify-between border-b border-border pb-3">
                <h3 className="font-serif text-2xl text-petrol">{g.cat}</h3>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  24h
                </span>
              </div>
              <ul className="mt-4 space-y-4">
                {g.items.map((it) => (
                  <li key={it.name}>
                    <p className="text-sm text-muted-foreground">{it.name}</p>
                    <a
                      href={`tel:${it.phone.replace(/\D/g, "")}`}
                      className="font-serif text-xl text-foreground hover:text-petrol transition-colors"
                    >
                      {it.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-foreground italic">
          *Os contatos podem sofrer alterações. Em caso de dúvida, confirme com o órgão responsável.
        </p>
      </div>
    </section>
  );
}
