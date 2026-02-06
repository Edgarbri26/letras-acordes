import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, u as unescapeHTML, m as maybeRenderHead } from '../chunks/astro/server_D9QA4LpJ.mjs';
import 'piccolore';
import { g as getUserFromToken, $ as $$Layout } from '../chunks/Layout_CBXTDSI8.mjs';
/* empty css                                 */
import { A as API_URL } from '../chunks/songs_BpP3uNMI.mjs';
import { C as CategoryFilter, G as GridSongs } from '../chunks/CategoryFilter_ClGBapBQ.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../renderers.mjs';

function DashboardStats({ isAdmin }) {
  const [stats, setStats] = useState({ totalSongs: 0, totalCategories: 0, activeSongs: 0 });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/stats`);
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  const SkeletonCard = ({ label }) => /* @__PURE__ */ jsxs("div", { className: "bg-bg-secondary p-6 rounded-xl flex flex-col items-center justify-center shadow-lg border border-white/5 h-[140px] animate-pulse", children: [
    /* @__PURE__ */ jsx("div", { className: "h-5 w-32 bg-white/10 rounded mb-4" }),
    /* @__PURE__ */ jsx("div", { className: "h-10 w-16 bg-white/10 rounded" })
  ] });
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsx(SkeletonCard, { label: "Songs" }),
      /* @__PURE__ */ jsx(SkeletonCard, { label: "Categories" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-bg-secondary p-6 rounded-xl flex flex-col items-center justify-center shadow-lg border border-white/5 hover:border-accent-main/30 transition-colors", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-text-secondary mb-2", children: isAdmin ? "Total de Canciones" : "Canciones Disponibles" }),
      /* @__PURE__ */ jsx("p", { className: "text-4xl font-bold text-accent-main", children: isAdmin ? stats.totalSongs : stats.activeSongs ?? stats.totalSongs })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-bg-secondary p-6 rounded-xl flex flex-col items-center justify-center shadow-lg border border-white/5 hover:border-accent-main/30 transition-colors", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-text-secondary mb-2", children: "Categorías" }),
      /* @__PURE__ */ jsx("p", { className: "text-4xl font-bold text-accent-main", children: stats.totalCategories })
    ] })
  ] });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://www.micancionero.online");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  Astro2.response.headers.set(
    "Cache-Control",
    "no-cache, no-store, must-revalidate"
  );
  const token = Astro2.cookies.get("token")?.value;
  const user = getUserFromToken(token);
  const seoTitle = "Cancionero Digital | Letras y Acordes Cat\xF3licos";
  const seoDescription = "Mi canci\xF3nero el mejor cancionero digital para m\xFAsicos cat\xF3licos. Encuentra letras, acordes y herramientas de transposici\xF3n para tu ministerio de m\xFAsica. Ademas crear tus misas con tus canciones favoritas.";
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
</h1> ${renderComponent($$result2, "DashboardStats", DashboardStats, { "client:load": true, "isAdmin": user?.role === "ADMIN", "client:component-hydration": "load", "client:component-path": "@/components/DashboardStats.jsx", "client:component-export": "default" })} </section> <section> <div class="flex items-center justify-between mb-8"> <h2 class="text-2xl font-bold text-white">
Últimas Agregadas
</h2> <a href="/songs/search/all" class="text-sm font-medium text-accent-main hover:text-white transition-colors" data-astro-prefetch>
Ver todas →
</a> </div> ${renderComponent($$result2, "CategoryFilter", CategoryFilter, { "client:load": true, "isAdmin": user?.role === "ADMIN", "client:component-hydration": "load", "client:component-path": "@/components/CategoryFilter.jsx", "client:component-export": "default" })} ${renderComponent($$result2, "GridSongs", GridSongs, { "client:load": true, "endpoint": `${API_URL}/songs?limit=12`, "client:component-hydration": "load", "client:component-path": "@/components/GridSongs.jsx", "client:component-export": "default" })} </section> </main> </div> `, "head": async ($$result2) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema))) })}`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/index.astro", void 0);

const $$file = "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
