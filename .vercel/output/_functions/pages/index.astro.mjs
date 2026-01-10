import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, u as unescapeHTML, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_B7r4Bv6B.mjs';
import 'piccolore';
import { g as getUserFromToken, $ as $$Layout } from '../chunks/Layout_BZZLFtxH.mjs';
/* empty css                                 */
import { A as API_URL } from '../chunks/songs_DJyb_bwy.mjs';
import { $ as $$GirdSongs } from '../chunks/GirdSongs_VkIlqEuX.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let songs = [];
  let categories = [];
  let stats = { totalSongs: 0, totalCategories: 0, activeSongs: 0 };
  let error = null;
  const token = Astro2.cookies.get("token")?.value;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const user = getUserFromToken(token);
  try {
    const res = await fetch(`${API_URL}/songs?limit=10`, { headers });
    if (!res.ok) throw new Error("Failed to fetch songs");
    songs = await res.json();
    const catRes = await fetch(`${API_URL}/categories`, { headers });
    if (catRes.ok) {
      categories = await catRes.json();
      if (user?.role === "ADMIN") {
        categories.push({ id: -1, name: "Inactivas" });
      }
    }
    const statsRes = await fetch(`${API_URL}/stats`, { headers });
    if (statsRes.ok) {
      stats = await statsRes.json();
    }
  } catch (e) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = String(e);
      console.error("Error fetching songs:", error);
    }
  }
  const seoTitle = "Cancionero Digital | Letras y Acordes Cristianos";
  const seoDescription = "El mejor cancionero virtual para m\xFAsicos cristianos. Encuentra letras, acordes y herramientas de transposici\xF3n para tu ministerio de alabanza.";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cancionero Digital",
    url: Astro2.url.origin,
    description: seoDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: `${Astro2.url.origin}/search/all?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": seoTitle, "description": seoDescription }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="flex flex-col h-fullbg-bg-main text-text-main"> <main class="flex-1 max-w-6xl mx-auto w-full p-6 md:p-10"> <!-- Dashboard Stats --> <section class="mb-12"> <h1 class="text-3xl font-bold text-accent-main mb-6">
Panel Principal
</h1> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="bg-bg-secondary p-6 rounded-xl flex flex-col items-center justify-center shadow-lg border border-white/5 hover:border-accent-main/30 transition-colors"> <h2 class="text-lg font-medium text-text-secondary mb-2"> ${user?.role === "ADMIN" ? "Total de Canciones" : "Canciones Disponibles"} </h2> <p class="text-4xl font-bold text-accent-main"> ${user?.role === "ADMIN" ? stats.totalSongs : stats.activeSongs ?? stats.totalSongs} </p> </div> <div class="bg-bg-secondary p-6 rounded-xl flex flex-col items-center justify-center shadow-lg border border-white/5 hover:border-accent-main/30 transition-colors"> <h2 class="text-lg font-medium text-text-secondary mb-2">
Categorías
</h2> <p class="text-4xl font-bold text-accent-main"> ${stats.totalCategories} </p> </div> </div> </section> <section> <div class="flex items-center justify-between mb-8"> <h2 class="text-2xl font-bold text-white">
Últimas Agregadas
</h2> <a href="/search/all" class="text-sm font-medium text-accent-main hover:text-white transition-colors">
Ver todas →
</a> </div> <!-- Categorías Quick Filter --> <div class="flex flex-wrap gap-2 mb-8"> <a href="/search/all" class="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-bg-secondary text-text-secondary hover:text-white hover:bg-white/10">
Explorar Todas
</a> ${categories.map((cat) => renderTemplate`<a${addAttribute(
    cat.id === -1 ? `/search/all?active=false` : `/search/all?categoryId=${cat.id}`,
    "href"
  )}${addAttribute(`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat.id === -1 ? "bg-red-900/30 text-red-200 border border-red-500/30 hover:bg-red-900/50" : "bg-bg-secondary text-text-secondary hover:text-white hover:bg-white/10"}`, "class")}> ${cat.name} </a>`)} </div> ${renderComponent($$result2, "GirdSongs", $$GirdSongs, { "songs": songs })} ${(!songs || songs.length === 0) && renderTemplate`<div class="text-center py-20 opacity-50"> <p class="text-xl mb-4">No hay canciones todavía</p> <a href="/add-song" class="text-accent-main hover:underline">
¡Sube la primera!
</a> </div>`} </section> </main> </div> `, "head": async ($$result2) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema))) })}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/index.astro", void 0);

const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
