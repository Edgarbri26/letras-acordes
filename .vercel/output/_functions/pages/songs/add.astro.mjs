import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, l as renderScript } from '../../chunks/astro/server_D9QA4LpJ.mjs';
import 'piccolore';
import { g as getUserFromToken, h as hasPermission, $ as $$Layout } from '../../chunks/Layout_CBXTDSI8.mjs';
/* empty css                                    */
import { A as API_URL, c as createSong } from '../../chunks/songs_BpP3uNMI.mjs';
import { $ as $$AiAutocompleteButton } from '../../chunks/AiAutocompleteButton_DorEvqQ3.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://www.micancionero.online");
const $$Add = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Add;
  const token = Astro2.cookies.get("token")?.value;
  const user = getUserFromToken(token);
  if (!token || !user) {
    return Astro2.redirect("/login");
  }
  if (!hasPermission(user, "song.create")) {
    return Astro2.redirect("/");
  }
  let categories = [];
  try {
    const res = await fetch(`${API_URL}/categories`);
    if (res.ok) {
      categories = await res.json();
    }
  } catch (e) {
    console.error("Error fetching categories:", e);
  }
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const result = await createSong(formData, token);
    if (result.success) {
      return Astro2.redirect(`/songs/${result.data.id}`);
    } else {
      errorMessage = result.error || "Error desconocido";
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Subir Canci\xF3n" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col h-full bg-bg-main text-text-main"> <main class="flex-1 max-w-6xl mx-auto w-full p-6 md:p-10"> <h1 class="text-3xl font-bold text-accent-main mb-8">
Enviar Cifrado
</h1> ${ void 0} <form class="space-y-8" method="POST">  <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <div class="space-y-2"> <label for="artist" class="block text-sm font-medium text-text-secondary">Artista / Banda</label> <input type="text" id="artist" name="artist" class="w-full bg-bg-secondary border border-white/10 rounded-lg p-3 text-text-main focus:outline-none focus:border-accent-main transition-colors placeholder-white/20" placeholder="Ej. Cindy Barrera"> </div> <div class="space-y-2"> <label for="title" class="block text-sm font-medium text-text-secondary">Nombre de la canción</label> <input type="text" id="title" name="title" class="w-full bg-bg-secondary border border-white/10 rounded-lg p-3 text-text-main focus:outline-none focus:border-accent-main transition-colors placeholder-white/20" placeholder="Ej. Dios está aquí" required> </div> <div class="space-y-2"> <label for="key" class="block text-sm font-medium text-text-secondary">Tono Principal</label> <select id="key" name="key" class="w-full bg-bg-secondary border border-white/10 rounded-lg p-3 text-text-main focus:outline-none focus:border-accent-main transition-colors appearance-none cursor-pointer"> ${[
    "C",
    "Cm",
    "C#",
    "C#m",
    "D",
    "Dm",
    "D#",
    "D#m",
    "E",
    "Em",
    "F",
    "Fm",
    "F#",
    "F#m",
    "G",
    "Gm",
    "G#",
    "G#m",
    "A",
    "Am",
    "A#",
    "A#m",
    "B",
    "Bm"
  ].map((k) => renderTemplate`<option${addAttribute(k, "value")}>${k}</option>`)} </select> </div> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="space-y-2"> <label for="url_song" class="block text-sm font-medium text-text-secondary">Link del Video (YouTube)</label> <input type="url" id="url_song" name="url_song" class="w-full bg-bg-secondary border border-white/10 rounded-lg p-3 text-text-main focus:outline-none focus:border-accent-main transition-colors placeholder-white/20" placeholder="https://youtube.com/..."> </div> <div class="space-y-2"> <div class="flex justify-between items-center"> <label for="categoryId" class="block text-sm font-medium text-text-secondary">Categoría</label> <button type="button" id="btn-new-category" class="text-xs text-accent-main hover:text-white underline transition-colors">
+ Nueva Categoría
</button> </div> <select id="categoryId" name="categoryId" class="w-full bg-bg-secondary border border-white/10 rounded-lg p-3 text-text-main focus:outline-none focus:border-accent-main transition-colors appearance-none cursor-pointer"> ${categories.map((cat) => renderTemplate`<option${addAttribute(cat.id, "value")}>${cat.name}</option>`)} </select> </div> </div> <div class="border-t border-white/10 pt-6"> <div class="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"> <div> <h3 class="text-xl font-semibold text-white">
Letra y Acordes
</h3> <p class="text-sm text-text-secondary">
Escribe la letra y usa los botones para insertar
                                los acordes en la posición exacta.
</p> </div> <div class="flex flex-col sm:flex-row gap-2"> <button type="button" id="btn-ai-search-song" title="Autocompletar canción original por fragmento de letra" class="flex items-center gap-2 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-bold py-2 px-4 rounded-full shadow-md transition-all transform hover:scale-105"> <span>🔍</span> Autocompletar canción
</button> ${renderComponent($$result2, "AiAutocompleteButton", $$AiAutocompleteButton, { "token": token, "apiUrl": API_URL, "class": "flex items-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-full shadow-md transition-all transform hover:scale-105", "showIconOnly": false })} </div> </div>   ${renderComponent($$result2, "ChordEditor", null, { "client:only": "react", "name": "content", "client:component-hydration": "only", "client:component-path": "@/components/ChordEditor.jsx", "client:component-export": "default" })} </div> <div class="flex justify-end pt-4"> <button type="submit" class="bg-accent-main hover:bg-accent-main/90 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-accent-main/20">
Guardar Canción
</button> </div> </form> </main> </div> <dialog id="modal-category" class="bg-bg-secondary text-text-main border border-white/10 rounded-lg p-6 backdrop:backdrop-blur-sm shadow-xl w-full max-w-sm m-auto"> <form method="dialog" class="space-y-4"> <h3 class="text-lg font-bold">Nueva Categoría</h3> <div class="space-y-2"> <label for="new-cat-name" class="text-sm text-text-secondary">Nombre</label> <input type="text" id="new-cat-name" class="w-full bg-bg-main border border-white/10 rounded p-2 focus:border-accent-main focus:outline-none" placeholder="Ej. Adoración"> </div> <div class="flex justify-end gap-2 pt-2"> <button value="cancel" class="px-4 py-2 text-sm text-text-secondary hover:text-white transition-colors">Cancelar</button> <button id="btn-save-category" type="button" class="px-4 py-2 text-sm bg-accent-main text-white rounded hover:bg-accent-main/90 transition-colors">Guardar</button> </div> </form> </dialog> <div id="add-song-data"${addAttribute(API_URL, "data-api-url")}${addAttribute(errorMessage, "data-error-message")}${addAttribute(token, "data-token")} class="hidden"></div> ${renderScript($$result2, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/songs/add.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/songs/add.astro", void 0);

const $$file = "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/songs/add.astro";
const $$url = "/songs/add";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Add,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
