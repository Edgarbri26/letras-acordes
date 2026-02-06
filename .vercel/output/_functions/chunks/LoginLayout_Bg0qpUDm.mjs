import { e as createAstro, f as createComponent, h as addAttribute, n as renderHead, o as renderSlot, r as renderTemplate } from './astro/server_D9QA4LpJ.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro("https://www.micancionero.online");
const $$LoginLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LoginLayout;
  const {
    title,
    description = "Cancionero virtual para m\xFAsicos cristianos. Encuentra letras y acordes de tus canciones favoritas en CancioneroDigital.",
    image = "/favicon.svg"
    // Falta una imagen real de OG, usamos el favicon por ahora o un placeholder
  } = Astro2.props;
  const canonicalURL = new URL(
    Astro2.url.pathname,
    Astro2.site || "https://tusitio.com"
  );
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- Primary Meta Tags --><title>Login</title><meta name="title" content="Login"><meta name="description" content="Login"><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}>${renderHead()}</head> <body class="bg-bg-main text-text-main h-screen w-full flex flex-col overflow-hidden"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/layouts/LoginLayout.astro", void 0);

export { $$LoginLayout as $ };
