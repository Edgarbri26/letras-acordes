import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { A as API_URL } from './songs_BpP3uNMI.mjs';

const SongCardReact = ({ song }) => {
  return /* @__PURE__ */ jsx("a", { href: `/songs/${song.id}`, className: "block group", children: /* @__PURE__ */ jsxs("article", { className: "bg-bg-secondary border border-white/5 rounded-xl p-5 hover:border-accent-main/50 transition-colors h-full", children: [
    /* @__PURE__ */ jsx(
      "h2",
      {
        style: { viewTransitionName: `song-title-${song.id}` },
        className: "text-xl font-bold text-white group-hover:text-accent-main transition-colors mb-1 truncate",
        children: song.title
      }
    ),
    /* @__PURE__ */ jsx(
      "p",
      {
        style: { viewTransitionName: `song-artist-${song.id}` },
        className: "text-text-secondary text-sm mb-4",
        children: song.artist
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxs(
        "span",
        {
          style: { viewTransitionName: `song-tone-${song.id}` },
          className: "text-xs bg-white/5 px-2 py-1 rounded text-text-secondary group-hover:bg-accent-main/10 group-hover:text-accent-main transition-colors",
          children: [
            "Tom: ",
            song.key
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "span",
        {
          style: { viewTransitionName: `song-category-${song.id}` },
          className: "text-xs bg-white/5 px-2 py-1 rounded text-text-secondary group-hover:bg-accent-main/10 group-hover:text-accent-main transition-colors",
          children: [
            "Categoría: ",
            song.category?.name
          ]
        }
      )
    ] })
  ] }) });
};

function GridSongs({ endpoint, initialSongs = [] }) {
  const [songs, setSongs] = useState(initialSongs);
  const [loading, setLoading] = useState(!initialSongs || initialSongs.length === 0);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        const url = endpoint || `${API_URL}/songs?limit=12`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch songs");
        }
        const data = await res.json();
        setSongs(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching songs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (endpoint || songs.length === 0) {
      fetchSongs();
    } else if (initialSongs.length > 0) {
      setLoading(false);
    }
  }, [endpoint]);
  const SkeletonCard = () => /* @__PURE__ */ jsxs("div", { className: "bg-bg-secondary border border-white/5 rounded-xl p-5 h-[130px] animate-pulse", children: [
    /* @__PURE__ */ jsx("div", { className: "h-6 bg-white/10 rounded w-3/4 mb-2" }),
    /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/5 rounded w-1/2 mb-4" }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: "h-6 w-16 bg-white/5 rounded" }),
      /* @__PURE__ */ jsx("div", { className: "h-6 w-24 bg-white/5 rounded" })
    ] })
  ] });
  if (error) {
    return /* @__PURE__ */ jsxs("div", { className: "text-red-500 py-10 text-center", children: [
      "Error al cargar canciones: ",
      error
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
    loading ? (
      // Show 6 skeletons while loading
      Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx(SkeletonCard, {}, i))
    ) : songs.map((song) => /* @__PURE__ */ jsx(SongCardReact, { song }, song.id)),
    songs.length === 0 && !loading && /* @__PURE__ */ jsx("div", { className: "text-center w-100 py-10 col-span-1 md:col-span-2 lg:col-span-3", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xl", children: "No se encontraron canciones." }) })
  ] });
}

function CategoryFilter({ isAdmin }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        if (res.ok) {
          const data = await res.json();
          if (isAdmin) {
            data.push({ id: -1, name: "Inactivas" });
          }
          setCategories(data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [isAdmin]);
  const SkeletonPill = () => /* @__PURE__ */ jsx("div", { className: "h-9 w-24 bg-white/5 rounded-full animate-pulse shrink-0" });
  return /* @__PURE__ */ jsxs("div", { className: "flex overflow-x-auto pb-4 gap-2 mb-4 scrollbar-hide mask-fade-right", children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "/songs/search/all",
        className: "px-4 py-2 rounded-full text-sm font-medium transition-colors bg-bg-secondary text-text-secondary hover:text-white hover:bg-white/10 whitespace-nowrap shrink-0",
        children: "Explorar Todas"
      }
    ),
    loading ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(SkeletonPill, {}, i)) : categories.map((cat) => /* @__PURE__ */ jsx(
      "a",
      {
        href: cat.id === -1 ? `/songs/search/all?active=false` : `/songs/search/all?categoryId=${cat.id}`,
        className: `px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${cat.id === -1 ? "bg-red-900/30 text-red-200 border border-red-500/30 hover:bg-red-900/50" : "bg-bg-secondary text-text-secondary hover:text-white hover:bg-white/10"}`,
        children: cat.name
      },
      cat.id
    ))
  ] });
}

export { CategoryFilter as C, GridSongs as G };
