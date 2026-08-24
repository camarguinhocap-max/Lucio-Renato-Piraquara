import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { Lucio } from "@/components/sections/lucio";
import { Content } from "@/components/sections/content";
import { Utilities } from "@/components/sections/utilities";
import { Social } from "@/components/sections/social";
import { Partners } from "@/components/sections/partners";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/sections/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

const SITE = "https://luciorenatopiraquara.com.br";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lúcio Renato | Ex-vereador e comunicador de Piraquara-PR" },
      {
        name: "description",
        content:
          "Lúcio Renato, ex-vereador e comunicador de Piraquara-PR há mais de 10 anos, apresenta o Piraquara On-line: notícias, utilidade pública e cobertura comunitária.",
      },
      {
        property: "og:title",
        content: "Lúcio Renato | Ex-vereador e comunicador de Piraquara-PR",
      },
      {
        property: "og:description",
        content:
          "Notícias, utilidade pública e cobertura comunitária de Piraquara, Paraná, pelo canal de Lúcio Renato.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "geo.placename", content: "Piraquara, Paraná, Brasil" },
      { name: "geo.region", content: "BR-PR" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${SITE}/#website`,
              url: `${SITE}/`,
              name: "Piraquara On-line",
              inLanguage: "pt-BR",
              publisher: { "@id": `${SITE}/#organization` },
            },
            {
              "@type": "WebPage",
              "@id": `${SITE}/#webpage`,
              url: `${SITE}/`,
              name: "Piraquara On-line | Notícias de Piraquara-PR com Lúcio Renato",
              isPartOf: { "@id": `${SITE}/#website` },
              about: { "@id": `${SITE}/#lucio-renato` },
              inLanguage: "pt-BR",
            },
            {
              "@type": "Person",
              "@id": `${SITE}/#lucio-renato`,
              name: "Lúcio Renato",
              jobTitle: "Comunicador e ex-vereador em Piraquara-PR",
              description:
                "Fundador do Piraquara On-line, comunicador local com mais de 10 anos de cobertura em Piraquara, Paraná.",
              homeLocation: { "@type": "City", name: "Piraquara, PR, Brasil" },
              affiliation: { "@id": `${SITE}/#organization` },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <Lucio />
      <Content />
      <Utilities />
      <Social />
      <Partners />
      <Contact />
      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
