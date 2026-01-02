import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_sX7_rjgf.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_C6REJ3E8.mjs';
export { renderers } from '../../renderers.mjs';

const $$Add = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Nueva Misa - CancioneroDigital" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-2xl mx-auto p-4"> <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
Crear Nueva Misa
</h1> <form id="addMisaForm" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4"> <div> <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Título / Ocasión</label> <input type="text" id="title" name="title" required placeholder="Ej. Misa de Domingo, Jueves Santo..." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 border"> </div> <div> <label for="dateMisa" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha</label> <input type="date" id="dateMisa" name="dateMisa" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 border"> </div> <div class="flex justify-end pt-4"> <a href="/misas" class="mr-4 px-4 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">Cancelar</a> <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow transition">
Crear Misa
</button> </div> </form> </main> ` })} ${renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/pages/misas/add.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/misas/add.astro", void 0);

const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/misas/add.astro";
const $$url = "/misas/add";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Add,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
