import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, l as renderScript, r as renderTemplate } from './astro/server_B7r4Bv6B.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro();
const $$HeaderLyric = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeaderLyric;
  const {
    title = "T\xEDtulo Desconocido",
    artist = "Artista Desconocido",
    tone = "C",
    category,
    url_song = "",
    user
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="mb-8"> <h1 class="text-4xl font-extrabold text-text-main mb-1">${title}</h1> <h2 class="text-xl text-accent-main font-medium"> <span class="text-text-secondary">Autor:</span> ${artist} </h2> <div class="flex items-center gap-4 mt-4 text-sm text-text-secondary"> <span class="bg-bg-secondary px-3 py-1 rounded-full border border-white/10">
Ton: <span id="header-tone" class="text-accent-main font-bold">${tone}</span> </span> <a${addAttribute(`/search/all?categoryId=${category?.id}`, "href")} target="_blank"> <span class="cursor-pointer hover:underline bg-bg-secondary px-3 py-1 rounded-full border border-white/10 text-accent-main/90 font-bold"> ${category?.name} </span> </a> ${user && renderTemplate`<span class="text-xs text-text-secondary/80 ml-auto">
Creado por: ${user.name} </span>`} </div> </header> ${renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/components/HeaderLyric.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/letras y acordes/letras-acordes/src/components/HeaderLyric.astro", void 0);

export { $$HeaderLyric as $ };
