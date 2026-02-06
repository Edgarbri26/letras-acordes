import { f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D9QA4LpJ.mjs';
import 'piccolore';
import { $ as $$LoginLayout } from '../chunks/LoginLayout_Bg0qpUDm.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$LoginLayout, { "title": "Iniciar Sesi\xF3n - Cancionero" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full flex-1 flex items-center justify-center p-4"> <section class="w-full max-w-md bg-bg-secondary p-8 rounded-xl shadow-lg border border-white/5"> <h1 class="text-2xl font-bold text-accent-main mb-6 text-center">
Iniciar Sesión
</h1> <form id="loginForm" class="space-y-6" method="POST"> <div> <label for="email" class="block text-sm font-medium text-text-secondary mb-2">Correo Electrónico</label> <input type="email" id="email" name="email" required class="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-main transition-colors" placeholder="usuario@gmail.com"> </div> <div> <label for="password" class="block text-sm font-medium text-text-secondary mb-2">Contraseña</label> <input type="password" id="password" name="password" required class="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-main transition-colors" placeholder="••••••••"> </div> <button id="submitBtn" type="submit" class="w-full bg-accent-main text-white font-bold py-3 rounded-lg hover:bg-accent-secondary transition-transform transform active:scale-95 flex justify-center items-center gap-2"> <span>Ingresar</span> </button> </form> <p class="mt-6 text-center text-sm text-text-secondary">
¿No tienes cuenta?
<a href="/register" class="text-accent-main hover:underline">
Regístrate aquí
</a> </p> </section> </div> ` })} ${renderScript($$result, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/login.astro", void 0);

const $$file = "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
