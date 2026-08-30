import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/sections/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getCategoryLabel, isCategorySlug } from "@/lib/categories";
import { getPostsForCategory } from "@/lib/posts-service";

const SITE = "https://luciorenatopiraquara.com.br";

export const Route = createFileRoute("/conteudos/$categoria")({
  loader: async ({ params }) => {
    if (!isCategorySlug(params.categoria)) {
      throw notFound();
    }
    const posts = await getPostsForCategory(params.categoria);
    return { posts };
  },
  head: ({ params }) => {
    const label = isCategorySlug(params.categoria) ? getCategoryLabel(params.categoria) : "Conteúdos";
    return {
      meta: [
        { title: `${label} | Piraquara On-line — Lúcio Renato` },
        { name: "description", content: `Últimas publicações de ${label} no Piraquara On-line.` },
        { property: "og:title", content: `${label} | Piraquara On-line` },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE}/conteudos/${params.categoria}` },
      ],
      links: [{ rel: "canonical", href: `${SITE}/conteudos/${params.categoria}` }],
    };
  },
  component: CategoriaPage,
});

function CategoriaPage() {
  const { categoria } = Route.useParams();
  const { posts } = Route.useLoaderData();
  const label = isCategorySlug(categoria) ? getCategoryLabel(categoria) : "Conteúdos";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="pt-16 md:pt-20">
        <section className="py-20 md:py-28">
          <div className="container-editorial">
            <p className="folio">Conteúdos</p>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl leading-tight">{label}</h1>

            {posts.length === 0 ? (
              <p className="mt-10 text-muted-foreground">Ainda não tem publicação nessa categoria.</p>
            ) : (
              <ul className="mt-10 grid gap-6 md:grid-cols-2">
                {posts.map((post) => (
                  <li key={post.id} className="surface-card p-6">
                    <Link to="/conteudos/$categoria/$id" params={{ categoria, id: String(post.id) }}>
                      <h2 className="font-serif text-2xl">{post.titulo}</h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {new Date(post.criadoEm).toLocaleDateString("pt-BR")}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
