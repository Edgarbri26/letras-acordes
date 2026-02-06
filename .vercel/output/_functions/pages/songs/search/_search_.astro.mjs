import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_D9QA4LpJ.mjs';
import 'piccolore';
import { g as getUserFromToken, $ as $$Layout } from '../../../chunks/Layout_CBXTDSI8.mjs';
import { A as API_URL } from '../../../chunks/songs_BpP3uNMI.mjs';
import { C as CategoryFilter, G as GridSongs } from '../../../chunks/CategoryFilter_ClGBapBQ.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://www.micancionero.online");
const $$search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$search;
  const { search } = Astro2.params;
  const decodedSearch = search ? decodeURIComponent(search) : "";
  const token = Astro2.cookies.get("token")?.value;
  const user = getUserFromToken(token);
  const params = new URLSearchParams();
  if (decodedSearch && decodedSearch !== "all") {
    params.append("q", decodedSearch);
  }
  const currentCategoryId = Astro2.url.searchParams.get("categoryId");
  if (currentCategoryId) {
    params.append("categoryId", currentCategoryId);
  }
  const activeParam = Astro2.url.searchParams.get("active");
  if (activeParam) {
    params.append("active", activeParam);
  }
  const endpoint = `${API_URL}/songs?${params.toString()}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `CancioneroDigital - Buscando: ${decodedSearch}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col min-h-screen bg-bg-main text-text-main"> <main class="flex-1 max-w-6xl mx-auto w-full p-6 md:p-10"> <h1 class="text-3xl font-bold text-accent-main mb-8"> ${decodedSearch === "all" ? "Todas las canciones" : `Resultados para: "${decodedSearch}"`} </h1> ${renderComponent($$result2, "CategoryFilter", CategoryFilter, { "client:load": true, "isAdmin": user?.role === "ADMIN", "client:component-hydration": "load", "client:component-path": "@/components/CategoryFilter", "client:component-export": "default" })} <div class="mt-4"> ${renderComponent($$result2, "GridSongs", GridSongs, { "client:load": true, "endpoint": endpoint, "client:component-hydration": "load", "client:component-path": "@/components/GridSongs", "client:component-export": "default" })} </div> </main> </div> ` })}`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/songs/search/[search].astro", void 0);

const $$file = "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/songs/search/[search].astro";
const $$url = "/songs/search/[search]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$search,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
