import { e as createComponent, f as createAstro, r as renderTemplate, h as addAttribute, l as renderScript, k as renderComponent, m as maybeRenderHead, q as Fragment$1 } from '../../chunks/astro/server_B7r4Bv6B.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_BZZLFtxH.mjs';
import { g as getMoments } from '../../chunks/moments_BxgwvJ7z.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { s as searchSongs, A as API_URL } from '../../chunks/songs_DJyb_bwy.mjs';
import { a as addSongToMisa } from '../../chunks/misas_wKuj3Yx2.mjs';
export { renderers } from '../../renderers.mjs';

function MisaSongManager({ misaId, moments, token, editToken }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedMomentId, setSelectedMomentId] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    handleCancelSelection();
    setSearchResults([]);
    setSearchTerm("");
  };
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
    try {
      const res = await addSongToMisa(
        misaId,
        selectedSong.id,
        selectedMomentId ? parseInt(selectedMomentId) : null,
        selectedKey,
        token,
        editToken
      );
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "¡Añadida!",
          text: "La canción se agregó correctamente",
          timer: 1500,
          showConfirmButton: false,
          background: "#1f2937",
          color: "#fff"
        }).then(() => {
          window.location.reload();
        });
        setSelectedSong(null);
        setSelectedMomentId("");
        setSelectedKey("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.error || "No se pudo agregar la canción",
          background: "#1f2937",
          color: "#fff"
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error de conexión",
        background: "#1f2937",
        color: "#fff"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCancelSelection = () => {
    setSelectedSong(null);
    setSelectedKey("");
    setMessage({ type: "", text: "" });
  };
  useEffect(() => {
    window.openAddSongModal = (momentId) => {
      console.log("Global openAddSongModal called with:", momentId);
      setSelectedMomentId(momentId);
      setIsOpen(true);
    };
    return () => {
      delete window.openAddSongModal;
    };
  }, []);
  const selectedMoment = selectedMomentId ? moments.find((m) => m.id.toString() === selectedMomentId.toString()) : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: openModal,
        className: "w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-dashed border-gray-300 dark:border-gray-600 mt-8",
        children: "+ Agregar Canción Manualmente"
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 mx-4", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-800 dark:text-gray-100", children: "Agregar Canción" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: closeModal,
            className: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors",
            children: "✕"
          }
        )
      ] }),
      selectedMoment && !selectedSong && /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-4 border border-blue-100 dark:border-blue-800", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-blue-700 dark:text-blue-300 font-medium", children: [
          "Agregando a: ",
          /* @__PURE__ */ jsx("strong", { children: selectedMoment.nombre })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedMomentId(""),
            className: "text-xs text-blue-600 dark:text-blue-400 hover:underline",
            children: "Cancelar"
          }
        )
      ] }),
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
              className: "bg-accent-main hover:bg-accent-main/90 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-accent-main/20 disabled:opacity-50 disabled:scale-100 close-modal-btn",
              children: isSubmitting ? "Agregando..." : "Agregar a la Misa"
            }
          )
        ] })
      ] })
    ] }) }) })
  ] });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  let misa = null;
  let error = null;
  let moments = [];
  let token = Astro2.cookies.get("token")?.value;
  let editToken = Astro2.url.searchParams.get("edit_token");
  if (id) {
    try {
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const url = new URL(`${API_URL}/misas/${id}`);
      const shareToken = Astro2.url.searchParams.get("share_token");
      if (shareToken) url.searchParams.append("share_token", shareToken);
      if (editToken) url.searchParams.append("edit_token", editToken);
      const [misaRes, momentsRes] = await Promise.all([
        fetch(url.toString(), { headers }),
        getMoments()
      ]);
      if (misaRes.ok) {
        misa = await misaRes.json();
        misa.canEdit = misa.canEdit || misa.isOwner;
      } else {
        error = "No se encontr\xF3 la misa.";
      }
      if (momentsRes.success && momentsRes.data) {
        moments = momentsRes.data;
      }
    } catch (e) {
      error = "Error de conexi\xF3n.";
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
  return renderTemplate(_a || (_a = __template(["", " ", ' <!-- <script><\/script> --> <!-- Edit Misa Modal --> <div id="editMisaModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"> <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700 mx-4 overflow-hidden"> <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"> <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100">\nEditar Misa\n</h3> <button id="closeEditMisaModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">\u2715</button> </div> <form id="editMisaForm" class="p-6 space-y-4"', '> <div> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">T\xEDtulo</label> <input type="text" name="title"', ' required class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-main outline-none"> </div> <div> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha</label> <input type="datetime-local" name="dateMisa"', ' required class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-main outline-none"> </div> <div> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Visibilidad</label> <select name="visibility" id="visibilitySelect" class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-main outline-none"> <option value="PUBLIC"', '>P\xFAblica</option> <option value="PRIVATE"', '>Privada (Solo t\xFA y enlace)</option> </select> </div> <div class="flex justify-between pt-4"> <button type="button" id="deleteMisaBtn" class="bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 font-bold py-2 px-6 rounded-lg transition-colors">\nEliminar Misa\n</button> <button type="submit" class="bg-accent-main hover:bg-accent-main/90 text-white font-bold py-2 px-6 rounded-lg transition-transform transform active:scale-95">\nGuardar Cambios\n</button> </div> </form> </div> </div>'])), renderComponent($$result, "Layout", $$Layout, { "title": misa ? `${misa.title} - CancioneroDigital` : "Misa no encontrada" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-4xl mx-auto px-4 pt-8 sm:px-8"${addAttribute(token, "data-token")}${addAttribute(editToken, "data-edit-token")}> ${error ? renderTemplate`<div class="text-center py-10"> <p class="text-red-500 font-bold text-xl">${error}</p> <a href="/misas" class="text-blue-500 hover:underline mt-4 block">
Volver a Misas
</a> </div>` : misa ? renderTemplate`<div> <div class="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4 "> <div class="flex justify-between flex-col sm:flex-row sm:items-start items-center "> <div> <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100"> ${misa.title} </h1> <p class="text-gray-600 dark:text-gray-400 mt-1 capitalize">
📅 ${formatDate(misa.dateMisa)} </p> </div> <div class="flex gap-2"> ${misa.visibility === "PRIVATE" && (misa.isOwner || token || editToken || Astro2.url.searchParams.get(
    "share_token"
  )) && renderTemplate`<button id="copyShareLinkBtn"${addAttribute(misa.shareToken, "data-share-token")} class="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors flex items-center gap-1"> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path> <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path> </svg>
Link
</button>`} ${misa.isOwner && renderTemplate`<button id="copyEditorLinkBtn"${addAttribute(misa.editToken, "data-edit-token")} class="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-3 py-1 rounded hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center gap-1"> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path> <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path> </svg>
Link Editor
</button>`} <a${addAttribute(`/misas/view/${misa.id}${Astro2.url.search}`, "href")} class="text-xs bg-accent-main/10 text-accent-main px-3 py-1 rounded hover:bg-accent-main/20 transition-colors flex items-center gap-1" title="Modo Lectura"> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open"> ${renderComponent($$result2, "Fragment", Fragment$1, {}, { "default": async ($$result3) => renderTemplate` <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path> <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path> ` })} </svg>
Lectura
</a> ${misa.canEdit && renderTemplate`<button id="editMisaBtn" class="text-xs bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors">
Editar Info
</button>`} </div> </div> </div> <div class="space-y-6"> ${moments.map((moment) => {
    const momentSongs = misa.misaSongs.filter(
      (ms) => ms.momentId === moment.id
    );
    return renderTemplate`<div class="flex flex-col gap-2"> <div class="flex flex-col sm:flex-row sm:items-center justify-start gap-2 sm:gap-4 border-b border-white/5 pb-2 last:border-0"> <h2 class="text-xl font-bold sm:w-32 shrink-0 flex items-center gap-2"> ${moment.nombre}:
${misa.isOwner && renderTemplate`<button${addAttribute(moment.id, "data-moment-id")} class="sm:hidden add-song-btn text-xs h-6 w-6 bg-accent-main text-white font-bold rounded hover:saturate-200 transition-transform transform active:scale-95 flex items-center justify-center" title="Agregar canción"> <i class="fa-solid fa-plus"></i> </button>`} </h2> <div class="flex flex-wrap items-center gap-2"> ${momentSongs.map((ms) => renderTemplate`<div class="flex items-center gap-1 group"> <a${addAttribute(`/songs/${ms.song.id}?tone=${encodeURIComponent(ms.key || ms.song.key)}`, "href")} class="text-sm text-white bg-accent-main/30 border-2 border-accent-main
                                                        rounded-full px-4 py-2 text-center font-medium hover:text-white hover:bg-accent-main transition flex items-center gap-2"> <span class="text-center"> ${ms.song.title} </span> ${token || misa.canEdit ? renderTemplate`<button data-action="edit-tone"${addAttribute(
      misa.id,
      "data-misa-id"
    )}${addAttribute(
      ms.id,
      "data-misa-song-id"
    )}${addAttribute(
      ms.key || ms.song.key,
      "data-current-tone"
    )} class="text-xs font-bold text-accent-main bg-white/20 px-1.5 py-0.5 rounded hover:bg-white/40 transition-colors" title="Cambiar tono" onclick="event.preventDefault()"> ${ms.key || ms.song.key} </button>` : renderTemplate`<span class="text-xs font-bold text-accent-main bg-white/20 px-1.5 py-0.5 rounded"> ${ms.key || ms.song.key} </span>`} </a> <div class="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"> ${misa.canEdit && renderTemplate`<a${addAttribute(`/edit-song/${ms.song.id}`, "href")} class="text-gray-400 hover:text-accent-main p-1 transition-colors" title="Editar canción"> <i class="fa-solid fa-pen-to-square w-4 h-4 flex items-center justify-center"></i> </a>`} ${(token || misa.canEdit) && renderTemplate`<button data-action="delete-song"${addAttribute(
      misa.id,
      "data-misa-id"
    )}${addAttribute(
      ms.id,
      "data-misa-song-id"
    )} class="text-gray-400 hover:text-red-500 p-1 transition-colors" title="Eliminar canción"> <i class="fa-solid fa-trash w-4 h-4 flex items-center justify-center"></i> </button>`} </div> </div>`)} ${misa.isOwner && renderTemplate`<button${addAttribute(moment.id, "data-moment-id")} class="hidden sm:block add-song-btn text-sm h-10 w-10 bg-accent-main text-white font-bold rounded-lg hover:saturate-200 transition-transform transform active:scale-95 flex items-center justify-center" title="Agregar canción"> <i class="fa-solid fa-plus"></i> </button>`} </div> </div> </div>`;
  })} </div> <div class="mt-8 flex justify-between"> <a href="/misas" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
← Volver al listado
</a>  </div> ${misa.canEdit ? renderTemplate`${renderComponent($$result2, "MisaSongManager", MisaSongManager, { "client:load": true, "misaId": misa.id, "moments": moments, "token": token, "editToken": editToken, "client:component-hydration": "load", "client:component-path": "@/components/MisaSongManager", "client:component-export": "default" })}` : !Astro2.url.searchParams.has("share_token") && renderTemplate`<div class="mt-8 text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700"> <p class="text-gray-600 dark:text-gray-400 mb-4">
Inicia sesión para agregar canciones y
                                    editar la misa.
</p> <a href="/login" class="inline-block bg-accent-main text-white font-medium px-6 py-2 rounded-lg hover:bg-accent-main/90 transition-colors">
Iniciar Sesión
</a> </div>`} </div>` : renderTemplate`<div class="text-center py-10"> <p class="text-gray-500">Cargando...</p> </div>`} </main> ` }), renderScript($$result, "C:/dev/letras y acordes/letras-acordes/src/pages/misas/[id].astro?astro&type=script&index=0&lang.ts"), addAttribute(id, "data-misa-id"), addAttribute(misa?.title, "value"), addAttribute(misa?.dateMisa ? new Date(misa.dateMisa).toISOString().slice(0, 16) : "", "value"), addAttribute(misa?.visibility === "PUBLIC", "selected"), addAttribute(misa?.visibility === "PRIVATE", "selected"));
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
