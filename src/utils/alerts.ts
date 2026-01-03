import Swal, { type SweetAlertOptions } from 'sweetalert2';

const swalDark: SweetAlertOptions = {
    background: "#1f2937",
    color: "#fff",
    confirmButtonColor: "#f97316",
    cancelButtonColor: "#4b5563",
};

export const showAlert = (options: SweetAlertOptions) => {
    return Swal.fire({
        ...swalDark,
        ...options,
    } as SweetAlertOptions);
};

export const showSuccessToast = (title: string, text?: string, timer: number = 3000) => {
    return Swal.fire({
        ...swalDark,
        icon: "success",
        title: title,
        text: text,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: timer,
    });
};


export const showError = (title: string, text?: string) => {
    return Swal.fire({
        ...swalDark,
        icon: "error",
        title: title,
        text: text,
    });
};

export const showConfirm = (title: string, text: string, confirmText: string = "Sí", cancelText: string = "Cancelar") => {
    return Swal.fire({
        ...swalDark,
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        reverseButtons: true
    });
};

export const showLoading = (title: string) => {
    return Swal.fire({
        ...swalDark,
        title,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
};
