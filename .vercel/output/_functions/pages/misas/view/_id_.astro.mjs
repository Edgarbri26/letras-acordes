import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript, h as addAttribute } from '../../../chunks/astro/server_B7r4Bv6B.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../../chunks/Layout_BZZLFtxH.mjs';
import { g as getMoments } from '../../../chunks/moments_BxgwvJ7z.mjs';
import { S as SongView } from '../../../chunks/SongView_D0hFWCCT.mjs';
import { $ as $$HeaderLyric } from '../../../chunks/HeaderLyric_BeC7SC-G.mjs';
import { A as API_URL } from '../../../chunks/songs_DJyb_bwy.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  let misa = null;
  let error = null;
  let moments = [];
  let token = Astro2.cookies.get("token")?.value;
  if (id) {
    try {
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const url = new URL(`${API_URL}/misas/${id}`);
      const shareToken = Astro2.url.searchParams.get("share_token");
      if (shareToken) url.searchParams.append("share_token", shareToken);
      const [misaRes, momentsRes] = await Promise.all([
        fetch(url.toString(), { headers }),
        getMoments()
      ]);
      if (misaRes.ok) {
        misa = await misaRes.json();
      } else {
        error = "No se encontr\xF3 la misa.";
      }
      if (momentsRes.success && momentsRes.data) {
        moments = momentsRes.data;
      }
    } catch (e) {
      error = "Error de conexi\xF3n.";
      console.error(e);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": misa ? `${misa.title} - Modo Lectura` : "Error" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="print-header"> <img src="/icono-light.svg" alt="Cancionero Digital" class="print-logo"> <div> <h1 class="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-accent-main to-accent-light"> ${misa?.title} </h1> <p class="text-gray-500 text-sm">Generado por Cancionero Digital</p> </div> </div> <div class="max-w-3xl mx-auto px-4 py-8"> ${error ? renderTemplate`<div class="text-center"> <h1 class="text-2xl font-bold text-red-500 mb-4"> ${error} </h1> <a href="/misas" class="text-accent-main hover:underline">
Volver a Misas
</a> </div>` : renderTemplate`<main> <header class="mb-8 border-b border-white/10 pb-4 flex md:flex-row flex-col justify-between md:items-start items-center"> <div class="md:text-start text-center"> <h1 class="text-3xl font-bold text-text-main"> ${misa?.title} </h1> <p class="text-text-secondary  mt-1">
Modo Lectura
</p> </div> <div class="flex gap-2"> <button id="toggleChordsBtn" class="text-sm bg-bg-secondary text-text-main px-4 py-2 rounded hover:bg-white/10 transition-colors flex items-center gap-2"> <i class="fa-solid fa-music"></i>
Acordes
</button> <button id="printBtn" class="text-sm bg-accent-main text-white px-4 py-2 rounded hover:bg-accent-secondary transition-colors flex items-center gap-2"> <i class="fa-solid fa-print"></i>
Descargar / Imprimir
</button> <a${addAttribute(`/misas/${id}${Astro2.url.search}`, "href")} class="text-sm bg-bg-secondary px-4 py-2 rounded hover:bg-white/10 transition-colors flex items-center gap-2"> <i class="fa-solid fa-arrow-left"></i>
Volver a Edición
</a> </div> </header> <div class="space-y-16"> ${moments.map((moment) => {
    const momentSongs = misa?.misaSongs.filter(
      (ms) => ms.momentId === moment.id
    );
    if (momentSongs?.length === 0) return null;
    return renderTemplate`<section> <h2 class="text-xl font-bold text-accent-main mb-6 uppercase tracking-wider border-l-4 border-accent-main pl-3"> ${moment.nombre} </h2> <div class="space-y-12"> ${momentSongs?.map((ms) => renderTemplate`<article class="bg-bg-secondary/30 rounded-xl p-6 border border-white/5"> <div class="mb-4"> ${renderComponent($$result2, "HeaderLyric", $$HeaderLyric, { "title": ms.song.title, "artist": ms.song.artist, "tone": ms.key || ms.song.key })} </div> ${renderComponent($$result2, "SongView", SongView, { "client:visible": true, "initialContent": ms.song.content, "initialKey": ms.key || ms.song.key, "originalKey": ms.song.key, "client:component-hydration": "visible", "client:component-path": "C:/dev/letras y acordes/letras-acordes/src/components/SongView.jsx", "client:component-export": "default" })} </article>`)} </div> </section>`;
  })} </div> </main>`} </div> ${renderScript($$result2, "C:/dev/letras y acordes/letras-acordes/src/pages/misas/view/[id].astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/misas/view/[id].astro", void 0);

const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/misas/view/[id].astro";
const $$url = "/misas/view/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
