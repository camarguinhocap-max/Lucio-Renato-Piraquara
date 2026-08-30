import { Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { CATEGORIES, type CategorySlug } from "@/lib/categories";

const DESCRIPTIONS: Record<CategorySlug, string> = {
  "noticias-locais": "Cobertura diária do que acontece em Piraquara e nos bairros da região metropolitana.",
  "utilidade-publica": "Telefones, serviços, horários, avisos e tudo que o morador precisa saber para o dia a dia.",
  "cobertura-comunitaria": "Histórias de gente da cidade, ações sociais, mobilizações de bairro e iniciativas locais.",
  "agenda-da-cidade": "Eventos culturais, esportivos, religiosos e institucionais que movimentam Piraquara.",
  "videos-e-reels": "Conteúdo audiovisual gravado nas ruas, com a linguagem direta que o público conhece.",
  "redes-sociais": "Facebook, Instagram e canais de vídeo atualizados praticamente em tempo real.",
};

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
          {CATEGORIES.map((category, idx) => (
            <li key={category.slug} className="reveal" style={{ transitionDelay: `${idx * 70}ms` }}>
              <Link
                to="/conteudos/$categoria"
                params={{ categoria: category.slug }}
                className="group surface-card h-full p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant block"
              >
                <p className="font-mono text-xs text-petrol">/{String(idx + 1).padStart(2, "0")}</p>
                <span
                  aria-hidden
                  className="mt-3 block h-px w-10 bg-petrol/40 transition-all duration-300 group-hover:w-16"
                />
                <h3 className="mt-3 font-serif text-2xl md:text-3xl">
                  {category.emoji} {category.label}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{DESCRIPTIONS[category.slug]}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
