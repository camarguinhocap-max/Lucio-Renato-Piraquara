import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const SITE = "https://luciorenatopiraquara.com.br";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lúcio Renato — Piraquara On-line" },
      {
        name: "description",
        content:
          "Lúcio Renato, ex-vereador e comunicador de Piraquara-PR: notícias, utilidade pública e cobertura comunitária pelo Piraquara On-line.",
      },
      { name: "author", content: "Lúcio Renato — Piraquara On-line" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:site_name", content: "Piraquara On-line" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE}/og-image.png` },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", href: "/apple-touch-icon.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-KWSHYDTDKK",
        async: true,
      },
      {
        children:
          "window.dataLayer = window.dataLayer || [];\n" +
          "function gtag(){dataLayer.push(arguments);}\n" +
          "gtag('js', new Date());\n" +
          "gtag('config', 'G-KWSHYDTDKK');",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsMediaOrganization",
          "@id": "https://luciorenatopiraquara.com.br/#organization",
          name: "Piraquara On-line",
          alternateName: "Lúcio Renato Piraquara",
          url: "https://luciorenatopiraquara.com.br/",
          inLanguage: "pt-BR",
          description:
            "Portal e canal de comunicação local da cidade de Piraquara, Paraná, com notícias, utilidade pública e cobertura comunitária.",
          founder: {
            "@type": "Person",
            "@id": "https://luciorenatopiraquara.com.br/#lucio-renato",
            name: "Lúcio Renato",
            alternateName: "Lúcio Renato Piraquara",
            jobTitle: "Comunicador e ex-vereador em Piraquara-PR",
            worksFor: { "@id": "https://luciorenatopiraquara.com.br/#organization" },
            sameAs: ["https://www.facebook.com/profile.php?id=61592683896175"],
          },
          sameAs: ["https://www.facebook.com/profile.php?id=61592683896175"],
          areaServed: [
            { "@type": "City", name: "Piraquara", addressRegion: "PR", addressCountry: "BR" },
            { "@type": "AdministrativeArea", name: "Região Metropolitana de Curitiba" },
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua Júlio Keques, 76",
            addressLocality: "Piraquara",
            addressRegion: "PR",
            postalCode: "83301-700",
            addressCountry: "BR",
          },
          telephone: "+5541987248686",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "redação",
            telephone: "+5541987248686",
            availableLanguage: "Portuguese",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://luciorenatopiraquara.com.br/#localbusiness",
          name: "Piraquara On-line",
          image: `${SITE}/og-image.png`,
          url: "https://luciorenatopiraquara.com.br/",
          telephone: "+5541987248686",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua Júlio Keques, 76",
            addressLocality: "Piraquara",
            addressRegion: "PR",
            postalCode: "83301-700",
            addressCountry: "BR",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: -25.451766,
            longitude: -49.0730004,
          },
          areaServed: {
            "@type": "City",
            name: "Piraquara",
            addressRegion: "PR",
            addressCountry: "BR",
          },
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
