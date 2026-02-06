import { e as createAstro, f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_D9QA4LpJ.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_CBXTDSI8.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://www.micancionero.online");
const $$Add = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Add;
  const token = Astro2.cookies.get("token")?.value;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Nueva Misa - CancioneroDigital" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-2xl mx-auto p-4"> <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
Crear Nueva Misa
</h1> <form id="addMisaForm" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4"${addAttribute(token, "data-token")}> <div> <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Título / Ocasión</label> <input type="text" id="title" name="title" required placeholder="Ej. Misa de Domingo, Jueves Santo..." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 border"> </div> <div> <label for="dateMisa" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha</label> <input type="date" id="dateMisa" name="dateMisa" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 border dark:[&::-webkit-calendar-picker-indicator]:invert"> </div> <div> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Visibilidad</label> <select name="visibility" id="visibility" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 border"> <option value="PUBLIC">Pública</option> <option value="PRIVATE" selected>Privada (Solo tú y enlace)</option> </select> </div> <div class="flex justify-end pt-4"> <a href="/misas" class="mr-4 px-4 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">Cancelar</a> <button type="submit" class="bg-accent-main hover:saturate-200 text-white font-bold py-2 px-4 rounded shadow transition">
Crear Misa
</button> </div> </form> </main> ` })} ${renderScript($$result, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/misas/add.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/misas/add.astro", void 0);

const $$file = "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/misas/add.astro";
const $$url = "/misas/add";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Add,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
