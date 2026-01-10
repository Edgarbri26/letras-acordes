import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, l as renderScript, r as renderTemplate, k as renderComponent, u as unescapeHTML } from '../../chunks/astro/server_B7r4Bv6B.mjs';
import 'piccolore';
import { g as getUserFromToken, h as hasPermission, $ as $$Layout } from '../../chunks/Layout_BZZLFtxH.mjs';
import { $ as $$HeaderLyric } from '../../chunks/HeaderLyric_BeC7SC-G.mjs';
import { S as SongView } from '../../chunks/SongView_D0hFWCCT.mjs';
import 'clsx';
/* empty css                                    */
import { A as API_URL } from '../../chunks/songs_DJyb_bwy.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$2 = createAstro();
const $$SongTools = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SongTools;
  const { id } = Astro2.props;
  const token = Astro2.cookies.get("token")?.value;
  const user = getUserFromToken(token);
  const canEditSong = hasPermission(user, "song.edit");
  return renderTemplate`${maybeRenderHead()}<aside class="w-16 flex flex-col items-center py-4 gap-4 sticky top-16 h-[calc(100vh-4rem)] border-r border-white/5 md:flex no-print"> <a${addAttribute(`/`, "href")} class="p-2 text-text-secondary hover:text-accent-main transition" title="Volver"> <i class="fa-solid fa-arrow-left"></i> </a>  <div class="flex flex-col gap-1 items-center"> <button id="btn-transpose-up" class="p-2 text-text-secondary hover:text-accent-main transition font-bold" title="Subir Tono"> <i class="fa-solid fa-plus w-5 h-5 flex items-center justify-center"></i> </button> <span class="text-xs text-text-secondary">Tono</span> <button id="btn-transpose-down" class="p-2 text-text-secondary hover:text-accent-main transition font-bold" title="Bajar Tono"> <i class="fa-solid fa-minus w-5 h-5 flex items-center justify-center"></i> </button> </div> <div class="h-px w-8 bg-white/10 my-1"></div> <button id="btn-toggle-chords" class="p-2 text-text-secondary hover:text-accent-main transition flex flex-col items-center gap-1" title="Alternar Acordes"> <i class="fa-solid fa-music w-5 h-5 flex items-center justify-center"></i> <span class="text-[10px]">Acordes</span> </button> <div class="h-px w-8 bg-white/10 my-1"></div> <button id="btn-print" class="p-2 text-text-secondary hover:text-accent-main transition" title="Imprimir"> <i class="fa-solid fa-print w-5 h-5 flex items-center justify-center"></i> </button> ${canEditSong && renderTemplate`<a${addAttribute(`/songs/edit/${id}`, "href")} class="p-2 text-text-secondary hover:text-accent-main transition flex flex-col items-center gap-1" title="Editar"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"> <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path> <path d="m15 5 4 4"></path> </svg> </a>`} </aside> ${renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/components/SongTools.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/letras y acordes/letras-acordes/src/components/SongTools.astro", void 0);

const $$Astro$1 = createAstro();
const $$YouTubePlayer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$YouTubePlayer;
  const { url } = Astro2.props;
  const getYouTubeId = (url2) => {
    if (!url2) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url2.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  const videoId = getYouTubeId(url);
  return renderTemplate`${videoId && renderTemplate`${maybeRenderHead()}<div class="sticky top-20 rounded-xl overflow-hidden shadow-2xl bg-black aspect-video"><iframe width="100%" height="100%"${addAttribute(`https://www.youtube.com/embed/${videoId}`, "src")} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`}`;
}, "C:/dev/letras y acordes/letras-acordes/src/components/YouTubePlayer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  let song = null;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/");
  }
  try {
    const res = await fetch(`${API_URL}/songs/${id}`);
    if (!res.ok) {
      if (res.status === 404) return Astro2.redirect("/");
      throw new Error("Failed to fetch song");
    }
    song = await res.json();
  } catch (e) {
    console.error("Error fetching song:", e);
    return Astro2.redirect("/");
  }
  const toneParam = Astro2.url.searchParams.get("tone");
  const displayTone = toneParam || song?.key;
  const seoTitle = `${song?.title} - ${song?.artist} | Letra y Acordes`;
  const seoDescription = `Letra, acordes y m\xFAsica de ${song?.title} por ${song?.artist}. Aprende a tocar esta canci\xF3n con nuestras tablaturas y herramientas de transposici\xF3n.`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "MusicComposition",
    name: song?.title,
    composer: {
      "@type": "Person",
      name: song?.artist
    },
    lyricist: {
      "@type": "Person",
      name: song?.artist
    },
    inLanguage: "es",
    category: song?.category?.name
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": seoTitle, "description": seoDescription }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="print-header flex items-center gap-4 mb-2 pb-2 border-b border-gray-300"> <img src="/icono-light.svg" alt="Cancionero Digital" class="w-10 h-10"> <div class="flex-1"> <h1 class="text-3xl font-bold text-black leading-tight"> ${song?.title} </h1> <p class="text-gray-600 text-sm">${song?.artist}</p> </div> <div class="text-right"> <p class="text-gray-400 text-xs">Cancionero Digital</p> </div> </div> <div class="flex flex-col h-full bg-bg-main text-text-main print:bg-white print:text-black"> <div class="flex flex-1 max-w-[1400px] mx-auto w-full print:block"> ${renderComponent($$result2, "SongTools", $$SongTools, { "id": id })} <main class="flex-1 p-6 md:p-10 min-w-0 print:px-8 print:py-0"> ${renderComponent($$result2, "HeaderLyric", $$HeaderLyric, { "title": song?.title, "artist": song?.artist, "tone": displayTone, "category": song?.category, "user": song?.user })} <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start print:block"> <div class="lg:col-span-2 print:w-full"> ${renderComponent($$result2, "SongView", SongView, { "client:load": true, "initialContent": song?.content, "initialKey": displayTone, "originalKey": song?.key, "client:component-hydration": "load", "client:component-path": "@/components/SongView.jsx", "client:component-export": "default" })} </div> <div class="lg:col-span-1 no-print"> ${renderComponent($$result2, "YouTubePlayer", $$YouTubePlayer, { "url": song?.url_song })} </div> </div> </main> </div> </div> `, "head": async ($$result2) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema))) })}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/songs/[id].astro", void 0);

const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/songs/[id].astro";
const $$url = "/songs/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
