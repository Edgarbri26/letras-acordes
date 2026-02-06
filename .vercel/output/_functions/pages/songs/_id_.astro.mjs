import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, q as renderTransition } from '../../chunks/astro/server_D9QA4LpJ.mjs';
import 'piccolore';
import { g as getUserFromToken, $ as $$Layout } from '../../chunks/Layout_CBXTDSI8.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { S as SongView } from '../../chunks/SongView_BiqVkwpk.mjs';
/* empty css                                    */
import { g as getSongById } from '../../chunks/songs_BpP3uNMI.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const SongToolsReact = ({
  id,
  onTranspose,
  onToggleChords,
  onPrint,
  canEdit
}) => {
  const handleTranspose = (amount) => {
    if (onTranspose) {
      onTranspose(amount);
    } else {
      if (typeof window !== "undefined") {
        const event = new CustomEvent("song-transpose", { detail: { semitones: amount } });
        window.dispatchEvent(event);
      }
    }
  };
  const handleToggleChords = () => {
    if (onToggleChords) {
      onToggleChords();
    } else {
      if (typeof window !== "undefined") {
        const event = new CustomEvent("song-toggle-chords");
        window.dispatchEvent(event);
      }
    }
  };
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const toggleTools = () => setIsExpanded(!isExpanded);
  const asideClasses = `w-16 flex flex-col items-center py-4 gap-4 sticky top-16 h-[calc(100vh-4rem)] border-r border-white/5 md:flex no-print transition-all duration-300 ease-in-out overflow-visible z-40 bg-bg-main
        ${isMobile ? isExpanded ? "w-16 border-r py-4" : "w-0 border-none p-0 min-w-0" : isExpanded ? "w-56" : "w-16"}`;
  const btnToggleClasses = `p-2 text-text-secondary hover:text-accent-main transition-all duration-300 absolute top-4 z-50 rounded-full
        ${isMobile ? isExpanded ? "right-1/2 translate-x-1/2 bg-bg-main" : "left-2 bg-bg-secondary shadow-lg" : "right-1/2 translate-x-1/2 bg-bg-main"}`;
  const iconClasses = `fa-solid fa-arrow-left transition-transform duration-300
        ${isMobile ? isExpanded ? "" : "rotate-180" : isExpanded ? "" : "rotate-180"}`;
  const labelClasses = `tool-label whitespace-nowrap overflow-hidden transition-all duration-300
        ${isMobile ? "hidden md:block opacity-0 w-0" : isExpanded ? "block opacity-100 w-auto" : "hidden opacity-0 w-0"}`;
  return /* @__PURE__ */ jsxs("aside", { id: "song-tools-aside", className: asideClasses, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        id: "btn-toggle-tools",
        className: btnToggleClasses,
        title: "Ocultar herramientas",
        onClick: toggleTools,
        children: /* @__PURE__ */ jsx("i", { className: iconClasses })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: `flex flex-col items-center gap-4 mt-12 w-full transition-opacity duration-300 overflow-hidden ${!isExpanded && isMobile ? "opacity-0 pointer-events-none" : "opacity-100"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 w-full px-2 items-center md:items-stretch", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleTranspose(1),
            className: "flex items-center justify-center md:justify-start gap-3 p-2 text-text-secondary hover:text-accent-main transition font-bold rounded-lg hover:bg-white/5 w-full",
            title: "Subir Tono",
            children: [
              /* @__PURE__ */ jsx("i", { className: "fa-solid fa-plus w-5 h-5 flex items-center justify-center" }),
              /* @__PURE__ */ jsx("span", { className: labelClasses, children: "Subir Tono" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-text-secondary md:hidden mb-1", children: "Tono" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleTranspose(-1),
            className: "flex items-center justify-center md:justify-start gap-3 p-2 text-text-secondary hover:text-accent-main transition font-bold rounded-lg hover:bg-white/5 w-full",
            title: "Bajar Tono",
            children: [
              /* @__PURE__ */ jsx("i", { className: "fa-solid fa-minus w-5 h-5 flex items-center justify-center" }),
              /* @__PURE__ */ jsx("span", { className: labelClasses, children: "Bajar Tono" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-px w-8 bg-white/10 my-1" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleToggleChords,
          className: "flex items-center justify-center md:justify-start gap-3 p-2 text-text-secondary hover:text-accent-main transition rounded-lg hover:bg-white/5 w-[calc(100%-1rem)]",
          title: "Alternar Acordes",
          children: [
            /* @__PURE__ */ jsx("i", { className: "fa-solid fa-music w-5 h-5 flex items-center justify-center" }),
            /* @__PURE__ */ jsx("span", { className: labelClasses, children: "Acordes" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "h-px w-8 bg-white/10 my-1" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onPrint,
          className: "flex items-center justify-center md:justify-start gap-3 p-2 text-text-secondary hover:text-accent-main transition rounded-lg hover:bg-white/5 w-[calc(100%-1rem)]",
          title: "Descargar",
          children: [
            /* @__PURE__ */ jsx("i", { className: "fa-solid fa-download w-5 h-5 flex items-center justify-center" }),
            /* @__PURE__ */ jsx("span", { className: labelClasses, children: "Descargar" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "h-px w-8 bg-white/10 my-1" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: async () => {
            if (navigator.share) {
              try {
                await navigator.share({
                  title: document.title,
                  url: window.location.href
                });
              } catch (err) {
                console.error("Error sharing:", err);
              }
            } else {
              try {
                await navigator.clipboard.writeText(window.location.href);
                alert("Enlace copiado al portapapeles");
              } catch (err) {
                console.error("Failed to copy:", err);
              }
            }
          },
          className: "flex items-center justify-center md:justify-start gap-3 p-2 text-text-secondary hover:text-accent-main transition rounded-lg hover:bg-white/5 w-[calc(100%-1rem)]",
          title: "Compartir",
          children: [
            /* @__PURE__ */ jsx("i", { className: "fa-solid fa-share-nodes w-5 h-5 flex items-center justify-center" }),
            /* @__PURE__ */ jsx("span", { className: labelClasses, children: "Compartir" })
          ]
        }
      ),
      canEdit && /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/songs/edit/${id}`,
          className: "flex items-center justify-center md:justify-start gap-3 p-2 text-text-secondary hover:text-accent-main transition rounded-lg hover:bg-white/5 w-[calc(100%-1rem)]",
          title: "Editar",
          children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                className: "lucide lucide-pencil",
                children: [
                  /* @__PURE__ */ jsx("path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" }),
                  /* @__PURE__ */ jsx("path", { d: "m15 5 4 4" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("span", { className: labelClasses, children: "Editar" })
          ]
        }
      )
    ] })
  ] });
};

