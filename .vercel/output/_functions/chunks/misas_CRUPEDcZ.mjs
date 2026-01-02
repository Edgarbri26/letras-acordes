import { A as API_URL } from './songs_C1QqldAr.mjs';

const getMisas = async () => {
  try {
    const res = await fetch(`${API_URL}/misas`);
    if (!res.ok) {
      return { success: false, error: "Error al obtener las misas." };
    }
    const data = await res.json();
    return { success: true, data };
  } catch (e) {
    console.error("Service exception:", e);
    return { success: false, error: "Error de conexión." };
  }
};
const addSongToMisa = async (misaId, songId, momentId, key, token) => {
  try {
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Cookie"] = `token=${token}`;
    }
    const res = await fetch(`${API_URL}/misas/${misaId}/songs`, {
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
    return { success: false, error: "Error de conexión." };
  }
};

export { addSongToMisa as a, getMisas as g };
