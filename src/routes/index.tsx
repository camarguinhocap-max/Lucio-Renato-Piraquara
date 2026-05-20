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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Piraquara On-line — Portal local, utilidade pública e comunidade" },
      {
        name: "description",
        content:
          "Notícias de Piraquara-PR, utilidade pública, cobertura comunitária e vídeos. Fundado por Lúcio Renato, o portal que vive a cidade por dentro.",
      },
      { property: "og:title", content: "Piraquara On-line — Informação local em Piraquara-PR" },
      {
        property: "og:description",
        content:
          "Portal de notícias, utilidade pública e cobertura comunitária da cidade de Piraquara, Paraná.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsMediaOrganization",
          name: "Piraquara On-line",
          url: "/",
          founder: { "@type": "Person", name: "Lúcio Renato" },
          areaServed: { "@type": "City", name: "Piraquara, PR" },
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
    </main>
  );
}
