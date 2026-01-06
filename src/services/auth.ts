import { API_URL } from "./songs";

export const register = async (name: string, email: string, password: string, phoneNumber?: string) => {


    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phoneNumber }),
    });

    return response;
};

export const login = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {


    if (!email || !password) {
        console.error("Email and Password are required");
        return null;
    }

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
    });

    return response;
}
