import { e as createComponent, f as createAstro, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_B7r4Bv6B.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_D7Zf6s_Q.mjs';
import { A as API_URL } from '../../chunks/songs_DJyb_bwy.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Songs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Songs;
  const token = Astro2.cookies.get("token")?.value;
  if (!token) {
    return Astro2.redirect("/login");
  }
  let songs = [];
  let error = null;
  try {
    const res = await fetch(`${API_URL}/songs?active=all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      songs = await res.json();
    } else {
      throw new Error("Error cargando canciones");
    }
  } catch (e) {
    console.error(e);
    error = "No se pudieron cargar las canciones";
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Gesti\xF3n de Canciones" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="songs-page" class="p-6"${addAttribute(API_URL, "data-api-url")}${addAttribute(token, "data-token")}> <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"> <h1 class="text-3xl font-bold text-accent-main">
Gestión de Canciones
</h1> <div class="flex gap-4 items-center"> <select id="statusFilter" class="bg-bg-secondary border border-white/10 rounded-lg px-4 py-2 text-text-main focus:outline-none focus:border-accent-main cursor-pointer"> <option value="all">Todas</option> <option value="true">Activas</option> <option value="false">Inactivas</option> </select> <a href="/add-song" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center gap-2"> <i class="fa-solid fa-plus-circle"></i>
Nueva Canción
</a> </div> </div> ${error && renderTemplate`<div class="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded mb-6"> ${error} </div>`} <div class="overflow-x-auto bg-bg-secondary rounded-lg border border-white/10"> <table class="w-full text-left text-sm text-text-main"> <thead class="bg-bg-main text-text-secondary uppercase"> <tr> <th class="px-6 py-3 border-b border-white/10">ID</th> <th class="px-6 py-3 border-b border-white/10">Título</th> <th class="px-6 py-3 border-b border-white/10">Artista</th> <th class="px-6 py-3 border-b border-white/10 text-center">Estado</th> <th class="px-6 py-3 border-b border-white/10 text-center">Acciones</th> </tr> </thead> <tbody class="divide-y divide-white/10"> ${songs.map((song) => renderTemplate`<tr class="hover:bg-white/5 transition-colors song-row"${addAttribute(song.active.toString(), "data-active")}> <td class="px-6 py-4">${song.id}</td> <td class="px-6 py-4 font-medium"> ${song.title} </td> <td class="px-6 py-4 text-text-secondary"> ${song.artist} </td> <td class="px-6 py-4 text-center"> <label class="relative inline-flex items-center cursor-pointer"> <input type="checkbox" class="sr-only peer toggle-active" value=""${addAttribute(song.active, "checked")}${addAttribute(song.id, "data-id")}> <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-main/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-main"></div> <span class="ml-3 text-sm font-medium text-gray-300"> ${song.active ? "Activo" : "Inactivo"} </span> </label> </td> <td class="px-6 py-4 text-center"> <div class="flex items-center justify-center gap-3"> <a${addAttribute(`/edit-song/${song.id}`, "href")} class="text-blue-400 hover:text-blue-300 transition-colors" title="Editar"> <i class="fa-solid fa-pen-to-square h-5 w-5"></i> </a> <button class="text-red-400 hover:text-red-300 transition-colors delete-song-btn"${addAttribute(song.id, "data-id")} title="Eliminar permanentemente"> <i class="fa-solid fa-trash h-5 w-5"></i> </button> </div> </td> </tr>`)} </tbody> </table> </div> </div> ` })} ${renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/pages/admin/songs.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/admin/songs.astro", void 0);

const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/admin/songs.astro";
const $$url = "/admin/songs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Songs,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
