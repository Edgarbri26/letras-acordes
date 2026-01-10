import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent, l as renderScript } from '../../../chunks/astro/server_B7r4Bv6B.mjs';
import 'piccolore';
import { g as getUserFromToken, h as hasPermission, $ as $$Layout } from '../../../chunks/Layout_BZZLFtxH.mjs';
import 'clsx';
/* empty css                                       */
import { A as API_URL, u as updateSong } from '../../../chunks/songs_DJyb_bwy.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro$1 = createAstro();
const $$KeySelector = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$KeySelector;
  const {
    id = "key",
    name = "key",
    value = "C",
    class: className = ""
  } = Astro2.props;
  const keys = [
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
  ];
  return renderTemplate`${maybeRenderHead()}<select${addAttribute(id, "id")}${addAttribute(name, "name")}${addAttribute(className, "class")}> ${keys.map((k) => renderTemplate`<option${addAttribute(k, "value")}${addAttribute(k === value, "selected")}> ${k} </option>`)} </select>`;
}, "C:/dev/letras y acordes/letras-acordes/src/components/KeySelector.astro", void 0);

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const token = Astro2.cookies.get("token")?.value;
  const user = getUserFromToken(token);
  if (!token || !user) {
    return Astro2.redirect("/login");
  }
  if (!hasPermission(user, "song.edit")) {
    return Astro2.redirect("/");
  }
  const { id } = Astro2.params;
  let song = null;
  let categories = [];
  try {
    const res = await fetch(`${API_URL}/categories`);
    if (res.ok) {
      categories = await res.json();
    }
  } catch (e) {
    console.error("Error fetching categories:", e);
  }
  try {
    const res = await fetch(`${API_URL}/songs/${id}`);
    if (res.ok) {
      song = await res.json();
    } else {
      return Astro2.redirect("/");
    }
  } catch (e) {
    console.error("Error fetching song:", e);
    return Astro2.redirect("/");
  }
  const canDelete = hasPermission(user, "song.delete");
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const result = await updateSong(Number(id), formData, token);
    if (result.success) {
      return Astro2.redirect(`/songs/${id}`);
    } else {
      result.error || "Error al actualizar la canci\xF3n";
      console.error(result.data);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Editar Canci\xF3n" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col min-h-screen bg-bg-main text-text-main"> <main class="flex-1 max-w-6xl mx-auto w-full p-6 md:p-10"${addAttribute(token, "data-token")}> <h1 class="text-3xl font-bold text-accent-main mb-8">
Editar Canción
</h1> <form class="space-y-8" method="POST"> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <div class="space-y-2"> <label for="artist" class="block text-sm font-medium text-text-secondary">Artista / Banda</label> <input type="text" id="artist" name="artist"${addAttribute(song.artist, "value")} class="w-full bg-bg-secondary border border-white/10 rounded-lg p-3 text-text-main focus:outline-none focus:border-accent-main transition-colors placeholder-white/20"> </div> <div class="space-y-2"> <label for="title" class="block text-sm font-medium text-text-secondary">Nombre de la canción</label> <input type="text" id="title" name="title"${addAttribute(song.title, "value")} class="w-full bg-bg-secondary border border-white/10 rounded-lg p-3 text-text-main focus:outline-none focus:border-accent-main transition-colors placeholder-white/20"> </div> <div class="space-y-2"> <label for="key" class="block text-sm font-medium text-text-secondary">Tono Principal</label> ${renderComponent($$result2, "KeySelector", $$KeySelector, { "id": "key", "name": "key", "value": song.key, "class": "w-full bg-bg-secondary border border-white/10 rounded-lg p-3 text-text-main focus:outline-none focus:border-accent-main transition-colors appearance-none cursor-pointer" })} </div> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <div class="space-y-2"> <label for="url_song" class="block text-sm font-medium text-text-secondary">Link del Video (YouTube)</label> <input type="url" id="url_song" name="url_song"${addAttribute(song.url_song || "", "value")} class="w-full bg-bg-secondary border border-white/10 rounded-lg p-3 text-text-main focus:outline-none focus:border-accent-main transition-colors placeholder-white/20"> </div> <div class="space-y-2"> <label for="categoryId" class="block text-sm font-medium text-text-secondary">Categoría</label> <select id="categoryId" name="categoryId" class="w-full bg-bg-secondary border border-white/10 rounded-lg p-3 text-text-main focus:outline-none focus:border-accent-main transition-colors appearance-none cursor-pointer"> ${categories.map((cat) => renderTemplate`<option${addAttribute(cat.id, "value")}${addAttribute(song.categoryId === cat.id, "selected")}> ${cat.name} </option>`)} </select> </div> <div class="space-y-2"> <label for="active" class="block text-sm font-medium text-text-secondary">Estado</label> <div class="flex items-center space-x-3 bg-bg-secondary border border-white/10 rounded-lg p-3 h-[50px]"> <input type="checkbox" id="active" name="active"${addAttribute(`w-5 h-5 text-accent-main rounded focus:ring-accent-main bg-gray-700 border-gray-600 ${canDelete ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`, "class")}${addAttribute(song.active !== false, "checked")}${addAttribute(!canDelete, "disabled")}> <span${addAttribute(`text-text-main ${canDelete ? "cursor-pointer" : "cursor-not-allowed text-gray-500"}`, "class")}${addAttribute(canDelete ? "document.getElementById('active').click()" : null, "onclick")}>Canción Activa</span> </div> </div> </div> <div class="border-t border-white/10 pt-6 flex flex-col gap-20"> <div class="mb-4"> <h3 class="text-xl font-semibold text-white">
Letra y Acordes
</h3> <p class="text-sm text-text-secondary">
Edita la letra y posición de los acordes.
</p> </div>  ${renderComponent($$result2, "ChordEditor", null, { "client:only": "react", "name": "content", "initialContent": song.content, "initialKey": song.key, "client:component-hydration": "only", "client:component-path": "@/components/ChordEditor.jsx", "client:component-export": "default" })} <div class="pt-4 flex justify-between items-center"> ${canDelete && renderTemplate`<button type="button" id="deleteSongBtn"${addAttribute(song.id, "data-song-id")} class="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 font-bold py-3 px-8 rounded-lg transition-colors">
Eliminar Canción
</button>`} ${!canDelete && renderTemplate`<div></div>`}  <button type="submit" class="bg-accent-main hover:bg-accent-main/90 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-accent-main/20">
Guardar Cambios
</button> </div> </div> </form> </main> </div> ` })} ${renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/pages/songs/edit/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/songs/edit/[id].astro", void 0);

const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/songs/edit/[id].astro";
const $$url = "/songs/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
