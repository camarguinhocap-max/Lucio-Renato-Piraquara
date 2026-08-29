import { createFileRoute } from "@tanstack/react-router";
import { getCloudflareEnv } from "@/lib/cf-env";

export const Route = createFileRoute("/fotos/$key")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const env = getCloudflareEnv();
        const { value, metadata } = await env.PHOTOS.getWithMetadata<{ contentType: string }>(
          params.key,
          "arrayBuffer",
        );
        if (!value) {
          return new Response("Not found", { status: 404 });
        }
        return new Response(value, {
          headers: {
            "Content-Type": metadata?.contentType ?? "image/jpeg",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
