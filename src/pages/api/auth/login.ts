import type { APIRoute } from "astro";
import { login } from "../../../services/auth";

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return new Response(
                JSON.stringify({
                    message: "Email y contraseña son requeridos",
                }),
                { status: 400 },
            );
        }

        const response = await login(email, password);

        if (response && response.ok) {
            // Forward cookies from backend to client
            const setCookie = response.headers.get("set-cookie");

            if (setCookie) {
                const match = setCookie.match(/token=([^;]+)/);
                const token = match ? match[1] : null;

                if (token) {
                    cookies.set("token", token, {
                        path: "/",
                        httpOnly: true,
                        secure: import.meta.env.PROD,
                        sameSite: "lax",
                    });
                    return new Response(
                        JSON.stringify({ success: true }),
                        { status: 200 },
                    );
                }
            } else {
                // Fallback: try to see if token is in body (though previous code suggested it might be)
                // If the backend returns the token in the body as well, we can use it.
                // But typically if we can't extract it from headers/body as expected, we fail safely.
                // Let's assume for now if we didn't get the cookie, we check body just in case the service struct changed,
                // but based on previous code, let's stick to the cookie logic mainly or both.
                // The previous code had a fallback for body logic. Let's keep it safe.
                const responseClone = response.clone();
                try {
                    const responseBody = await responseClone.json();
                    if (responseBody.token) {
                        cookies.set("token", responseBody.token, {
                            path: "/",
                            httpOnly: true,
                            secure: import.meta.env.PROD,
                            sameSite: "lax",
                        });
                        return new Response(
                            JSON.stringify({ success: true }),
                            { status: 200 },
                        );
                    }
                } catch (e) {
                    // ignore json parse error
                }
            }
            return new Response(
                JSON.stringify({
                    message: "Error: No se recibió el token de autenticación.",
                }),
                { status: 500 },
            );

        } else {
            return new Response(
                JSON.stringify({ message: "Credenciales incorrectas" }),
                { status: 401 },
            );
        }
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: "Error interno del servidor" }),
            { status: 500 },
        );
    }
};
