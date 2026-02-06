import { e as createAstro, f as createComponent, h as addAttribute, l as renderScript, r as renderTemplate, k as renderComponent, m as maybeRenderHead, o as renderSlot, n as renderHead } from './astro/server_D9QA4LpJ.mjs';
import 'piccolore';
/* empty css                         */
import 'clsx';
/* empty css                         */
/* empty css                         */
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { $ as $$Footer } from './footer_CiU4ywdy.mjs';

const $$Astro$4 = createAstro("https://www.micancionero.online");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/node_modules/astro/components/ClientRouter.astro", void 0);

const getUserFromToken = (token) => {
    if (!token) return null;
    try {
        console.log("getUserFromToken - Token received (first 10 chars):", token.substring(0, 10));
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        return payload;
    } catch (e) {
        console.error("Error parsing token:", e);
        return null;
    }
};

const hasPermission = (user, permission) => {
    if (!user) return false;
    // Admin always has permission (fallback) or if explicitly in list
    if (user.role === 'ADMIN') return true;
    return user.permissions?.includes(permission) || false;
};

function SearchInputReact({ className = "" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/songs/search/${encodeURIComponent(query.trim())}`;
    } else {
      window.location.href = "/songs/search/all";
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        if (!query) {
          setIsExpanded(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [query]);
  return /* @__PURE__ */ jsxs("div", { className: `relative flex justify-center items-center h-12 ${className}`, children: [
    /* @__PURE__ */ jsxs(
      "form",
      {
        ref: formRef,
        onSubmit: handleSubmit,
        onClick: () => {
          setIsExpanded(true);
          inputRef.current?.focus();
        },
        className: `
                    flex items-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                    ${isExpanded ? "fixed top-4 left-1/2 -translate-x-1/2 w-[95vw] max-w-2xl shadow-2xl scale-100 z-[100]" : "relative w-12 md:w-64 cursor-pointer hover:scale-105 active:scale-95 shadow-lg z-10"}
                    h-12 bg-black/90 backdrop-blur-xl border border-white/10 rounded-full overflow-hidden
                    group
                `,
        children: [
          /* @__PURE__ */ jsx("div", { className: `
                    absolute left-0 top-0 h-full flex items-center justify-center 
                    transition-all duration-500
                    ${isExpanded ? "w-12 pl-2" : "w-full md:w-12 md:pl-0"}
                `, children: /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: `h-5 w-5 text-gray-400 transition-colors duration-300 ${isExpanded ? "text-accent-main" : "group-hover:text-white"}`,
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 2.5,
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" })
            }
          ) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              type: "search",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              onFocus: () => setIsExpanded(true),
              placeholder: "Buscar canciones, artistas...",
              className: `
                        w-full h-full bg-transparent border-none outline-none text-white placeholder-gray-500 px-12 font-medium
                        transition-opacity duration-300
                        ${isExpanded ? "opacity-100" : "opacity-0 md:opacity-100"}
                    `,
              autoComplete: "off"
            }
          ),
          isExpanded && /* @__PURE__ */ jsxs("div", { className: "absolute right-2 top-1/2 -translate-y-1/2 flex gap-2", children: [
            query && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  setQuery("");
                  inputRef.current?.focus();
                },
                className: "p-1 rounded-full text-gray-500 hover:bg-white/10 hover:text-white transition-colors",
                children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) })
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "h-4 w-px bg-white/10 mx-1" }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase font-bold text-gray-500 tracking-wider hidden sm:block pointer-events-none pr-3", children: "ESC" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `
                    fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 z-[90]
                    ${isExpanded ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
                `,
        onClick: () => {
          setIsExpanded(false);
        }
      }
    )
  ] });
}

const $$Astro$3 = createAstro("https://www.micancionero.online");
const $$SearchInput = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$SearchInput;
  const { class: className } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "SearchInputReact", SearchInputReact, { "client:load": true, "className": className, "client:component-hydration": "load", "client:component-path": "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/components/SearchInputReact.jsx", "client:component-export": "default" })}`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/components/SearchInput.astro", void 0);

const $$Astro$2 = createAstro("https://www.micancionero.online");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const token = Astro2.cookies.get("token")?.value;
  const user = getUserFromToken(token);
  const isLoggedIn = !!user;
  const canCreateSong = hasPermission(user, "song.create");
  const canViewAdmin = hasPermission(user, "view.admin");
  return renderTemplate`${maybeRenderHead()}<header class="flex items-center justify-between px-4 md:px-8 py-3 bg-bg-secondary border-b border-white/10 sticky top-0 z-50"> <div class="max-w-6xl w-full mx-auto flex justify-between"> <div class="flex items-center gap-4"> <a href="/" class="text-2xl font-bold text-accent-main tracking-tighter flex items-center" data-astro-prefetch> <!-- Large Logo (Desktop) --> <img src="/large-logo.svg" alt="Logo" class="h-11 w-auto lg:block sm:hidden"> <!-- Medium Logo (Tablet) --> <img src="/medium-logo.svg" alt="Logo" class="h-10 w-auto hidden sm:block lg:hidden"> <!-- Small Icon (Mobile) --> <!-- <img src="/icono.svg" alt="Logo" class="h-9 w-auto sm:hidden" /> --> </a> </div> ${renderComponent($$result, "SearchInput", $$SearchInput, { "class": "ml-auto md:mx-auto" })} <nav class="flex items-center gap-4"> <ul id="menu-list" class="hidden md:flex absolute md:static top-full left-0 w-full md:w-auto flex-col md:flex-row items-center bg-bg-secondary md:bg-transparent border-b md:border-none border-white/10 md:h-9 gap-4 text-sm font-medium text-text-secondary py-4 md:py-0 shadow-lg md:shadow-none z-40"> <li class="hover:text-text-main cursor-pointer transition-colors"> <a href="/misas" data-astro-prefetch>Misas</a> </li> ${isLoggedIn && canCreateSong && renderTemplate`<li class="hover:text-text-main cursor-pointer transition-colors"> <a href="/songs/add" data-astro-prefetch>
Add
</a> </li>`} ${isLoggedIn && canViewAdmin && renderTemplate`<li class="hover:text-text-main cursor-pointer transition-colors"> <a href="/admin/users" data-astro-prefetch>
Admin
</a> </li>`} ${isLoggedIn ? renderTemplate`<li class="text-red-400 hover:text-red-300 cursor-pointer font-bold"> <a href="/logout" data-astro-prefetch>
Cerrar Sesión
</a> </li>` : renderTemplate`<li class="text-accent-main hover:text-accent-secondary cursor-pointer font-bold"> <a href="/login" data-astro-prefetch>
Ingresar
</a> </li>`} </ul> </nav> </div> </header>`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro("https://www.micancionero.online");
const $$BottomNav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BottomNav;
  const token = Astro2.cookies.get("token")?.value;
  const user = getUserFromToken(token);
  const isLoggedIn = !!user;
  const canCreateSong = hasPermission(user, "song.create");
  const canViewAdmin = hasPermission(user, "view.admin");
  const currentPath = Astro2.url.pathname;
  const isActive = (path) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };
  return renderTemplate`${maybeRenderHead()}<nav class="md:hidden fixed bottom-0 left-0 w-full bg-bg-secondary border-t border-white/10 z-50 pb-safe" data-astro-cid-ltxpr5xc> <div class="flex justify-around items-center h-16" data-astro-cid-ltxpr5xc> <a href="/"${addAttribute(`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive("/") && currentPath === "/" ? "text-accent-main" : "text-text-secondary hover:text-text-main"}`, "class")} data-astro-prefetch data-astro-cid-ltxpr5xc> <i class="fa-solid fa-home text-xl" data-astro-cid-ltxpr5xc></i> <span class="text-[10px] font-medium" data-astro-cid-ltxpr5xc>Inicio</span> </a> <a href="/misas"${addAttribute(`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive("/misas") ? "text-accent-main" : "text-text-secondary hover:text-text-main"}`, "class")} data-astro-prefetch data-astro-cid-ltxpr5xc> <i class="fa-solid fa-book text-xl" data-astro-cid-ltxpr5xc></i> <span class="text-[10px] font-medium" data-astro-cid-ltxpr5xc>Misas</span> </a> ${isLoggedIn && canCreateSong && renderTemplate`<a href="/songs/add" class="flex flex-col items-center justify-center w-full h-full -mt-6" data-astro-prefetch data-astro-cid-ltxpr5xc> <div${addAttribute(`flex items-center justify-center w-14 h-14 rounded-full shadow-lg ${isActive("/songs/add") ? "bg-accent-main text-white ring-4 ring-bg-secondary" : "bg-bg-main border border-white/10 text-accent-main"}`, "class")} data-astro-cid-ltxpr5xc> <i class="fa-solid fa-plus text-2xl" data-astro-cid-ltxpr5xc></i> </div> </a>`} ${!canViewAdmin && renderTemplate`<a href="/songs/search/all"${addAttribute(`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive("/songs/all") ? "text-accent-main" : "text-text-secondary hover:text-text-main"}`, "class")} data-astro-prefetch data-astro-cid-ltxpr5xc> <i class="fa-solid fa-music text-xl" data-astro-cid-ltxpr5xc></i> <span class="text-[10px] font-medium" data-astro-cid-ltxpr5xc>Canciones</span> </a>`} ${isLoggedIn && canViewAdmin && renderTemplate`<a href="/admin/users"${addAttribute(`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive("/admin") ? "text-accent-main" : "text-text-secondary hover:text-text-main"}`, "class")} data-astro-prefetch data-astro-cid-ltxpr5xc> <i class="fa-solid fa-shield text-xl" data-astro-cid-ltxpr5xc></i> <span class="text-[10px] font-medium" data-astro-cid-ltxpr5xc>Admin</span> </a>`} ${isLoggedIn ? renderTemplate`<a href="/logout" class="flex flex-col items-center justify-center w-full h-full space-y-1 text-text-secondary hover:text-red-400" data-astro-cid-ltxpr5xc> <i class="fa-solid fa-arrow-right-from-bracket text-xl" data-astro-cid-ltxpr5xc></i> <span class="text-[10px] font-medium" data-astro-cid-ltxpr5xc>Salir</span> </a>` : renderTemplate`<a href="/login"${addAttribute(`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive("/login") ? "text-accent-main" : "text-text-secondary hover:text-text-main"}`, "class")} data-astro-prefetch data-astro-cid-ltxpr5xc> <i class="fa-solid fa-user text-xl" data-astro-cid-ltxpr5xc></i> <span class="text-[10px] font-medium" data-astro-cid-ltxpr5xc>Ingresar</span> </a>`} </div> </nav> `;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/components/BottomNav.astro", void 0);

