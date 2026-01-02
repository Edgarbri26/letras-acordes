import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_sX7_rjgf.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header } from '../../chunks/Layout_CgTu8x7F.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const API_URL = "http://localhost:3000/api";
  let misa = null;
  let error = null;
  if (id) {
    try {
      const res = await fetch(`${API_URL}/misas/${id}`);
      if (res.ok) {
        misa = await res.json();
      } else {
        error = "No se encontró la misa.";
      }
    } catch (e) {
      error = "Error de conexión.";
    }
  }
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": misa ? `${misa.title} - CancioneroDigital` : "Misa no encontrada" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="max-w-4xl mx-auto p-4"> ${error ? renderTemplate`<div class="text-center py-10"> <p class="text-red-500 font-bold text-xl">${error}</p> <a href="/misas" class="text-blue-500 hover:underline mt-4 block">
Volver a Misas
</a> </div>` : misa ? renderTemplate`<div> <div class="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4"> <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100"> ${misa.title} </h1> <p class="text-gray-600 dark:text-gray-400 mt-1 capitalize">
📅 ${formatDate(misa.dateMisa)} </p> </div> <div class="space-y-4"> ${misa.misaSongs && misa.misaSongs.length > 0 ? misa.misaSongs.map((ms) => renderTemplate`<div class="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"> <div> <span class="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1"> ${ms.moment?.nombre || "Canción"} </span> <a${addAttribute(`/songs/${ms.song.id}`, "href")} class="text-lg font-medium hover:text-blue-500 transition"> ${ms.song.title} </a> <p class="text-sm text-gray-500"> ${ms.song.artist} </p> </div> <div class="text-right"> <span class="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded"> ${ms.key || ms.song.key} </span> </div> </div>`) : renderTemplate`<p class="text-gray-500 italic">
No hay canciones asignadas a esta misa aún.
</p>`} </div> <div class="mt-8 flex justify-between"> <a href="/misas" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
← Volver al listado
</a>  </div> </div>` : renderTemplate`<div class="text-center py-10"> <p class="text-gray-500">Cargando...</p> </div>`} </main> ` })}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/misas/[id].astro", void 0);
const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/misas/[id].astro";
const $$url = "/misas/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
