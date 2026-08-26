import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Lucio } from "@/components/sections/lucio";
import { SiteFooter } from "@/components/sections/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

const SITE = "https://luciorenatopiraquara.com.br";

export const Route = createFileRoute("/quem-e-lucio-renato")({
  head: () => ({
    meta: [
      { title: "Quem é Lúcio Renato | Biografia e trajetória em Piraquara-PR" },
      {
        name: "description",
        content:
          "Lúcio Renato: 28 anos como comerciante, ex-vereador desde 1997, pai de 7 filhos e fundador do Piraquara On-line. Conheça a trajetória dele em Piraquara, Paraná.",
      },
      { property: "og:title", content: "Quem é Lúcio Renato | Piraquara-PR" },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: `${SITE}/quem-e-lucio-renato` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/quem-e-lucio-renato` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE}/quem-e-lucio-renato#webpage`,
          url: `${SITE}/quem-e-lucio-renato`,
          name: "Quem é Lúcio Renato",
          inLanguage: "pt-BR",
          mainEntity: { "@id": `${SITE}/#lucio-renato` },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: SITE },
            {
              "@type": "ListItem",
              position: 2,
              name: "Quem é ele",
              item: `${SITE}/quem-e-lucio-renato`,
            },
          ],
        }),
      },
    ],
  }),
  component: QuemELucioRenatoPage,
});

function QuemELucioRenatoPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="pt-16 md:pt-20">
        <Lucio />
      </div>
      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
