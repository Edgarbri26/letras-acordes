import { e as createComponent, f as createAstro, k as renderComponent, h as addAttribute, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B7r4Bv6B.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_D7Zf6s_Q.mjs';
import { A as API_URL } from '../../chunks/songs_DJyb_bwy.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
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
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "User Management" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex justify-between items-center mb-6"> <h2 class="text-2xl font-bold">Usuarios</h2> <button id="openCreateModal" class="bg-accent-main hover:bg-accent-secondary text-white px-4 py-2 rounded-lg font-medium transition-colors">
+ Nuevo Usuario
</button> </div> ${error && renderTemplate`<div class="bg-red-100 text-red-700 p-4 rounded-lg mb-4"> ${error} </div>`}<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"> <table class="w-full text-left"> <thead class="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 text-sm uppercase"> <tr> <th class="px-6 py-4 font-semibold">ID</th> <th class="px-6 py-4 font-semibold">Nombre</th> <th class="px-6 py-4 font-semibold">Email</th> <th class="px-6 py-4 font-semibold">Teléfono</th> <th class="px-6 py-4 font-semibold">Rol</th> <th class="px-6 py-4 font-semibold text-right">Acciones</th> </tr> </thead> <tbody class="divide-y divide-gray-200 dark:divide-gray-700"> ${users.map((user) => renderTemplate`<tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"> <td class="px-6 py-4 text-gray-500">#${user.id}</td> <td class="px-6 py-4 font-medium">${user.name}</td> <td class="px-6 py-4 text-gray-500"> ${user.email} </td> <td class="px-6 py-4 text-gray-500"> <div class="flex items-center gap-2"> <span>${user.phoneNumber || "-"}</span> ${user.phoneNumber && renderTemplate`<a${addAttribute(`https://wa.me/${user.phoneNumber.replace(/[^0-9]/g, "")}`, "href")} target="_blank" rel="noopener noreferrer" class="text-green-500 hover:text-green-600 transition-colors" title="Enviar WhatsApp"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"> <path d="M.057 24l1.687-6.163c-3.104-5.385-1.748-12.083 3.328-15.688 5.6-3.951 13.56-2.296 17.283 3.595 3.725 5.892 1.638 13.684-4.502 16.585-2.228 1.054-4.735 1.157-7.032.221L.06 23.999l.053.001zm3.626-4.997l.117.189c2.316 3.754 7.235 4.908 10.993 2.578 3.756-2.332 4.939-7.279 2.645-11.028-2.302-3.763-7.253-4.921-11.009-2.576-3.756 2.345-4.923 7.301-2.617 11.057l.169.271-1.076 3.929 3.929-1.077-.151-.343z"></path> <path d="M16.649 14.167c-.201-.102-1.196-.596-1.381-.664-.185-.069-.32-.102-.456.102-.136.205-.529.664-.648.802-.119.136-.238.154-.441.051-.202-.102-.857-.319-1.632-1.015-.607-.544-1.016-1.217-1.135-1.423-.119-.204-.012-.315.089-.415.092-.09.204-.238.306-.358.102-.119.136-.204.204-.34.068-.137.034-.256-.017-.358-.051-.102-.457-1.106-.628-1.516-.164-.393-.33-.339-.456-.346-.118-.007-.254-.008-.39-.008-.136 0-.357.051-.543.256-.187.204-.714.698-.714 1.703 0 1.006.732 1.977.834 2.115.102.136 1.442 2.222 3.493 3.109 2.051.887 2.051.591 2.424.555.373-.036 1.195-.494 1.365-.969.17-.477.17-.887.119-.972-.051-.086-.186-.137-.388-.238z"></path> </svg> </a>`} </div> </td> <td class="px-6 py-4"> <span${addAttribute(`px-2 py-1 rounded text-xs font-bold ${user.role?.name === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`, "class")}> ${user.role?.name || "USER"} </span> </td> <td class="px-6 py-4 text-right space-x-2"> <button class="text-blue-500 hover:text-blue-700 text-sm font-medium edit-btn"${addAttribute(JSON.stringify(user), "data-user")}>
Editar
</button> <button class="text-red-500 hover:text-red-700 text-sm font-medium delete-btn"${addAttribute(user.id, "data-id")}>
Eliminar
</button> </td> </tr>`)} ${users.length === 0 && renderTemplate`<tr> <td colspan="5" class="px-6 py-8 text-center text-gray-500">
No hay usuarios registrados via API aún.
</td> </tr>`} </tbody> </table> </div>  <div id="userModal" class="hidden fixed inset-0 bg-black/50 z-50 items-center justify-center p-4 backdrop-blur-sm"> <div class="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl shadow-2xl overflow-hidden"> <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"> <h3 id="modalTitle" class="text-lg font-bold">Nuevo Usuario</h3> <button id="closeModal" class="text-gray-400 hover:text-gray-600">✕</button> </div> <form id="userForm" class="p-6 space-y-4"> <input type="hidden" name="id" id="userId"> <div> <label class="block text-sm font-medium mb-1">Nombre</label> <input type="text" name="name" required class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accent-main"> </div> <div> <label class="block text-sm font-medium mb-1">Email</label> <input type="email" name="email" required class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accent-main"> </div> <div> <label class="block text-sm font-medium mb-1">Teléfono</label> <input type="tel" name="phoneNumber" class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accent-main" placeholder="+54 9 11 1234 5678"> </div> <div> <label class="block text-sm font-medium mb-1">Password</label> <input type="password" name="password" minlength="6" class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accent-main" placeholder="Dejar en blanco para no cambiar"> <p class="text-xs text-gray-500 mt-1">
Requerido para nuevos usuarios.
</p> </div> <div> <label class="block text-sm font-medium mb-1">Rol</label> <select name="roleId" class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-accent-main"> ${roles.map((role) => renderTemplate`<option${addAttribute(role.id, "value")}>${role.name}</option>`)} </select> </div> <div class="pt-4 flex justify-end"> <button type="submit" class="bg-accent-main text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-secondary">Guardar</button> </div> </form> </div> </div> ` })} <div id="admin-config"${addAttribute(API_URL, "data-api-url")}${addAttribute(token, "data-token")} class="hidden"></div> ${renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/pages/admin/users.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/admin/users.astro", void 0);

const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/admin/users.astro";
const $$url = "/admin/users";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Users,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
