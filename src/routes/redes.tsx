import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Social } from "@/components/sections/social";
import { SiteFooter } from "@/components/sections/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

const SITE = "https://luciorenatopiraquara.com.br";

export const Route = createFileRoute("/redes")({
  head: () => ({
    meta: [
      { title: "Redes Sociais | Piraquara On-line — Lúcio Renato" },
      {
        name: "description",
        content:
          "Acompanhe Lúcio Renato e o Piraquara On-line no Instagram, Facebook, YouTube e WhatsApp.",
      },
      { property: "og:title", content: "Redes Sociais | Piraquara On-line" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/redes` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/redes` }],
  }),
  component: RedesPage,
});

function RedesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="pt-16 md:pt-20">
        <Social />
      </div>
      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
