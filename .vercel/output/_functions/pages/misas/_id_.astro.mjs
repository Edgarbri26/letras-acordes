import { e as createComponent, f as createAstro, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_sX7_rjgf.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_C6REJ3E8.mjs';
import { A as API_URL, s as searchSongs } from '../../chunks/songs_C1QqldAr.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { a as addSongToMisa } from '../../chunks/misas_CRUPEDcZ.mjs';
export { renderers } from '../../renderers.mjs';

const getMoments = async () => {
  try {
    const res = await fetch(`${API_URL}/moments`);
    if (!res.ok) {
      return { success: false, error: "Error al obtener los momentos." };
    }
    const data = await res.json();
    return { success: true, data };
  } catch (e) {
    console.error("Service exception:", e);
    return { success: false, error: "Error de conexión." };
  }
};

function MisaSongManager({ misaId, moments, token }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedMomentId, setSelectedMomentId] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await searchSongs(searchTerm);
      if (res.success) {
        setSearchResults(res.data);
        if (res.data.length === 0) {
          setMessage({ type: "info", text: "No se encontraron canciones." });
        }
      } else {
        setMessage({ type: "error", text: res.error });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error al buscar canciones." });
    } finally {
      setIsSearching(false);
    }
  };
  const handleSelectSong = (song) => {
    setSelectedSong(song);
    setSelectedKey(song.key || "C");
    setSearchResults([]);
    setSearchTerm("");
  };
  const handleAddSong = async () => {
    if (!selectedSong) return;
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await addSongToMisa(
        misaId,
        selectedSong.id,
        selectedMomentId ? parseInt(selectedMomentId) : null,
        selectedKey,
        token
      );
      if (res.success) {
        setMessage({ type: "success", text: "Canción agregada con éxito." });
        setSelectedSong(null);
        setSelectedMomentId("");
        setSelectedKey("");
        window.location.reload();
      } else {
        setMessage({ type: "error", text: res.error });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error al agregar la canción." });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCancelSelection = () => {
    setSelectedSong(null);
    setSelectedMomentId("");
    setSelectedKey("");
    setMessage({ type: "", text: "" });
  };
  useEffect(() => {
    const handleSelectMoment = (event) => {
      console.log("Event received in React:", event.detail);
      const { momentId } = event.detail;
      setSelectedMomentId(momentId);
      const element = document.getElementById("misa-song-manager");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("misa:select-moment", handleSelectMoment);
    return () => {
      window.removeEventListener("misa:select-moment", handleSelectMoment);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { id: "misa-song-manager", className: "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 mt-8", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4 text-gray-800 dark:text-gray-100", children: "Agregar Canción" }),
    message.text && /* @__PURE__ */ jsx(
      "div",
      {
        className: `p-3 rounded mb-4 text-sm ${message.type === "error" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" : message.type === "success" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"}`,
        children: message.text
      }
    ),
    !selectedSong ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            placeholder: "Buscar canción...",
            className: "flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: isSearching || !searchTerm.trim(),
            className: "bg-accent-main hover:bg-accent-main/90 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50",
            children: isSearching ? "Buscando..." : "Buscar"
          }
        )
      ] }),
      searchResults.length > 0 && /* @__PURE__ */ jsx("ul", { className: "divide-y divide-gray-200 dark:divide-gray-700 max-h-60 overflow-y-auto", children: searchResults.map((song) => /* @__PURE__ */ jsxs(
        "li",
        {
          className: "p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer flex justify-between items-center transition-colors",
          onClick: () => handleSelectSong(song),
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900 dark:text-gray-100", children: song.title }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: song.artist })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300", children: song.key })
          ]
        },
        song.id
      )) })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-4 animate-in fade-in slide-in-from-top-2 duration-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-lg text-gray-900 dark:text-gray-100", children: selectedSong.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400", children: selectedSong.artist })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleCancelSelection,
            className: "text-sm text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium",
            children: "Cambiar"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Momento" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: selectedMomentId,
              onChange: (e) => setSelectedMomentId(e.target.value),
              className: "w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Seleccionar momento..." }),
                moments.map((moment) => /* @__PURE__ */ jsx("option", { value: moment.id, children: moment.nombre }, moment.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Tono" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              value: selectedKey,
              onChange: (e) => setSelectedKey(e.target.value),
              className: "w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none",
              children: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].map(
                (key) => /* @__PURE__ */ jsx("option", { value: key, children: key }, key)
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleCancelSelection,
            className: "px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleAddSong,
            disabled: isSubmitting,
            className: "bg-accent-main hover:bg-accent-main/90 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-accent-main/20 disabled:opacity-50 disabled:scale-100",
            children: isSubmitting ? "Agregando..." : "Agregar a la Misa"
          }
        )
      ] })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const API_URL = "https://letras-acordes-backend.onrender.com/api";
  let misa = null;
  let error = null;
  let moments = [];
  let token = Astro2.cookies.get("token")?.value;
  if (id) {
    try {
      const [misaRes, momentsRes] = await Promise.all([
        fetch(`${API_URL}/misas/${id}`),
        getMoments()
      ]);
      if (misaRes.ok) {
        misa = await misaRes.json();
      } else {
        error = "No se encontró la misa.";
      }
      if (momentsRes.success && momentsRes.data) {
        moments = momentsRes.data;
      }
    } catch (e) {
      error = "Error de conexión.";
    }
  }
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": misa ? `${misa.title} - CancioneroDigital` : "Misa no encontrada" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-4xl mx-auto p-4"> ${error ? renderTemplate`<div class="text-center py-10"> <p class="text-red-500 font-bold text-xl">${error}</p> <a href="/misas" class="text-blue-500 hover:underline mt-4 block">
Volver a Misas
</a> </div>` : misa ? renderTemplate`<div> <div class="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4"> <div class="flex justify-between items-start"> <div> <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100"> ${misa.title} </h1> <p class="text-gray-600 dark:text-gray-400 mt-1 capitalize">
📅 ${formatDate(misa.dateMisa)} </p> </div> ${token && renderTemplate`<button class="text-xs bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors">
Editar Info
</button>`} </div> </div> <div class="space-y-6"> ${moments.map((moment) => {
    const momentSongs = misa.misaSongs.filter(
      (ms) => ms.momentId === moment.id
    );
    return renderTemplate`<div class="flex flex-col gap-2"> <div class="flex items-center justify-start gap-2"> <h2 class="text-xl font-bold"> ${moment.nombre}:
</h2> ${momentSongs.map((ms) => renderTemplate`<a${addAttribute(`/songs/${ms.song.id}`, "href")} class="text-sm text-white bg-accent-main/30 border-2 border-accent-main
                                                rounded-full px-4 py-2 text-center font-medium hover:text-white hover:bg-accent-main transition flex items-center gap-2"> <span class="text-center"> ${ms.song.title} </span> <span class="text-xs font-bold text-accent-main bg-white/20 px-1.5 py-0.5 rounded"> ${ms.key || ms.song.key} </span> </a>`)} <button${addAttribute(moment.id, "data-moment-id")} class="add-song-btn text-sm h-10 w-10 bg-accent-main text-white font-bold rounded-lg hover:saturate-200 transition-transform transform active:scale-95 flex items-center justify-center">
+
</button> </div> </div>`;
  })} </div> <div class="mt-8 flex justify-between"> <a href="/misas" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
← Volver al listado
</a>  </div> ${token && renderTemplate`${renderComponent($$result2, "MisaSongManager", MisaSongManager, { "client:load": true, "misaId": misa.id, "moments": moments, "token": token, "client:component-hydration": "load", "client:component-path": "@/components/MisaSongManager", "client:component-export": "default" })}`} </div>` : renderTemplate`<div class="text-center py-10"> <p class="text-gray-500">Cargando...</p> </div>`} </main> ` })} ${renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/pages/misas/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/dev/letras y acordes/letras-acordes/src/pages/misas/[id].astro", void 0);
const $$file = "C:/dev/letras y acordes/letras-acordes/src/pages/misas/[id].astro";
const $$url = "/misas/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
