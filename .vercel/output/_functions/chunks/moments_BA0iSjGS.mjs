import { A as API_URL } from './songs_BpP3uNMI.mjs';

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

export { getMoments as g };
