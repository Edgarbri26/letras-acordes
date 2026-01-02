import { API_URL, type ServiceResponse } from "./songs";
import type { Moment } from "../types/misa";

export const getMoments = async (): Promise<ServiceResponse<Moment[]>> => {
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
