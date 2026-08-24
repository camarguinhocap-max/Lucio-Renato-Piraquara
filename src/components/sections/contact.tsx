import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contato" className="py-20 md:py-28 border-t border-border">
      <div className="container-editorial grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="folio">Capítulo 06 — Contato</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-tight">
            Tem uma pauta, sugestão ou denúncia? Fale com a gente.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            A redação do Piraquara On-line responde a moradores, lideranças, comerciantes e
            instituições. Toda mensagem é lida — e tratada com a devida atenção.
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div className="border-t border-border pt-4">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                WhatsApp
              </dt>
              <dd className="mt-1 font-serif text-2xl text-foreground">(41) 98724-8686</dd>
            </div>
            <div className="border-t border-border pt-4">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">E-mail</dt>
              <dd className="mt-1 font-serif text-2xl text-foreground">
                contato@luciorenatopiraquara.com.br
              </dd>
            </div>
            <div className="border-t border-border pt-4">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Onde estamos
              </dt>
              <dd className="mt-1 font-serif text-2xl text-foreground">
                Rua Júlio Keques, 76 · Piraquara · PR
              </dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="lg:col-span-6 lg:col-start-7 space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Nome" name="name" />
            <Field label="E-mail" name="email" type="email" />
          </div>
          <Field label="Assunto" name="subject" />
          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Mensagem
            </label>
            <textarea
              name="message"
              rows={5}
              required
              className="mt-2 w-full bg-transparent border-b border-border focus:border-petrol outline-none py-3 text-foreground resize-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center rounded-sm bg-petrol px-6 py-3.5 text-sm font-medium text-petrol-foreground hover:opacity-90 transition"
          >
            {sent ? "Mensagem enviada ✓" : "Enviar mensagem"}
          </button>

          {sent && (
            <p className="text-sm text-muted-foreground">
              Obrigado! Em breve a equipe do Piraquara On-line entra em contato.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required
        className="mt-2 w-full bg-transparent border-b border-border focus:border-petrol outline-none py-3 text-foreground"
      />
    </div>
  );
}
