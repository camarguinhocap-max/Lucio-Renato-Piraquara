import { describe, expect, it } from "vitest";
import { CATEGORIES, getCategoryLabel, isCategorySlug } from "./categories";

describe("categories", () => {
  it("has exactly the six content categories, in order", () => {
    expect(CATEGORIES.map((c) => c.slug)).toEqual([
      "noticias-locais",
      "utilidade-publica",
      "cobertura-comunitaria",
      "agenda-da-cidade",
      "videos-e-reels",
      "redes-sociais",
    ]);
  });

  it("isCategorySlug accepts known slugs and rejects unknown ones", () => {
    expect(isCategorySlug("noticias-locais")).toBe(true);
    expect(isCategorySlug("categoria-inventada")).toBe(false);
  });

  it("getCategoryLabel returns the human-readable label", () => {
    expect(getCategoryLabel("noticias-locais")).toBe("Notícias locais");
  });
});
