import { A as API_URL } from './songs_BpP3uNMI.mjs';

const getMisas = async (token) => {
  try {
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const res = await fetch(`${API_URL}/misas`, { headers });
    if (!res.ok) {
      return { success: false, error: "Error al obtener las misas." };
    }
    const data = await res.json();
    return { success: true, data };
  } catch (e) {
    console.error("Service exception:", e);
    return { success: false, error: e instanceof Error ? e.message : "Error de conexión." };
  }
};
const createMisa = async (title, dateMisa, visibility = "PUBLIC", token) => {
  try {
    console.log("createMisa called with:", { title, dateMisa, visibility, tokenExists: !!token });
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("createMisa headers:", headers);
    const res = await fetch(`${API_URL}/misas`, {
      method: "POST",
      headers,
      body: JSON.stringify({ title, dateMisa, visibility })
    });
    if (!res.ok) {
      const errData = await res.json().catch((e) => "Flux failed to parse error json");
      console.error("createMisa failed:", res.status, res.statusText, errData);
      return { success: false, error: "Error al crear la misa.", data: errData };
    }
    const data = await res.json();
    return { success: true, data };
  } catch (e) {
    console.error("Service exception:", e);
    return { success: false, error: e instanceof Error ? e.message : "Error de conexión." };
  }
};
const addSongToMisa = async (misaId, songId, momentId, key, token, editToken) => {
  try {
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    let url = `${API_URL}/misas/${misaId}/songs`;
    if (editToken) {
      url += `?edit_token=${editToken}`;
    }
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ songId, momentId, key })
    });
    if (!res.ok) {
      const errData = await res.json();
      return { success: false, error: "Error al agregar la canción.", data: errData };
    }
    const data = await res.json();
    return { success: true, data };
  } catch (e) {
    console.error("Service exception:", e);
    return { success: false, error: e instanceof Error ? e.message : "Error de conexión." };
  }
};
const cloneMisa = async (originalMisa, token) => {
  try {
    const createRes = await createMisa(`${originalMisa.title} (Copia)`, (/* @__PURE__ */ new Date()).toISOString(), "PRIVATE", token);
    if (!createRes.success || !createRes.data) {
      return { success: false, error: createRes.error || "Error al crear la copia de la misa." };
    }
    const newMisa = createRes.data;
    for (const song of originalMisa.misaSongs) {
      const key = song.key || song.song.key || "C";
      await addSongToMisa(newMisa.id, song.songId, song.momentId, key, token);
    }
    return { success: true, data: newMisa };
  } catch (e) {
    console.error("Service exception:", e);
    return { success: false, error: e instanceof Error ? e.message : "Error al clonar la misa." };
  }
};

export { addSongToMisa as a, cloneMisa as c, getMisas as g };