const $$Astro = createAstro("https://www.micancionero.online");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Mi canci\xF3nero el mejor cancionero digital para m\xFAsicos cat\xF3licos. Encuentra letras, acordes y herramientas de transposici\xF3n para tu ministerio de m\xFAsica. Ademas crear tus misas con tus canciones favoritas.",
    image = "/favicon.svg"
    // Falta una imagen real de OG, usamos el favicon por ahora o un placeholder
  } = Astro2.props;
  const canonicalURL = new URL(
    Astro2.url.pathname,
    Astro2.site || "https://tusitio.com"
  );
  return renderTemplate`<html lang="es" class="h-full w-full"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="manifest" href="/manifest.webmanifest"><meta name="theme-color" content="#0a0a0a"><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image, Astro2.url), "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(new URL(image, Astro2.url), "content")}><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body class="bg-bg-main text-text-main h-full w-full flex flex-col"> ${renderComponent($$result, "Header", $$Header, { "class": "" })} <div class="flex-1 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-28"> ${renderSlot($$result, $$slots["default"])} <div class="block md:hidden mt-8"> ${renderComponent($$result, "Footer", $$Footer, {})} </div> </div> <!-- <div class="fixed bottom-0 left-0 w-full z-50"> --> <div class="hidden md:block fixed bottom-0 left-0 w-full z-50"> ${renderComponent($$result, "Footer", $$Footer, {})} </div> ${renderComponent($$result, "BottomNav", $$BottomNav, {})} <!-- </div> --> </body></html>`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/layouts/Layout.astro", void 0);

export { $$Layout as $, getUserFromToken as g, hasPermission as h };