const HeaderLyricReact = ({ id, title, artist, tone, category, user }) => {
  return /* @__PURE__ */ jsxs("header", { className: "mb-8", children: [
    /* @__PURE__ */ jsx(
      "h1",
      {
        className: "text-4xl font-extrabold text-text-main mb-1",
        style: { viewTransitionName: `song-title-${id}` },
        children: title || "Título Desconocido"
      }
    ),
    /* @__PURE__ */ jsxs("h2", { className: "text-xl text-accent-main font-medium", children: [
      /* @__PURE__ */ jsx("span", { className: "text-text-secondary", children: "Autor:" }),
      " ",
      /* @__PURE__ */ jsx("span", { style: { viewTransitionName: `song-artist-${id}` }, children: artist || "Artista Desconocido" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:justify-start justify-between gap-4 mt-4 text-sm text-text-secondary", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-start gap-2", children: [
        /* @__PURE__ */ jsxs(
          "span",
          {
            className: "bg-bg-secondary px-3 py-1 rounded-full border border-white/10",
            style: { viewTransitionName: `song-tone-${id}` },
            children: [
              "Ton: ",
              /* @__PURE__ */ jsx("span", { className: "text-accent-main font-bold", children: tone })
            ]
          }
        ),
        category && /* @__PURE__ */ jsx("a", { href: `/search/all?categoryId=${category.id}`, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsx(
          "span",
          {
            className: "cursor-pointer hover:underline bg-bg-secondary px-3 py-1 rounded-full border border-white/10 text-accent-main/90 font-bold",
            style: { viewTransitionName: `song-category-${id}` },
            children: category.name
          }
        ) })
      ] }),
      user && /* @__PURE__ */ jsxs("span", { className: "text-sm text-text-secondary/80 sm:ml-auto ml-0", children: [
        "Creado por: ",
        user.name
      ] })
    ] })
  ] });
};

