/**
 * @file upload.js
 * @module upload
 * @description Ce module exporte un composant SVG représentant une icône upload.
 */
import { BaseSvg } from "../BaseSvg"

export default ({  height = "24px", width = "24px", ...props }) =>
    BaseSvg({
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload-cloud"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>`,
        height,
        width,
        ...props,
    })