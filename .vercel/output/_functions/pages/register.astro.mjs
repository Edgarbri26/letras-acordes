import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B7r4Bv6B.mjs';
import 'piccolore';
import { $ as $$LoginLayout } from '../chunks/LoginLayout_CZ9jJTYj.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$LoginLayout, { "title": "Registrarse - Cancionero" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full flex-1 flex items-center justify-center p-4"> <section class="w-full max-w-md bg-bg-secondary p-8 rounded-xl shadow-lg border border-white/5"> <h1 class="text-2xl font-bold text-accent-main mb-6 text-center">
Crear Cuenta
</h1> <form id="registerForm" class="space-y-6"> <div> <label for="name" class="block text-sm font-medium text-text-secondary mb-2">Nombre Completo</label> <input type="text" id="name" name="name" required class="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-main transition-colors" placeholder="Tu Nombre"> </div> <div> <label for="email" class="block text-sm font-medium text-text-secondary mb-2">Correo Electrónico</label> <input type="email" id="email" name="email" required class="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-main transition-colors" placeholder="tu@email.com"> </div> <div> <label for="phoneNumber" class="block text-sm font-medium text-text-secondary mb-2">Teléfono</label> <input type="tel" id="phoneNumber" name="phoneNumber" class="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-main transition-colors" placeholder="+54 9 11 1234 5678"> </div> <div> <label for="password" class="block text-sm font-medium text-text-secondary mb-2">Contraseña</label> <input type="password" id="password" name="password" required class="w-full bg-bg-main border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-main transition-colors" placeholder="••••••••" minlength="6"> </div> <button id="submitBtn" type="submit" class="w-full bg-accent-main text-white font-bold py-3 rounded-lg hover:bg-accent-secondary transition-transform transform active:scale-95 flex justify-center items-center gap-2"> <span>Registrarse</span> </button> </form> <p class="mt-6 text-center text-sm text-text-secondary">
¿Ya tienes cuenta?
<a href="/login" class="text-accent-main hover:underline">
Inicia Sesión
</a> </p> </section> </div> ` })} ${renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/pages/register.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/register.astro", void 0);

const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Register,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
