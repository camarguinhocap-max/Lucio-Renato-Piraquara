import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Content } from "@/components/sections/content";
import { SiteFooter } from "@/components/sections/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

const SITE = "https://luciorenatopiraquara.com.br";

export const Route = createFileRoute("/conteudos")({
  head: () => ({
    meta: [
      { title: "Conteúdos | Piraquara On-line — Lúcio Renato" },
      {
        name: "description",
        content:
          "Notícias locais, utilidade pública, cobertura comunitária, agenda da cidade e vídeos: o que Lúcio Renato cobre no Piraquara On-line.",
      },
      { property: "og:title", content: "Conteúdos | Piraquara On-line" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/conteudos` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/conteudos` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: SITE },
            { "@type": "ListItem", position: 2, name: "Conteúdos", item: `${SITE}/conteudos` },
          ],
        }),
      },
    ],
  }),
  component: ConteudosPage,
});

function ConteudosPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="pt-16 md:pt-20">
        <Content />
      </div>
      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
