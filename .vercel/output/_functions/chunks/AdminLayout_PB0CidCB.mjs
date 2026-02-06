import { e as createAstro, f as createComponent, h as addAttribute, n as renderHead, o as renderSlot, l as renderScript, r as renderTemplate } from './astro/server_D9QA4LpJ.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */
/* empty css                         */

const $$Astro = createAstro("https://www.micancionero.online");
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title } = Astro2.props;
  const token = Astro2.cookies.get("token")?.value;
  if (!token) {
    return Astro2.redirect("/login");
  }
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description" content="Admin Panel"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title} | Panel de Administración</title><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">${renderHead()}</head> <body class="bg-bg-main min-h-screen text-text-main flex font-sans overflow-x-hidden"> <!-- Mobile Header --> <div class="fixed top-0 left-0 w-full h-16 bg-bg-secondary border-b border-white/10 flex items-center justify-between px-4 z-40 md:hidden"> <h1 class="text-xl font-bold text-accent-main">AdminPanel</h1> <button id="mobile-menu-btn" class="text-text-main p-2 hover:bg-white/5 rounded-lg"> <i class="fa-solid fa-bars text-xl"></i> </button> </div> <!-- Sidebar Overlay --> <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-40 hidden md:hidden glass-dark"></div> <!-- Sidebar --> <aside id="sidebar" class="fixed top-0 left-0 h-full w-64 bg-bg-secondary border-r border-white/10 transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out z-50 flex flex-col pt-16 md:pt-0"> <div class="h-16 hidden md:flex items-center justify-center border-b border-white/10"> <h1 class="text-xl font-bold bg-linear-to-r from-accent-main to-accent-secondary bg-clip-text text-transparent">
AdminPanel
</h1> </div> <nav class="flex-1 p-4 space-y-2 overflow-y-auto"> <a href="/admin/users"${addAttribute(`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${Astro2.url.pathname.includes("/admin/users") ? "bg-accent-main/10 text-accent-main border border-accent-main/20" : "text-text-secondary hover:bg-white/5 hover:text-white"}`, "class")}> <i class="fa-solid fa-users h-5 w-5 flex items-center justify-center"></i>
Usuarios
</a> <a href="/admin/songs"${addAttribute(`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${Astro2.url.pathname.includes("/admin/songs") ? "bg-accent-main/10 text-accent-main border border-accent-main/20" : "text-text-secondary hover:bg-white/5 hover:text-white"}`, "class")}> <i class="fa-solid fa-music h-5 w-5 flex items-center justify-center"></i>
Canciones
</a> <a href="/admin/roles"${addAttribute(`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${Astro2.url.pathname.includes("/admin/roles") ? "bg-accent-main/10 text-accent-main border border-accent-main/20" : "text-text-secondary hover:bg-white/5 hover:text-white"}`, "class")}> <i class="fa-solid fa-shield-halved h-5 w-5 flex items-center justify-center"></i>
Gestión de Roles
</a> <div class="pt-4 mt-4 border-t border-white/10"> <a href="/" class="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-text-secondary hover:bg-white/5 hover:text-white transition-colors"> <i class="fa-solid fa-arrow-left h-5 w-5 flex items-center justify-center"></i>
Volver a la App
</a> </div> </nav> <div class="p-4 border-t border-white/10"> <a href="/logout" class="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"> <i class="fa-solid fa-right-from-bracket"></i>
Logout
</a> </div> </aside> <!-- Main Content --> <main class="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 min-w-0"> ${renderSlot($$result, $$slots["default"])} </main> ${renderScript($$result, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
