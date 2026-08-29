import { createFileRoute } from "@tanstack/react-router";
import { isCategorySlug } from "@/lib/categories";
import { getCloudflareEnv } from "@/lib/cf-env";
import { listRecentPosts } from "@/lib/posts-db";
import { getPostsForCategory } from "@/lib/posts-service";

export const Route = createFileRoute("/api/posts")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const categoria = url.searchParams.get("categoria");

        if (categoria) {
          if (!isCategorySlug(categoria)) {
            return new Response(JSON.stringify({ error: "unknown category" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }
          const posts = await getPostsForCategory(categoria);
          return new Response(JSON.stringify({ posts }), {
            headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=30" },
          });
        }

        const env = getCloudflareEnv();
        const posts = await listRecentPosts(env.DB);
        return new Response(JSON.stringify({ posts }), {
          headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=30" },
        });
      },
    },
  },
});
