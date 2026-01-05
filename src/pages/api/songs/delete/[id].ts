
import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const DELETE: APIRoute = async ({ params, cookies }) => {
    const { id } = params;
    const token = cookies.get("token")?.value;

    if (!id) {
        return new Response(JSON.stringify({ error: "ID de canción requerido" }), { status: 400 });
    }

    if (!token) {
        return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
    }

    // Verify user session
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
        return new Response(JSON.stringify({ error: "Sesión inválida" }), { status: 401 });
    }

    try {
        const { error } = await supabase
            .from("songs")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Supabase delete error:", error);
            return new Response(JSON.stringify({ error: "Error al eliminar en base de datos" }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (e) {
        console.error("Exception deleting song:", e);
        return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
    }
};
