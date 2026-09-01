import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/sections/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ShareButtons } from "@/components/share-buttons";
import { getCategoryLabel, isCategorySlug } from "@/lib/categories";
import { getPostDetail } from "@/lib/posts-service";

const SITE = "https://luciorenatopiraquara.com.br";

export const Route = createFileRoute("/conteudos/$categoria/$id")({
  loader: async ({ params }) => {
    const id = Number(params.id);
    if (!isCategorySlug(params.categoria) || !Number.isFinite(id)) {
      throw notFound();
    }
    const post = await getPostDetail(id);
    if (!post || post.categoria !== params.categoria) {
      throw notFound();
    }
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const url = `${SITE}/conteudos/${post.categoria}/${post.id}`;
    return {
      meta: [
        { title: `${post.titulo} | Piraquara On-line` },
        { name: "description", content: post.texto.slice(0, 160) },
        { property: "og:title", content: post.titulo },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(post.fotoUrl ? [{ property: "og:image", content: `${SITE}${post.fotoUrl}` }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: post.titulo,
            datePublished: new Date(post.criadoEm).toISOString(),
            author: { "@type": "Person", name: "Lúcio Renato Ribeiro" },
            image: post.fotoUrl ? [`${SITE}${post.fotoUrl}`] : undefined,
            mainEntityOfPage: url,
          }),
        },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="pt-16 md:pt-20">
        <article className="py-20 md:py-28">
          <div className="container-editorial max-w-2xl">
            <p className="folio">{getCategoryLabel(post.categoria)}</p>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl leading-tight">{post.titulo}</h1>
            <p className="mt-4 text-sm text-muted-foreground">{new Date(post.criadoEm).toLocaleDateString("pt-BR")}</p>
            {post.fotoUrl ? <img src={post.fotoUrl} alt={post.titulo} className="mt-8 w-full rounded-sm object-cover" /> : null}
            <p className="mt-8 whitespace-pre-wrap leading-relaxed">{post.texto}</p>
            <ShareButtons url={`${SITE}/conteudos/${post.categoria}/${post.id}`} title={post.titulo} />
          </div>
        </article>
      </div>
      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
