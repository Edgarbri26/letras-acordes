import { e as createComponent, f as createAstro, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_B7r4Bv6B.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_D7Zf6s_Q.mjs';
import { A as API_URL } from '../../chunks/songs_DJyb_bwy.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Roles = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Roles;
  const token = Astro2.cookies.get("token")?.value;
  if (!token) {
    return Astro2.redirect("/login");
  }
  let roles = [];
  let permissions = [];
  let error = null;
  try {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const rolesReq = fetch(`${API_URL}/roles`, { headers });
    const permsReq = fetch(`${API_URL}/permissions`, { headers });
    const [rRes, pRes] = await Promise.all([rolesReq, permsReq]);
    if (!rRes.ok) {
      throw new Error("Error cargando roles");
    }
    roles = await rRes.json();
    roles = roles.filter((role) => role.name !== "ADMIN");
    if (!pRes.ok) {
      throw new Error("Error cargando permisos");
    }
    permissions = await pRes.json();
  } catch (err) {
    console.error("Error loading admin data:", err);
    error = err instanceof Error ? err.message : "Error de conexi\xF3n o datos";
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Gesti\xF3n de Roles" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="roles-page" class="p-6"${addAttribute(API_URL, "data-api-url")}${addAttribute(token, "data-token")}> <div class="flex justify-between items-center mb-8"> <h1 class="text-3xl font-bold text-accent-main">
Gestión de Roles y Permisos
</h1> <button id="createRoleBtn" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center gap-2"> <i class="fa-solid fa-plus-circle h-5 w-5 flex items-center justify-center"></i>
Crear Rol
</button> </div> ${error && renderTemplate`<div class="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded mb-6"> ${error} </div>`} <div class="overflow-x-auto bg-bg-secondary rounded-lg border border-white/10"> <table class="w-full text-left text-sm text-text-main"> <thead class="bg-bg-main text-text-secondary uppercase"> <tr> <th class="px-6 py-3 border-b border-white/10">Permiso</th> ${roles.map((role) => renderTemplate`<th class="px-6 py-3 border-b border-white/10 text-center min-w-[120px]"> <div class="flex items-center justify-center gap-2"> <span>${role.name}</span> ${role.name !== "ADMIN" && renderTemplate`<button class="text-gray-400 hover:text-accent-main transition-colors edit-role-btn"${addAttribute(role.id, "data-role-id")}${addAttribute(role.name, "data-role-name")} title="Editar nombre del rol"> <i class="fa-solid fa-pen-to-square h-4 w-4"></i> </button>`} </div> </th>`)} <th class="px-6 py-3 border-b border-white/10 text-center">
Acciones
</th> </tr> </thead> <tbody class="divide-y divide-white/10"> ${permissions.map((perm) => renderTemplate`<tr class="hover:bg-white/5 transition-colors"> <td class="px-6 py-4 font-medium"> ${perm.name} </td> ${roles.map((role) => {
    const hasPerm = role.permissions?.some(
      (p) => p.id === perm.id
    );
    return renderTemplate`<td class="px-6 py-4 text-center"> <input type="checkbox" class="form-checkbox h-5 w-5 text-accent-main rounded border-gray-600 bg-gray-700 focus:ring-offset-gray-900"${addAttribute(hasPerm, "checked")}${addAttribute(role.id, "data-role-id")}${addAttribute(perm.name, "data-perm-name")}${addAttribute(role.name === "ADMIN", "disabled")}> </td>`;
  })} <td class="px-6 py-4 text-center text-text-secondary italic">
Toggle to Change
</td> </tr>`)} </tbody> </table> </div> <div class="mt-6 flex justify-end"> <button id="saveBtn" class="bg-accent-main hover:bg-accent-secondary text-white font-bold py-2 px-6 rounded transition-colors">
Guardar Cambios
</button> </div> </div> ` })} ${renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/pages/admin/roles.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/admin/roles.astro", void 0);

const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/admin/roles.astro";
const $$url = "/admin/roles";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Roles,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
