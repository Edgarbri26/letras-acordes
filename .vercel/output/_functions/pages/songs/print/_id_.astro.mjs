import { e as createComponent, f as createAstro, n as renderHead, r as renderTemplate, k as renderComponent, p as defineScriptVars } from '../../../chunks/astro/server_B7r4Bv6B.mjs';
import 'piccolore';
import { S as SongView } from '../../../chunks/SongView_D0hFWCCT.mjs';
/* empty css                                       */
import { $ as $$Footer } from '../../../chunks/footer_9vbfV4y8.mjs';
import { A as API_URL } from '../../../chunks/songs_DJyb_bwy.mjs';
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  let song = null;
  let error = null;
  let displayTone = null;
  if (id) {
    try {
      const res = await fetch(`${API_URL}/songs/${id}`);
      if (res.ok) {
        song = await res.json();
        const toneParam = Astro2.url.searchParams.get("tone");
        displayTone = toneParam || song.key;
      } else {
        error = "Canci\xF3n no encontrada";
      }
    } catch (e) {
      console.error(e);
      error = "Error de conexi\xF3n";
    }
  } else {
    return Astro2.redirect("/");
  }
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><title>${song ? `${song.title} - Imprimir` : "Error"}</title>${renderHead()}</head> <body class="bg-white"> ${error ? renderTemplate`<div class="print-container"><h1>${error}</h1></div>` : renderTemplate(_a || (_a = __template(['<div class="print-container"> <div class="print-header"> <img src="/medium-logo-light.svg" alt="Cancionero Digital" class="print-logo"> <div> <h1 class="text-accent-main" style="font-size: 24pt; font-weight: bold; margin: 0;">', '</h1> <h2 style="font-size: 14pt; color: #666; margin: 0;">', '</h2> </div> </div> <div class="meta" style="margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem;"> <span><strong>Tono:</strong> <span class="badge" style="border: 1px solid #ccc; padding: 2px 8px; border-radius: 4px;">', "</span></span> ", ' <span style="margin-left: 20px;"><strong>Categor\xEDa:</strong> ', '</span> </div> <div class="song-content"> ', " </div> <script>(function(){", "\n                    window.onload = () => {\n                        window.print();\n                    }\n                    \n                    window.onafterprint = () => {\n                        window.location.href = `/songs/${id}${search}`;\n                    }\n                })();<\/script> </div>"], ['<div class="print-container"> <div class="print-header"> <img src="/medium-logo-light.svg" alt="Cancionero Digital" class="print-logo"> <div> <h1 class="text-accent-main" style="font-size: 24pt; font-weight: bold; margin: 0;">', '</h1> <h2 style="font-size: 14pt; color: #666; margin: 0;">', '</h2> </div> </div> <div class="meta" style="margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem;"> <span><strong>Tono:</strong> <span class="badge" style="border: 1px solid #ccc; padding: 2px 8px; border-radius: 4px;">', "</span></span> ", ' <span style="margin-left: 20px;"><strong>Categor\xEDa:</strong> ', '</span> </div> <div class="song-content"> ', " </div> <script>(function(){", "\n                    window.onload = () => {\n                        window.print();\n                    }\n                    \n                    window.onafterprint = () => {\n                        window.location.href = \\`/songs/\\${id}\\${search}\\`;\n                    }\n                })();<\/script> </div>"])), song.title, song.artist, displayTone, displayTone !== song.key && renderTemplate`<span>(Original: ${song.key})</span>`, song.category?.name || "General", renderComponent($$result, "SongView", SongView, { "client:load": true, "initialContent": song.content, "initialKey": displayTone, "originalKey": song.key, "client:component-hydration": "load", "client:component-path": "@/components/SongView.jsx", "client:component-export": "default" }), defineScriptVars({ id, search: Astro2.url.search }))} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/songs/print/[id].astro", void 0);

const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/songs/print/[id].astro";
const $$url = "/songs/print/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
