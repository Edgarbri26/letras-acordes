import { API_URL, type ServiceResponse } from "./songs";

/**
 * Tipos para la respuesta de generación de acordes
 */
export interface ChordProResponse {
    success: boolean;
    type: "full" | "autocomplete";
    chordPro: string;
    metadata: {
        title: string;
        key: string;
        [key: string]: any;
    };
    chords: {
        list: string[];
        count: number;
        validation: {
            valid: boolean;
            invalidChords: string[];
        };
    };
}

/**
 * Parámetros para generar canción completa
 */
export interface GenerateFullSongParams {
    title: string;
    tone: string;
    category?: string;
    artist?: string;
}

/**
 * Parámetros para autocompletar acordes
 */
export interface AutocompleteParams {
    title: string;
    tone: string;
    lyrics: string;
}

/**
 * Genera una canción completa con letra y acordes usando IA
 * @param params - Parámetros de generación (título, tono, categoría)
 * @param token - Token de autenticación opcional
 * @returns Respuesta con la canción en formato ChordPro
 */
export const generateFullSong = async (
    params: GenerateFullSongParams,
    token?: string
): Promise<ServiceResponse<ChordProResponse>> => {
    try {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}/generate`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                type: "full",
                title: params.title,
                tone: params.tone,
                category: params.category || "Entrada",
                artist: params.artist || "",
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                error: errorData.message || "Error al generar la canción",
            };
        }

        const data: ChordProResponse = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Error en generateFullSong:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error de conexión con el servidor",
        };
    }
};

/**
 * Autocompleta acordes para una letra existente usando IA
 * @param params - Parámetros (título, tono, letra)
 * @param token - Token de autenticación opcional
 * @returns Respuesta con la letra con acordes en formato ChordPro
 */
export const autocompleteChordsWithAI = async (
    params: AutocompleteParams,
    token?: string
): Promise<ServiceResponse<ChordProResponse>> => {
    try {
        // Validación de parámetros
        if (!params.title || !params.tone || !params.lyrics) {
            return {
                success: false,
                error: "Título, tono y letra son requeridos",
            };
        }

        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}/generate/autocomplete`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                title: params.title,
                tone: params.tone,
                lyrics: params.lyrics,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                error: errorData.message || errorData.error || "Error al generar acordes",
            };
        }

        const data: ChordProResponse = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Error en autocompleteChordsWithAI:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Error de conexión con el servidor",
        };
    }
};
