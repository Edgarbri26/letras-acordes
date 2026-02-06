import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, l as renderScript, q as renderTransition, r as renderTemplate, k as renderComponent } from '../../../chunks/astro/server_D9QA4LpJ.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../../chunks/Layout_CBXTDSI8.mjs';
import { g as getMoments } from '../../../chunks/moments_BA0iSjGS.mjs';
import { S as SongView } from '../../../chunks/SongView_BiqVkwpk.mjs';
import 'clsx';
/* empty css                                      */
import { A as API_URL } from '../../../chunks/songs_BpP3uNMI.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro$1 = createAstro("https://www.micancionero.online");
const $$HeaderLyric = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$HeaderLyric;
  const {
    title = "T\xEDtulo Desconocido",
    artist = "Artista Desconocido",
    tone = "C",
    category,
    url_song = "",
    user,
    id
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="mb-8"> <h1 class="text-4xl font-extrabold text-text-main mb-1"${addAttribute(renderTransition($$result, "2ul2ctwt", "", `song title ${id}`), "data-astro-transition-scope")}> ${title} </h1> <h2 class="text-xl text-accent-main font-medium"> <span class="text-text-secondary">Autor:</span> <span${addAttribute(renderTransition($$result, "ovqpzghw", "", `song artist ${id}`), "data-astro-transition-scope")}>${artist}</span> </h2> <div class="flex flex-col sm:flex-row sm:justify-start justify-between gap-4 mt-4 text-sm text-text-secondary"> <div class="flex items-center justify-start gap-2"> <span class="bg-bg-secondary px-3 py-1 rounded-full border border-white/10"${addAttribute(renderTransition($$result, "pwfu27ov", "", `song tone ${id}`), "data-astro-transition-scope")}>
Ton: <span id="header-tone" class="text-accent-main font-bold">${tone}</span> </span> <a${addAttribute(`/search/all?categoryId=${category?.id}`, "href")} target="_blank"> <span class="cursor-pointer hover:underline bg-bg-secondary px-3 py-1 rounded-full border border-white/10 text-accent-main/90 font-bold"${addAttribute(renderTransition($$result, "ftgjo2tb", "", `song category ${id}`), "data-astro-transition-scope")}>
category?.name
</span> </a> </div> ${user && renderTemplate`<span class="text-sm text-text-secondary/80 sm:ml-auto ml-0">
Creado por: ${user.name} </span>`} </div> </header> ${renderScript($$result, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/components/HeaderLyric.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/components/HeaderLyric.astro", "self");

const $$Astro = createAstro("https://www.micancionero.online");
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
    return renderTemplate`<section> <h2 class="text-xl font-bold text-accent-main mb-6 uppercase tracking-wider border-l-4 border-accent-main pl-3"> ${moment.nombre} </h2> <div class="space-y-12"> ${momentSongs?.map((ms) => renderTemplate`<article class="bg-bg-secondary/30 rounded-xl p-6 border border-white/5"> <div class="mb-4"> ${renderComponent($$result2, "HeaderLyric", $$HeaderLyric, { "title": ms.song.title, "artist": ms.song.artist, "tone": ms.key || ms.song.key })} </div> ${renderComponent($$result2, "SongView", SongView, { "client:load": true, "initialContent": ms.song.content, "initialKey": ms.key || ms.song.key, "originalKey": ms.song.key, "initialShowChords": false, "client:component-hydration": "load", "client:component-path": "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/components/SongView.jsx", "client:component-export": "default" })} </article>`)} </div> </section>`;
  })} </div> </main>`} </div> ${renderScript($$result2, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/misas/view/[id].astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/misas/view/[id].astro", void 0);

const $$file = "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/misas/view/[id].astro";
const $$url = "/misas/view/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
