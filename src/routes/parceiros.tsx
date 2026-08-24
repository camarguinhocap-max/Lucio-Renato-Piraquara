import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/sections/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import fioearoma from "@/assets/partner-fioearoma.jpg";
import sunnesul from "@/assets/partner-sunnesul.webp";
import altonia from "@/assets/partner-altonia.jpeg";
import dividai from "@/assets/partner-dividai.png";

const SITE = "https://luciorenatopiraquara.com.br";

const partners = [
  {
    logo: fioearoma,
    name: "Fio e Aroma",
    tagline: "Artesanatos & Cuidados",
    desc: "Sabonetes artesanais feitos à mão, com ingredientes naturais — lavanda, camomila, mel, argila vermelha, lama negra e mais. Produção em pequenos lotes, com tempo de cura respeitado e atenção a cada detalhe. Também faz kits e lembranças personalizadas.",
    href: "https://fioearoma.com.br",
  },
  {
    logo: sunnesul,
    name: "Sunne Sul",
    tagline: "Energia solar",
    desc: "Assessoria de energia solar com até 20% de desconto na conta de luz, sem obras, sem investimento inicial e sem mexer na rede elétrica — para residências e empresas do Paraná e região Sul.",
    href: "https://sunnesul.com.br",
  },
  {
    logo: altonia,
    name: "Distribuidora Altônia",
    tagline: "Gás e bebidas · desde 2016",
    desc: "Distribuidora de gás e bebidas atendendo Piraquara desde 2016.",
    href: "https://www.instagram.com/altonia.distribuidora" as string | undefined,
  },
  {
    logo: dividai,
    name: "DividAI",
    tagline: "Criação de sites & landing pages",
    desc: "Agência responsável pelo desenvolvimento deste site. Cria sites, landing pages e presença digital rápidos, modernos e otimizados para atrair e converter clientes.",
    href: "https://dividai.com/portfolio" as string | undefined,
  },
];

export const Route = createFileRoute("/parceiros")({
  head: () => ({
    meta: [
      { title: "Parceiros | Piraquara On-line" },
      {
        name: "description",
        content:
          "Conheça os parceiros do Piraquara On-line: Fio e Aroma, Sunne Sul e Distribuidora Altônia.",
      },
      { property: "og:title", content: "Parceiros | Piraquara On-line" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/parceiros` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/parceiros` }],
  }),
  component: ParceirosPage,
});

function ParceirosPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="border-b border-border pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-editorial">
          <p className="folio">Parceiros do Piraquara On-line</p>
          <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.05] md:text-6xl">
            Quem apoia o canal — e o que cada um faz.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            Comércios e negócios locais que caminham junto com o Piraquara On-line.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-editorial grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((p) => (
            <article key={p.name} className="surface-card flex flex-col p-6">
              <div className="flex h-28 items-center justify-center rounded-sm bg-paper p-4">
                <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" />
              </div>
              <h2 className="mt-6 font-serif text-2xl">{p.name}</h2>
              <p className="eyebrow mt-1">{p.tagline}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center text-sm font-medium text-petrol transition hover:opacity-80"
                >
                  {p.href.includes("instagram.com") ? "Ver no Instagram →" : "Visitar site →"}
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
