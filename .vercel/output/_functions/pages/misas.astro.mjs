import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D9QA4LpJ.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_CBXTDSI8.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { g as getMisas } from '../chunks/misas_BYGTqToH.mjs';
import { jwtDecode } from 'jwt-decode';
export { renderers } from '../renderers.mjs';

const MisaCardSkeleton = () => {
  return /* @__PURE__ */ jsxs("div", { className: "block bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 animate-pulse", children: [
    /* @__PURE__ */ jsx("div", { className: "h-7 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ jsx("div", { className: "h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full" }),
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-3" })
  ] });
};

const MisaListReact = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [misas, setMisas] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showAllPasadas, setShowAllPasadas] = useState(false);
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id || decoded.sub);
      } catch (e) {
        console.error("Error decoding token:", e);
      }
    }
    const fetchMisas = async () => {
      try {
        const { success, data } = await getMisas(token);
        if (success && data) {
          setMisas(data);
        }
      } catch (error) {
        console.error("Error fetching misas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMisas();
  }, [token]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (dateString.length === 10) {
      return (/* @__PURE__ */ new Date(dateString + "T00:00:00")).toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
      // Force UTC if we assume the server sends UTC midnight for "dates"
    });
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsx(MisaCardSkeleton, {}, i)) });
  }
  if (!loading && misas.length === 0) {
    return /* @__PURE__ */ jsxs("section", { className: "flex flex-col items-center justify-center h-full gap-3.5 min-h-[50vh]", children: [
      /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "No hay misas registradas." }),
      !token && /* @__PURE__ */ jsxs("p", { className: "text-center text-gray-500", children: [
        "Inicia sesión para registrar misas.",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/login",
            className: "text-blue-600 hover:text-blue-700 ml-1",
            children: "Iniciar Sesión"
          }
        )
      ] })
    ] });
  }
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const myMisas = misas.filter((m) => m.userId === userId);
  const otherPublicMisas = misas.filter((m) => m.userId !== userId && m.visibility === "PUBLIC");
  const sortMisas = (list) => {
    return list.sort((a, b) => new Date(a.dateMisa) - new Date(b.dateMisa));
  };
  const myMisasVigentes = sortMisas(myMisas.filter((m) => new Date(m.dateMisa) >= today));
  const allMyMisasPasadas = sortMisas(myMisas.filter((m) => new Date(m.dateMisa) < today)).reverse();
  const myMisasPasadas = showAllPasadas ? allMyMisasPasadas : allMyMisasPasadas.slice(0, 6);
  const publicMisasVigentes = sortMisas(otherPublicMisas.filter((m) => new Date(m.dateMisa) >= today));
  const renderMisaCard = (misa) => /* @__PURE__ */ jsxs(
    "a",
    {
      href: `/misas/${misa.id}`,
      className: "block bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition border border-gray-200 dark:border-gray-700 relative overflow-hidden group",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-2", children: misa.visibility === "PUBLIC" ? /* @__PURE__ */ jsx("span", { className: "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-accent-main ring-1 ring-inset ring-accent-main/20 dark:bg-accent-main/30 dark:text-accent-main", children: "Pública" }) : /* @__PURE__ */ jsx("span", { className: "inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700", children: "Privada" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2 pr-12 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: misa.title }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-600 dark:text-gray-400 mb-1", children: [
          "📅 ",
          formatDate(misa.dateMisa)
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-3", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
            misa.misaSongs.length,
            " canciones"
          ] }),
          misa.user && misa.userId !== userId && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400", children: [
            "Por: ",
            misa.user.name
          ] })
        ] })
      ]
    },
    misa.id
  );
  return /* @__PURE__ */ jsxs("div", { className: "space-y-12", children: [
    (myMisasVigentes.length > 0 || allMyMisasPasadas.length > 0) && /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2", children: "Mis Misas" }),
      myMisasVigentes.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-4 text-accent-main dark:text-accent-main flex items-center gap-2", children: "Próximas" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: myMisasVigentes.map(renderMisaCard) })
      ] }),
      allMyMisasPasadas.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-gray-500 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { children: "history" }),
            " Anteriores"
          ] }),
          !showAllPasadas && allMyMisasPasadas.length > 6 && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShowAllPasadas(true),
              className: "text-accent-main hover:text-accent-main text-sm font-medium hover:underline",
              children: "Ver todas →"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-4 opacity-80 hover:opacity-100 transition-opacity sm:grid-cols-2 lg:grid-cols-3", children: myMisasPasadas.map(renderMisaCard) }),
        showAllPasadas && /* @__PURE__ */ jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowAllPasadas(false),
            className: "text-gray-500 hover:text-gray-700 text-sm hover:underline",
            children: "Ver menos"
          }
        ) })
      ] })
    ] }),
    publicMisasVigentes.length > 0 && /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2", children: "Misas Públicas" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: publicMisasVigentes.map(renderMisaCard) })
    ] }),
    !token && publicMisasVigentes.length > 0 && /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100", children: "Próximas Misas Públicas" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: publicMisasVigentes.map(renderMisaCard) })
    ] })
  ] });
};

const $$Astro = createAstro("https://www.micancionero.online");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const token = Astro2.cookies.get("token")?.value;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Misas - CancioneroDigital" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-4xl mx-auto p-4 h-full"> <div class="flex justify-between items-center mb-6"> <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
Misas
</h1> ${token && renderTemplate`<a href="/misas/add" class="bg-accent-main hover:bg-accent-main/80 text-white font-bold py-2 px-4 rounded transition">
+ Nueva Misa
</a>`} </div> ${renderComponent($$result2, "MisaListReact", MisaListReact, { "client:load": true, "token": token, "client:component-hydration": "load", "client:component-path": "@/components/MisaListReact", "client:component-export": "default" })} </main> ` })}`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/misas/index.astro", void 0);

const $$file = "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/misas/index.astro";
const $$url = "/misas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
