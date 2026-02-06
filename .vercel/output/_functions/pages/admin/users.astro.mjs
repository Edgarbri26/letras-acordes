import { e as createAstro, f as createComponent, k as renderComponent, h as addAttribute, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_D9QA4LpJ.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_PB0CidCB.mjs';
import { A as API_URL } from '../../chunks/songs_BpP3uNMI.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://www.micancionero.online");
const $$Users = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Users;
  const token = Astro2.cookies.get("token")?.value;
  let users = [];
  let roles = [];
  let error = null;
  try {
    const res = await fetch(`${API_URL}/users`, {
      headers: {
        Cookie: `token=${token}`
      }
    });
    if (res.ok) {
      users = await res.json();
    } else {
      if (res.status === 403 || res.status === 401) {
        return Astro2.redirect("/");
      }
      error = "Error fetching users.";
    }
    const rolesRes = await fetch(`${API_URL}/roles`, {
      headers: { Cookie: `token=${token}` }
    });
    if (rolesRes.ok) {
      roles = await rolesRes.json();
    }
  } catch (e) {
    error = "Connection error.";
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "User Management" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"> <h2 class="text-2xl font-bold text-accent-main">Usuarios</h2> <button id="openCreateModal" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto flex items-center justify-center gap-2"> <i class="fa-solid fa-plus-circle"></i>
Nuevo Usuario
</button> </div> ${error && renderTemplate`<div class="bg-red-500/20 text-red-200 border border-red-500/50 p-4 rounded-lg mb-4"> ${error} </div>`}<div class="bg-bg-secondary rounded-xl shadow-lg border border-white/10 overflow-hidden"> <div class="overflow-x-auto"> <table class="w-full text-left text-sm text-text-main"> <thead class="bg-bg-main text-text-secondary uppercase border-b border-white/10"> <tr> <th class="px-6 py-4 font-semibold">ID</th> <th class="px-6 py-4 font-semibold">Nombre</th> <th class="px-6 py-4 font-semibold">Email</th> <th class="px-6 py-4 font-semibold">Teléfono</th> <th class="px-6 py-4 font-semibold">Rol</th> <th class="px-6 py-4 font-semibold text-right">Acciones</th> </tr> </thead> <tbody class="divide-y divide-white/10"> ${users.map((user) => renderTemplate`<tr class="hover:bg-white/5 transition-colors"> <td class="px-6 py-4 opacity-70">#${user.id}</td> <td class="px-6 py-4 font-medium"> ${user.name} </td> <td class="px-6 py-4 text-text-secondary"> ${user.email} </td> <td class="px-6 py-4 text-text-secondary"> <div class="flex items-center gap-2"> <span>${user.phoneNumber || "-"}</span> ${user.phoneNumber && renderTemplate`<a${addAttribute(`https://wa.me/${user.phoneNumber.replace(/[^0-9]/g, "")}`, "href")} target="_blank" rel="noopener noreferrer" class="text-green-500 hover:text-green-400 transition-colors" title="Enviar WhatsApp"> <i class="fa-brands fa-whatsapp text-lg"></i> </a>`} </div> </td> <td class="px-6 py-4"> <span${addAttribute(`px-2 py-1 rounded text-xs font-bold ${user.role?.name === "ADMIN" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : "bg-green-500/20 text-green-300 border border-green-500/30"}`, "class")}> ${user.role?.name || "USER"} </span> </td> <td class="px-6 py-4 text-right space-x-2"> <button class="text-blue-400 hover:text-blue-300 text-sm font-medium edit-btn transition-colors"${addAttribute(JSON.stringify(user), "data-user")} title="Editar"> <i class="fa-solid fa-pen-to-square h-5 w-5"></i> </button> <button class="text-red-400 hover:text-red-300 text-sm font-medium delete-btn transition-colors"${addAttribute(user.id, "data-id")} title="Eliminar"> <i class="fa-solid fa-trash h-5 w-5"></i> </button> </td> </tr>`)} ${users.length === 0 && renderTemplate`<tr> <td colspan="6" class="px-6 py-8 text-center text-text-secondary">
No hay usuarios registrados via API aún.
</td> </tr>`} </tbody> </table> </div> </div>  <div id="userModal" class="hidden fixed inset-0 bg-black/80 z-50 items-center justify-center p-4 backdrop-blur-sm"> <div class="bg-bg-secondary w-full max-w-md rounded-xl shadow-2xl border border-white/10 overflow-hidden"> <div class="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-bg-main"> <h3 id="modalTitle" class="text-lg font-bold text-accent-main">
Nuevo Usuario
</h3> <button id="closeModal" class="text-text-secondary hover:text-white transition-colors"> <i class="fa-solid fa-xmark text-xl"></i> </button> </div> <form id="userForm" class="p-6 space-y-4"> <input type="hidden" name="id" id="userId"> <div> <label class="block text-sm font-medium mb-1 text-text-secondary">Nombre</label> <input type="text" name="name" required class="w-full bg-bg-main border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-accent-main text-text-main placeholder-white/20"> </div> <div> <label class="block text-sm font-medium mb-1 text-text-secondary">Email</label> <input type="email" name="email" required class="w-full bg-bg-main border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-accent-main text-text-main placeholder-white/20"> </div> <div> <label class="block text-sm font-medium mb-1 text-text-secondary">Teléfono</label> <input type="tel" name="phoneNumber" class="w-full bg-bg-main border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-accent-main text-text-main placeholder-white/20" placeholder="+54 9 11 1234 5678"> </div> <div> <label class="block text-sm font-medium mb-1 text-text-secondary">Password</label> <input type="password" name="password" minlength="6" class="w-full bg-bg-main border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-accent-main text-text-main placeholder-white/20" placeholder="Dejar en blanco para no cambiar"> <p class="text-xs text-text-secondary mt-1 opacity-70">
Requerido para nuevos usuarios.
</p> </div> <div> <label class="block text-sm font-medium mb-1 text-text-secondary">Rol</label> <div class="relative"> <select name="roleId" class="w-full bg-bg-main border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-accent-main text-text-main appearance-none cursor-pointer"> ${roles.map((role) => renderTemplate`<option${addAttribute(role.id, "value")}>${role.name}</option>`)} </select> <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-text-secondary"> <i class="fa-solid fa-chevron-down text-xs"></i> </div> </div> </div> <div class="pt-4 flex justify-end gap-3"> <button type="button" id="cancelModalBtn" class="px-4 py-2 rounded-lg font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-colors">Cancelar</button> <button type="submit" class="bg-accent-main text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-secondary transition-colors">Guardar</button> </div> </form> </div> </div> ` })} <div id="admin-config"${addAttribute(API_URL, "data-api-url")}${addAttribute(token, "data-token")} class="hidden"></div> ${renderScript($$result, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/admin/users.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/admin/users.astro", void 0);

const $$file = "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/admin/users.astro";
const $$url = "/admin/users";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Users,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
