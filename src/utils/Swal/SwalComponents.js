/**
 * @file SwalComponents.js
 * @brief Ce fichier définit les deux composants de SwalWithBootstrapButtons.
 */
import Swal from "sweetalert2"

import "./Swal.css"

export const SwalWithBootstrapButtons = Swal.mixin({
    customClass: {
        title: "title",
        htmlContainer: "container",
        actions: "actions",
        cancelButton: "cancelButton",
        confirmButton: "confirmButton",
        icon: "icon",
    },
})

export const SwalWithBootstrapButtonsSuccess = Swal.mixin({
    customClass: {
        title: "title-success",
        htmlContainer: "container",
        actions: "actions",
        cancelButton: "cancelButton",
        confirmButton: "confirmButton",
        icon: "icon",
    },
})

export const SwalSnackBarSuccess = Swal.mixin({
    toast: true,
    position: 'bottom-left',
    showConfirmButton: false,
    background: '#0C8660',
    color: "white",
    timer: 3000,
    width: 'auto'
})
export const SwalSnackBarSuccessProject = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    background: '#0C8660',
    color: "white",
    timer: 3000,
    width: 'auto'
})

export const SwalSnackBarError = Swal.mixin({
    toast: true,
    position: 'bottom-left',
    showConfirmButton: false,
    background: '#C91432',
    color: "white",
    timer: 3000,
    width: 'auto'
})
