import type { Song } from "../types/song";

export const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:3000/api";

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
        categoryId: parseInt(formData.get("categoryId")?.toString() || "1")
    };
};

export const createSong = async (formData: FormData): Promise<ServiceResponse> => {
    const data = extractSongData(formData);

    if (!data.title.trim()) {
        return { success: false, error: "El título de la canción es obligatorio." };
    }

    try {
        const res = await fetch(`${API_URL}/songs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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

export const updateSong = async (id: number, formData: FormData): Promise<ServiceResponse> => {
    const data = extractSongData(formData);

    if (!data.title.trim()) {
        return { success: false, error: "El título de la canción es obligatorio." };
    }

    try {
        const res = await fetch(`${API_URL}/songs/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
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
