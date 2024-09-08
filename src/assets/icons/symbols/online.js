/**
 * @file online.js
 * @module online
 * @description Ce module exporte un composant SVG représentant une icône online.
 */
import { BaseSvg } from "../BaseSvg"

export default ({  width = "17px", height = "16px", ...props }) =>
    BaseSvg({
        svg: `<svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5.11523" cy="5" r="4.375" fill="#34C759" stroke="white" stroke-width="1.25"/>
    </svg>        
    `,
        height,
        width,
        ...props,
    })