const YouTubePlayerReact = ({ url }) => {
  if (!url) return null;
  const getYouTubeId = (url2) => {
    if (!url2) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url2.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  const videoId = getYouTubeId(url);
  if (!videoId) return null;
  return /* @__PURE__ */ jsx("div", { className: "sticky top-20 rounded-xl overflow-hidden shadow-2xl bg-black aspect-video", children: /* @__PURE__ */ jsx(
    "iframe",
    {
      width: "100%",
      height: "100%",
      src: `https://www.youtube.com/embed/${videoId}`,
      title: "YouTube video player",
      frameBorder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      allowFullScreen: true
    }
  ) });
};

const $$Astro = createAstro("https://www.micancionero.online");
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  Astro2.response.headers.set("Cache-Control", "public, max-age=60, s-maxage=60");
  const token = Astro2.cookies.get("token")?.value;
  const user = getUserFromToken(token);
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/");
  }
  const response = await getSongById(id);
  let song = null;
  let seoTitle = "Canci\xF3n no encontrada | Letra y Acordes";
  let seoDescription = "La canci\xF3n que buscas no est\xE1 disponible.";
  if (response.success && response.data) {
    song = response.data;
    seoTitle = `${song.title} - ${song.artist} | Letra y Acordes`;
    seoDescription = `Mi cancionero digital. Acordes y letra de ${song.title} de ${song.artist}. Aprende a tocar esta canci\xF3n con guitarra, piano o ukulele.`;
  }
  const canEdit = user && (user.role === "ADMIN" || song?.userId && user.id === song.userId);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": seoTitle, "description": seoDescription }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="print-header flex items-center gap-4 mb-2 pb-2 border-b border-gray-300"> <img src="/icono-light.svg" alt="Cancionero Digital" class="w-10 h-10"> <div class="flex-1"> <h1 class="text-3xl font-bold text-black leading-tight"${addAttribute(renderTransition($$result2, "o77juiae", "", `song-title-${id}`), "data-astro-transition-scope")}> ${song ? song.title : "Cargando..."} </h1> </div> <div class="text-right"> <p class="text-gray-400 text-xs">Cancionero Digital</p> </div> </div> <div class="flex flex-1 max-w-[1400px] mx-auto w-full print:block"> ${renderComponent($$result2, "SongToolsReact", SongToolsReact, { "client:load": true, "id": id, "canEdit": !!canEdit, "onTranspose": void 0, "onToggleChords": void 0, "onPrint": void 0, "client:component-hydration": "load", "client:component-path": "@/components/SongToolsReact", "client:component-export": "SongToolsReact" })} <main class="flex-1 p-6 md:p-10 min-w-0 print:px-8 print:py-0"> ${renderComponent($$result2, "HeaderLyricReact", HeaderLyricReact, { "id": id, "title": song?.title, "artist": song?.artist, "tone": song?.key, "category": song?.category, "user": song?.user })} <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start print:block"> <div class="lg:col-span-2 print:w-full"> ${renderComponent($$result2, "SongView", SongView, { "client:load": true, "initialContent": song?.content, "initialKey": song?.key, "originalKey": song?.key, "client:component-hydration": "load", "client:component-path": "@/components/SongView", "client:component-export": "default" })} </div> <div class="lg:col-span-1 no-print"> ${renderComponent($$result2, "YouTubePlayerReact", YouTubePlayerReact, { "url": song?.url_song, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@/components/YouTubePlayerReact", "client:component-export": "YouTubePlayerReact" })} </div> </div> </main> </div> ` })}`;
}, "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/songs/[id].astro", "self");

const $$file = "/home/runner/work/cancionero-digital-frontend/cancionero-digital-frontend/src/pages/songs/[id].astro";
const $$url = "/songs/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
