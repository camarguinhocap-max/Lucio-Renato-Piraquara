import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./cf-env", () => ({ getCloudflareEnvOrNull: vi.fn() }));
vi.mock("./posts-db", () => ({ listPosts: vi.fn(), getPostById: vi.fn() }));

import { getCloudflareEnvOrNull } from "./cf-env";
import { getPostById, listPosts } from "./posts-db";
import { getPostDetail, getPostsForCategory } from "./posts-service";

const samplePost = {
  id: 1,
  categoria: "noticias-locais" as const,
  titulo: "Título",
  texto: "Texto",
  fotoUrl: null,
  autorTelegramId: 123,
  autorNome: "Lúcio",
  criadoEm: 1_700_000_000_000,
};

describe("posts-service", () => {
  beforeEach(() => {
    vi.mocked(getCloudflareEnvOrNull).mockReset();
    vi.mocked(listPosts).mockReset();
    vi.mocked(getPostById).mockReset();
    vi.stubGlobal("fetch", vi.fn());
  });

  it("queries D1 directly when Cloudflare bindings are available", async () => {
    const fakeEnv = { DB: {} } as never;
    vi.mocked(getCloudflareEnvOrNull).mockReturnValue(fakeEnv);
    vi.mocked(listPosts).mockResolvedValue([samplePost]);

    const posts = await getPostsForCategory("noticias-locais");

    expect(listPosts).toHaveBeenCalledWith(fakeEnv.DB, "noticias-locais");
    expect(posts).toEqual([samplePost]);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("falls back to the public API when Cloudflare bindings are unavailable", async () => {
    vi.mocked(getCloudflareEnvOrNull).mockReturnValue(null);
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify({ posts: [samplePost] }), { status: 200 }));

    const posts = await getPostsForCategory("noticias-locais");

    expect(fetch).toHaveBeenCalledWith("https://luciorenatopiraquara.com.br/api/posts?categoria=noticias-locais");
    expect(posts).toEqual([samplePost]);
  });

  it("getPostDetail queries D1 directly when available", async () => {
    const fakeEnv = { DB: {} } as never;
    vi.mocked(getCloudflareEnvOrNull).mockReturnValue(fakeEnv);
    vi.mocked(getPostById).mockResolvedValue(samplePost);

    expect(await getPostDetail(1)).toEqual(samplePost);
    expect(getPostById).toHaveBeenCalledWith(fakeEnv.DB, 1);
  });

  it("getPostDetail returns null on a 404 from the fallback API", async () => {
    vi.mocked(getCloudflareEnvOrNull).mockReturnValue(null);
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 404 }));

    expect(await getPostDetail(999)).toBeNull();
  });
});
