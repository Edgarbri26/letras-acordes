import type { Misa } from "../types/misa";
import { API_URL, type ServiceResponse } from "./songs";

export const getMisas = async (): Promise<ServiceResponse<Misa[]>> => {
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

export const createMisa = async (title: string, dateMisa: string, token?: string): Promise<ServiceResponse<Misa>> => {
    try {
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (token) {
            headers["Cookie"] = `token=${token}`;
        }

        const res = await fetch(`${API_URL}/misas`, {
            method: "POST",
            headers,
            body: JSON.stringify({ title, dateMisa }),
        });

        if (!res.ok) {
            const errData = await res.json();
            return { success: false, error: "Error al crear la misa.", data: errData };
        }

        const data = await res.json();
        return { success: true, data };
    } catch (e) {
        console.error("Service exception:", e);
        return { success: false, error: "Error de conexión." };
    }
};
