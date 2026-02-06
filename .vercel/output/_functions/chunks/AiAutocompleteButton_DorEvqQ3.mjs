import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, l as renderScript, r as renderTemplate } from './astro/server_D9QA4LpJ.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("https://www.micancionero.online");
const $$AiAutocompleteButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AiAutocompleteButton;
  const {
    titleElementId = "title",
    keyElementId = "key",
    contentElementName = "content",
    token,
    apiUrl,
    class: className,
    showIconOnly = false
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button type="button" id="btn-ai-autocomplete"${addAttribute([
    "text-xs bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-1.5 px-3 rounded-md transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 border border-white/10",
    className
  ], "class:list")} title="Generar acordes con Inteligencia Artificial"${addAttribute(titleElementId, "data-title-id")}${addAttribute(keyElementId, "data-key-id")}${addAttribute(contentElementName, "data-content-name")}${addAttribute(token, "data-token")}${addAttribute(apiUrl, "data-api-url")}> <i class="fa-solid fa-wand-magic-sparkles"></i> ${!showIconOnly && renderTemplate`<span class="hidden md:inline">Generar Acordes IA</span>`} </button> ${renderScript($$result, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/components/Ui/AiAutocompleteButton.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/components/Ui/AiAutocompleteButton.astro", void 0);

export { $$AiAutocompleteButton as $ };
