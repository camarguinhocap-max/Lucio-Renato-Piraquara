export const CATEGORIES = [
  { slug: "noticias-locais", label: "Notícias locais", emoji: "📰" },
  { slug: "utilidade-publica", label: "Utilidade pública", emoji: "🏛️" },
  { slug: "cobertura-comunitaria", label: "Cobertura comunitária", emoji: "🤝" },
  { slug: "agenda-da-cidade", label: "Agenda da cidade", emoji: "📅" },
  { slug: "videos-e-reels", label: "Vídeos e reels", emoji: "🎥" },
  { slug: "redes-sociais", label: "Redes sociais ativas", emoji: "📱" },
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategorySlug = Category["slug"];

export function isCategorySlug(value: string): value is CategorySlug {
  return CATEGORIES.some((c) => c.slug === value);
}

export function getCategoryLabel(slug: CategorySlug): string {
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    throw new Error(`Unknown category slug: ${slug}`);
  }
  return category.label;
}
