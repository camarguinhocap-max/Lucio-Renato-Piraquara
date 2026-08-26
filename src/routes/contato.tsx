import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/sections/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

const SITE = "https://luciorenatopiraquara.com.br";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | Piraquara On-line — Lúcio Renato" },
      {
        name: "description",
        content:
          "Fale com Lúcio Renato e a redação do Piraquara On-line: WhatsApp, e-mail e endereço em Piraquara-PR.",
      },
      { property: "og:title", content: "Contato | Piraquara On-line" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/contato` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/contato` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: SITE },
            { "@type": "ListItem", position: 2, name: "Contato", item: `${SITE}/contato` },
          ],
        }),
      },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="pt-16 md:pt-20">
        <Contact />
      </div>
      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
