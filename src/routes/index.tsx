import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
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
      { title: "Piraquara On-line | Notícias de Piraquara-PR com Lúcio Renato" },
      {
        name: "description",
        content:
          "Notícias de Piraquara-PR, utilidade pública, denúncias e cobertura comunitária. O portal de Lúcio Renato, há mais de 10 anos nas ruas da cidade.",
      },
      {
        property: "og:title",
        content: "Piraquara On-line | Notícias de Piraquara-PR com Lúcio Renato",
      },
      {
        property: "og:description",
        content:
          "Portal de notícias, utilidade pública e cobertura comunitária de Piraquara, Paraná, com Lúcio Renato.",
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
      <About />
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

