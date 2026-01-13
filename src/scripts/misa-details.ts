import {
    removeSongFromMisa,
    updateMisa,
    deleteMisa,
    updateMisaSong,
} from "../services/misas";
import {
    showError,
    showSuccessToast,
    showConfirm,
    showLoading,
} from "@/utils/alerts";

import Swal from "sweetalert2";

const initMisaDetails = () => {
    // Edit Tone Logic
    const editToneBtns = document.querySelectorAll(
        'button[data-action="edit-tone"]',
    );
    editToneBtns.forEach((btn) => {
        // Clone button to remove existing listeners to prevent duplicates if function runs multiple times
        const newBtn = btn.cloneNode(true);
        btn.parentNode?.replaceChild(newBtn, btn);

        newBtn.addEventListener("click", async (e: Event) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent navigation from parent anchor

            const target = e.currentTarget as HTMLElement;
            const currentTone = target.getAttribute("data-current-tone");
            const misaId = Number(target.getAttribute("data-misa-id"));
            const misaSongId = Number(
                target.getAttribute("data-misa-song-id"),
            );
            const token = document
                .querySelector("main")
                ?.getAttribute("data-token");
            const editToken = document
                .querySelector("main")
                ?.getAttribute("data-edit-token");

            const { value: newTone } = await Swal.fire({
                title: "Cambiar Tono",
                input: "text",
                inputLabel: "Nuevo tono (ej: Do, Re, Mim)",
                inputValue: currentTone || "",
                showCancelButton: true,
                confirmButtonColor: "#f97316",
                cancelButtonColor: "#4b5563",
                confirmButtonText: "Guardar",
                background: "#1f2937",
                color: "#fff",
                inputValidator: (value) => {
                    if (!value) {
                        return "Debes escribir un tono";
                    }
                },
            });

            if (newTone && newTone !== currentTone) {
                showLoading("Actualizando...");
                try {
                    const res = await updateMisaSong(
                        misaId,
                        misaSongId,
                        newTone,
                        token || undefined,
                        editToken || undefined,
                    );
                    if (res.success) {
                        window.location.reload();
                    } else {
                        showError(
                            "Error",
                            res.error || "No se pudo actualizar el tono.",
                        );
                    }
                } catch (err) {
                    showError("Error", "Error de conexión.");
                }
            }
        });
    });

    const buttons = document.querySelectorAll(".add-song-btn");
    buttons.forEach((btn) => {
        // Avoid duplicate listeners
        if (btn.getAttribute("data-listener-attached") === "true") return;
        btn.setAttribute("data-listener-attached", "true");

        btn.addEventListener("click", () => {
            const momentId = btn.getAttribute("data-moment-id");
            console.log("Dispatching open-add-song-modal event", { momentId });
            window.dispatchEvent(
                new CustomEvent("open-add-song-modal", {
                    detail: { momentId },
                }),
            );
        });
    });

    const deleteButtons = document.querySelectorAll(
        'button[data-action="delete-song"]',
    );
    deleteButtons.forEach((btn) => {
        // Clone button to remove existing listeners
        const newBtn = btn.cloneNode(true);
        btn.parentNode?.replaceChild(newBtn, btn);

        newBtn.addEventListener("click", async (e: Event) => {
            e.preventDefault();

            const target = e.currentTarget as HTMLElement;
            const result = await showConfirm(
                "¿Eliminar canción?",
                "No podrás deshacer esta acción",
                "Sí, eliminar",
            );

            if (!result.isConfirmed) return;

            const misaId = Number(target.getAttribute("data-misa-id"));
            const misaSongId = Number(
                target.getAttribute("data-misa-song-id"),
            );

            const token = document
                .querySelector("main")
                ?.getAttribute("data-token");
            const editToken = document
                .querySelector("main")
                ?.getAttribute("data-edit-token");

            if (misaId && misaSongId && (token || editToken)) {
                // Mostrar loading
                showLoading("Eliminando...");

                try {
                    const res = await removeSongFromMisa(
                        misaId,
                        misaSongId,
                        token || undefined,
                        editToken || undefined,
                    );
                    if (res.success) {
                        window.location.reload();
                    } else {
                        showError(
                            "Error",
                            res.error || "Error al eliminar.",
                        );
                    }
                } catch (error) {
                    showError("Error", "Error de conexión.");
                }
            }
        });
    });

    const copyToClipboard = async (
        text: string,
        successTitle: string,
        successText: string,
    ) => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                showSuccessToast(successTitle, successText);
            } else {
                throw new Error("Clipboard API not available");
            }
        } catch (err) {
            console.error("Error al copiar", err);
            showError(
                "Error",
                "No se pudo copiar el enlace. Intenta hacerlo manualmente.",
            );
        }
    };

    const copyShareLinkBtn = document.getElementById("copyShareLinkBtn");
    if (copyShareLinkBtn) {
        // Clone button to remove existing listeners
        const newBtn = copyShareLinkBtn.cloneNode(true);
        copyShareLinkBtn.parentNode?.replaceChild(newBtn, copyShareLinkBtn);

        newBtn.addEventListener("click", () => {
            const target = newBtn as HTMLElement;
            const shareToken =
                target.getAttribute("data-share-token");
            if (shareToken) {
                // Construct URL to point to /misas/view/:id
                const path = window.location.pathname.replace("/misas/", "/misas/view/");
                const url = `${window.location.origin}${path}?share_token=${shareToken}`;
                copyToClipboard(
                    url,
                    "¡Enlace copiado!",
                    "Compártelo con quien quieras.",
                );
            } else {
                console.error("No share token found");
                showError(
                    "Error",
                    "No se encontró el token para compartir.",
                );
            }
        });
    }

    const copyEditorLinkBtn = document.getElementById("copyEditorLinkBtn");
    if (copyEditorLinkBtn) {
        // Clone button to remove existing listeners
        const newBtn = copyEditorLinkBtn.cloneNode(true);
        copyEditorLinkBtn.parentNode?.replaceChild(newBtn, copyEditorLinkBtn);

        newBtn.addEventListener("click", () => {
            const target = newBtn as HTMLElement;
            const editToken =
                target.getAttribute("data-edit-token");
            console.log("Copy Editor Btn clicked. Token:", editToken);

            if (editToken) {
                const url = `${window.location.origin}${window.location.pathname}?edit_token=${editToken}`;
                copyToClipboard(
                    url,
                    "¡Enlace de Editor copiado!",
                    "Ten cuidado con quién lo compartes.",
                );
            } else {
                console.error("No edit token found on button");
                showError("Error", "No se encontró el token de edición.");
            }
        });
    }

    // Edit Misa Logic
    const editMisaBtn = document.getElementById("editMisaBtn");
    const editMisaModal = document.getElementById("editMisaModal");
    const closeEditMisaModal =
        document.getElementById("closeEditMisaModal");
    const editMisaForm = document.getElementById(
        "editMisaForm",
    ) as HTMLFormElement;

    if (editMisaBtn && editMisaModal && closeEditMisaModal) {
        // Clone buttons to remove existing listeners
        const newEditMisaBtn = editMisaBtn.cloneNode(true);
        editMisaBtn.parentNode?.replaceChild(newEditMisaBtn, editMisaBtn);

        const newCloseEditMisaModal = closeEditMisaModal.cloneNode(true);
        closeEditMisaModal.parentNode?.replaceChild(newCloseEditMisaModal, closeEditMisaModal);

        newEditMisaBtn.addEventListener("click", () => {
            editMisaModal.classList.remove("hidden");
        });

        newCloseEditMisaModal.addEventListener("click", () => {
            editMisaModal.classList.add("hidden");
        });

        // Modal itself usually doesn't need clone if we check target
        editMisaModal.onclick = (e) => {
            if (e.target === editMisaModal) {
                editMisaModal.classList.add("hidden");
            }
        };
    }

    if (editMisaForm) {
        // Clone form to remove existing listeners
        const newEditMisaForm = editMisaForm.cloneNode(true);
        editMisaForm.parentNode?.replaceChild(newEditMisaForm, editMisaForm);

        newEditMisaForm.addEventListener("submit", async (e: Event) => {
            e.preventDefault();
            const targetForm = e.target as HTMLFormElement;
            const formData = new FormData(targetForm);
            const title = formData.get("title")?.toString() || "";
            const dateMisa = formData.get("dateMisa")?.toString() || "";
            const visibility = formData.get("visibility")?.toString() || "";
            const misaId = targetForm.getAttribute("data-misa-id");

            const token = document
                .querySelector("main")
                ?.getAttribute("data-token");
            const editToken = document
                .querySelector("main")
                ?.getAttribute("data-edit-token");

            if (!misaId) return;

            if (token || editToken) {
                // Loading button state
                const submitBtn = targetForm.querySelector(
                    "button[type='submit']",
                );
                const originalText = submitBtn
                    ? submitBtn.textContent
                    : "Guardar";

                if (submitBtn) {
                    submitBtn.setAttribute("disabled", "true");
                    submitBtn.textContent = "Guardando...";
                }

                try {
                    console.log("Calling updateMisa...");
                    const res = await updateMisa(
                        parseInt(misaId),
                        title,
                        dateMisa,
                        visibility,
                        token || undefined,
                        editToken || undefined,
                    );
                    console.log("updateMisa result:", res);

                    if (res.success) {
                        console.log("Success, showing toast...");
                        await showSuccessToast(
                            "¡Actualizado!",
                            "Los datos de la misa se han guardado",
                        );
                        console.log("Toast shown, reloading...");
                        window.location.reload();
                    } else {
                        showError(
                            "Error",
                            res.error || "Error al actualizar",
                        );

                        if (submitBtn) {
                            submitBtn.removeAttribute("disabled");
                            submitBtn.textContent = originalText;
                        }
                    }
                } catch (error) {
                    console.error(error);
                    showError("Error", "Error de conexión");

                    if (submitBtn) {
                        submitBtn.removeAttribute("disabled");
                        submitBtn.textContent = originalText;
                    }
                }
            }
        });
    }

    const deleteMisaBtn = document.getElementById("deleteMisaBtn");
    if (deleteMisaBtn) {
        // Clone button
        const newDeleteMisaBtn = deleteMisaBtn.cloneNode(true);
        deleteMisaBtn.parentNode?.replaceChild(newDeleteMisaBtn, deleteMisaBtn);

        newDeleteMisaBtn.addEventListener("click", async () => {
            const editMisaForm = document.getElementById(
                "editMisaForm",
            ) as HTMLFormElement;
            const misaId = editMisaForm?.getAttribute("data-misa-id");
            const token = document
                .querySelector("main")
                ?.getAttribute("data-token");

            if (!misaId || !token) return;

            const confirmed = await showConfirm(
                "¿Eliminar misa?",
                "Esta acción no se puede deshacer.",
                "Sí, eliminar",
            );

            if (confirmed.isConfirmed) {
                showLoading("Eliminando...");
                try {
                    const res = await deleteMisa(parseInt(misaId), token);
                    if (res.success) {
                        await showSuccessToast(
                            "Misa eliminada",
                            undefined,
                            1500,
                        );
                        window.location.href = "/misas";
                    } else {
                        showError(
                            "Error",
                            res.error || "Error al eliminar",
                        );
                    }
                } catch (e) {
                    showError("Error", "Error de conexión");
                }
            }
        });
    }
};

document.addEventListener("DOMContentLoaded", initMisaDetails);
document.addEventListener("astro:page-load", initMisaDetails);
