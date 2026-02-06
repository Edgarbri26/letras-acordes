import { f as createComponent, m as maybeRenderHead, r as renderTemplate } from './astro/server_D9QA4LpJ.mjs';
import 'piccolore';
import 'clsx';

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="text-white border-t border-white/5 bg-bg-secondary text-xs md:text-sm flex flex-col sm:flex-row gap-1 justify-center items-center max-w pb-6 sm:pb-8 pt-4"> <p>
© ${(/* @__PURE__ */ new Date()).getFullYear()} Cancionero Digital. Todos los derechos reservados.
</p> <div> <a href="https://github.com/edgarbri26" class="hover:underline hover:text-accent-main" target="_blank">Desarrollado por Edgar Briceño</a>
|
<a href="https://github.com/edgarbri26/cancionero-digital-frontend" class="hover:underline hover:text-accent-main text-accent-main" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a>
|
<a href="https://wa.me/584262498651?text=Hola%20Edgar,%20saludos%20musicales!%20🎵%20Quisiera%20saber%20más%20sobre%20el%20Cancionero%20Digital." class="hover:underline hover:text-accent-main text-accent-main" target="_blank"> <i class="fa-brands fa-whatsapp"></i> contacto</a> </div> </footer>`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/components/footer.astro", void 0);

export { $$Footer as $ };
