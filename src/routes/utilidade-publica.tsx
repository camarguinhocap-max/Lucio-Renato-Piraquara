import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { Utilities } from "@/components/sections/utilities";
import { SiteFooter } from "@/components/sections/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

const SITE = "https://luciorenatopiraquara.com.br";

export const Route = createFileRoute("/utilidade-publica")({
  head: () => ({
    meta: [
      { title: "Utilidade Pública de Piraquara-PR | Telefones e serviços" },
      {
        name: "description",
        content:
          "Telefones de emergência, saúde, segurança e serviços essenciais de Piraquara-PR, reunidos pelo Piraquara On-line, de Lúcio Renato.",
      },
      { property: "og:title", content: "Utilidade Pública de Piraquara-PR" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/utilidade-publica` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/utilidade-publica` }],
  }),
  component: UtilidadePublicaPage,
});

function UtilidadePublicaPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="pt-16 md:pt-20">
        <Utilities />
      </div>
      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
