import type { Song } from "../types/song";

export const API_URL = import.meta.env.PUBLIC_API_URL || (typeof window !== "undefined" ? "http://localhost:3000/api" : "http://localhost:3000/api");

export interface ServiceResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

const extractSongData = (formData: FormData): Omit<Song, "id" | "category"> => {
    return {
        title: formData.get("title")?.toString() || "",
        artist: formData.get("artist")?.toString() || "Desconocido",
        key: formData.get("key")?.toString() || "C",
        url_song: formData.get("url_song")?.toString() || "",
        content: formData.get("content")?.toString() || "",
        categoryId: parseInt(formData.get("categoryId")?.toString() || "1"),
        active: formData.get("active") === "on"
    };
};

export const createSong = async (formData: FormData, token?: string): Promise<ServiceResponse> => {
    const data = extractSongData(formData);

    if (!data.title.trim()) {
        return { success: false, error: "El título de la canción es obligatorio." };
    }

    try {
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (token) {
            headers["Cookie"] = `token=${token}`;
            // Or Authorization if you prefer
            // headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(`${API_URL}/songs`, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errData = await res.json();
            return { success: false, error: "Error al guardar la canción.", data: errData };
        }

        const savedSong = await res.json();
        return { success: true, data: savedSong };
    } catch (e) {
        console.error("Service exception:", e);
        return { success: false, error: "Error de conexión con el servidor." };
    }
};

export const updateSong = async (id: number, formData: FormData, token?: string): Promise<ServiceResponse> => {
    const data = extractSongData(formData);

    if (!data.title.trim()) {
        return { success: false, error: "El título de la canción es obligatorio." };
    }

    try {
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (token) {
            headers["Cookie"] = `token=${token}`;
        }

        const res = await fetch(`${API_URL}/songs/${id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errData = await res.json();
            return { success: false, error: "Error al actualizar la canción.", data: errData };
        }

        const updatedSong = await res.json();
        return { success: true, data: updatedSong };
    } catch (e) {
        console.error("Service exception:", e);
        return { success: false, error: "Error de conexión con el servidor." };
    }
};

export const searchSongs = async (query: string, categoryId: string = ""): Promise<ServiceResponse<Song[]>> => {
    try {
        const res = await fetch(`${API_URL}/songs?q=${encodeURIComponent(query)}&categoryId=${categoryId}`);
        if (!res.ok) {
            return { success: false, error: "Error al buscar canciones." };
        }
        const data = await res.json();
        return { success: true, data };
    } catch (e) {
        console.error("Service exception:", e);
        return { success: false, error: "Error de conexión." };
    }
};

export const getSongById = async (id: string | number): Promise<ServiceResponse<Song>> => {
    try {
        const res = await fetch(`${API_URL}/songs/${id}`);
        if (!res.ok) {
            return { success: false, error: "Error al obtener la canción." };
        }
        const data = await res.json();
        return { success: true, data };
    } catch (e) {
        console.error("Service exception:", e);
        return { success: false, error: "Error de conexión." };
    }
};


export const deleteSongById = async (id: number | string, token: string | undefined): Promise<ServiceResponse> => {
    try {
        const headers: HeadersInit = {};
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(`${API_URL}/songs/${id}`, {
            method: "DELETE",
            headers,
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            return { success: false, error: errData.error || "Error al eliminar la canción." };
        }

        return { success: true };
    } catch (e) {
        console.error("Service exception:", e);
        return { success: false, error: "Error de conexión con el servidor." };
    }
};
