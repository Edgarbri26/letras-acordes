import { e as createComponent, f as createAstro, m as maybeRenderHead, l as renderScript, r as renderTemplate, h as addAttribute, o as renderSlot, n as renderHead, k as renderComponent } from './astro/server_B7r4Bv6B.mjs';
import 'piccolore';
/* empty css                         */
/* empty css                         */
import 'clsx';
import { $ as $$Footer } from './footer_9vbfV4y8.mjs';

const getUserFromToken = (token) => {
    if (!token) return null;
    try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        return payload;
    } catch (e) {
        console.error("Error parsing token:", e);
        return null;
    }
};

const hasPermission = (user, permission) => {
    if (!user) return false;
    // Admin always has permission (fallback) or if explicitly in list
    if (user.role === 'ADMIN') return true;
    return user.permissions?.includes(permission) || false;
};

const $$Astro$1 = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const token = Astro2.cookies.get("token")?.value;
  const user = getUserFromToken(token);
  const isLoggedIn = !!user;
  const canCreateSong = hasPermission(user, "song.create");
  const canViewAdmin = hasPermission(user, "view.admin");
  return renderTemplate`${maybeRenderHead()}<header class="flex items-center justify-between px-4 py-3 bg-bg-secondary border-b border-white/10 sticky top-0 z-50"> <div class="max-w-6xl w-full mx-auto flex justify-between"> <div class="flex items-center gap-4"> <a href="/" class="text-2xl font-bold text-accent-main tracking-tighter flex items-center"> <!-- Large Logo (Desktop) --> <img src="/large-logo.svg" alt="Logo" class="h-11 w-auto hidden lg:block"> <!-- Medium Logo (Tablet) --> <img src="/medium-logo.svg" alt="Logo" class="h-10 w-auto hidden md:block lg:hidden"> <!-- Small Icon (Mobile) --> <img src="/icono.svg" alt="Logo" class="h-9 w-auto md:hidden"> </a> </div> <div class="flex-1 max-w-xl mx-4"> <div class="relative flex justify-center items-center"> <input class="w-full bg-bg-main border border-white/10 rounded-full py-2 px-4 pl-10 text-text-main focus:outline-none focus:border-accent-main transition-colors" type="search" placeholder="¿Qué quieres tocar y cantar hoy?"> <i class="fa-solid pt-0.5 fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 flex items-center justify-center"></i> </div> </div> <nav class="flex items-center gap-4"> <button id="menu-toggle" class="md:hidden text-text-main hover:text-accent-main transition-colors text-lg" aria-label="Toggle menu"> <i class="fa-solid fa-bars h-6 w-6 flex items-center justify-center"></i> </button> <ul id="menu-list" class="hidden md:flex absolute md:static top-full left-0 w-full md:w-auto flex-col md:flex-row items-center bg-bg-secondary md:bg-transparent border-b md:border-none border-white/10 md:h-9 gap-4 text-sm font-medium text-text-secondary py-4 md:py-0 shadow-lg md:shadow-none z-40"> <li class="hover:text-text-main cursor-pointer transition-colors"> <a href="/misas">Misas</a> </li> ${isLoggedIn && canCreateSong && renderTemplate`<li class="hover:text-text-main cursor-pointer transition-colors"> <a href="/songs/add">Add</a> </li>`} ${isLoggedIn && canViewAdmin && renderTemplate`<li class="hover:text-text-main cursor-pointer transition-colors"> <a href="/admin/users">Admin</a> </li>`} ${isLoggedIn ? renderTemplate`<li class="text-red-400 hover:text-red-300 cursor-pointer font-bold"> <a href="/logout">Cerrar Sesión</a> </li>` : renderTemplate`<li class="text-accent-main hover:text-accent-secondary cursor-pointer font-bold"> <a href="/login">Ingresar</a> </li>`} </ul> </nav> </div> </header> ${renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/letras y acordes/letras-acordes/src/components/Header.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
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
  return renderTemplate`<html lang="es" class="h-full w-full"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="manifest" href="/manifest.webmanifest"><meta name="theme-color" content="#0a0a0a">${renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")}<!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body class="bg-bg-main text-text-main h-full w-full flex flex-col"> ${renderComponent($$result, "Header", $$Header, { "class": "" })} <div class="flex-1 pb-20"> ${renderSlot($$result, $$slots["default"])} </div> <!-- <div class="fixed bottom-0 left-0 w-full z-50"> --> <div class="fixed bottom-0 left-0 w-full z-50"> ${renderComponent($$result, "Footer", $$Footer, {})} </div> <!-- </div> --> </body></html>`;
}, "C:/dev/letras y acordes/letras-acordes/src/layouts/Layout.astro", void 0);

export { $$Layout as $, getUserFromToken as g, hasPermission as h };
