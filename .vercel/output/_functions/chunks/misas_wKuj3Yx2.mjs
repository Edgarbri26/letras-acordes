import { A as API_URL } from './songs_DJyb_bwy.mjs';

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

export { addSongToMisa as a, getMisas as g };
