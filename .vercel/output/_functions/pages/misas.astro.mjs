import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_sX7_rjgf.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C6REJ3E8.mjs';
import { g as getMisas } from '../chunks/misas_CRUPEDcZ.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { success, data: misas } = await getMisas();
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const misasVigentes = misas?.filter((m) => new Date(m.dateMisa) >= today) || [];
  const misasPasadas = misas?.filter((m) => new Date(m.dateMisa) < today) || [];
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Misas - CancioneroDigital" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-4xl mx-auto p-4"> <div class="flex justify-between items-center mb-6"> <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
Misas
</h1> <a href="/misas/add" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
+ Nueva Misa
</a> </div> ${misasVigentes.length > 0 && renderTemplate`<section class="mb-8"> <h2 class="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
Próximas Misas
</h2> <div class="grid gap-4"> ${misasVigentes.map((misa) => renderTemplate`<a${addAttribute(`/misas/${misa.id}`, "href")} class="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition border border-gray-200 dark:border-gray-700"> <h3 class="text-xl font-bold mb-2"> ${misa.title} </h3> <p class="text-gray-600 dark:text-gray-400">
📅 ${formatDate(misa.dateMisa)} </p> <p class="text-sm text-gray-500 mt-2"> ${misa.misaSongs.length} canciones
</p> </a>`)} </div> </section>`} ${misasPasadas.length > 0 && renderTemplate`<section> <h2 class="text-2xl font-semibold mb-4 text-gray-500">
Misas Anteriores
</h2> <div class="grid gap-4 opacity-75"> ${misasPasadas.map((misa) => renderTemplate`<a${addAttribute(`/misas/${misa.id}`, "href")} class="block bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800 transition"> <h3 class="text-lg font-bold mb-1"> ${misa.title} </h3> <p class="text-gray-500 dark:text-gray-400 text-sm">
📅 ${formatDate(misa.dateMisa)} </p> </a>`)} </div> </section>`} ${(!misas || misas.length === 0) && renderTemplate`<p class="text-center text-gray-500">
No hay misas registradas.
</p>`} </main> ` })}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/misas/index.astro", void 0);

const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/misas/index.astro";
const $$url = "/misas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
