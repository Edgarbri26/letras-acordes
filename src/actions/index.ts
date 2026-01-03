import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { login } from "../services/auth";

export const server = {
    login: defineAction({
        accept: "json",
        input: z.object({
            email: z.string().email(),
            password: z.string().min(1),
        }),
        handler: async ({ email, password }, context) => {
            try {
                const response = await login(email, password);

                if (response && response.ok) {
                    // Forward cookies from backend to client
                    const setCookie = response.headers.get("set-cookie");

                    if (setCookie) {
                        const match = setCookie.match(/token=([^;]+)/);
                        const token = match ? match[1] : null;

                        if (token) {
                            context.cookies.set("token", token, {
                                path: "/",
                                httpOnly: true,
                                secure: import.meta.env.PROD,
                                sameSite: "lax",
                            });
                            return { success: true };
                        }
                    } else {
                        // Fallback for token in body
                        const responseClone = response.clone();
                        try {
                            const responseBody = await responseClone.json();
                            if (responseBody.token) {
                                context.cookies.set("token", responseBody.token, {
                                    path: "/",
                                    httpOnly: true,
                                    secure: import.meta.env.PROD,
                                    sameSite: "lax",
                                });
                                return { success: true };
                            }
                        } catch (e) {
                            // ignore
                        }
                    }
                    throw new ActionError({
                        code: "UNAUTHORIZED",
                        message: "Error: No se recibió el token de autenticación.",
                    });
                } else {
                    throw new ActionError({
                        code: "UNAUTHORIZED",
                        message: "Credenciales incorrectas",
                    });
                }
            } catch (error) {
                if (error instanceof ActionError) {
                    throw error;
                }
                console.error(error);
                throw new ActionError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Error interno del servidor",
                });
            }
        },
    }),
};
