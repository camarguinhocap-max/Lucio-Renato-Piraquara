import { createFileRoute } from "@tanstack/react-router";
import { getPostDetail } from "@/lib/posts-service";

export const Route = createFileRoute("/api/posts/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const id = Number(params.id);
        if (!Number.isFinite(id)) {
          return new Response(JSON.stringify({ error: "invalid id" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
        const post = await getPostDetail(id);
        if (!post) {
          return new Response(JSON.stringify({ error: "not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify(post), {
          headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=30" },
        });
      },
    },
  },
});
