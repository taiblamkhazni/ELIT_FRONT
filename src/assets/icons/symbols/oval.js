/**
 * @file oval.js
 * @module oval
 * @description Ce module exporte un composant SVG représentant une icône oval.
 */
import { BaseSvg } from "../BaseSvg"

export default ({ fill, width = "17px", height = "16px", ...props }) =>
    BaseSvg({
        svg: `<svg viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 16C12.9183 16 16.5 12.4183 16.5 8C16.5 3.58172 12.9183 0 8.5 0C4.08172 0 0.5 3.58172 0.5 8C0.5 12.4183 4.08172 16 8.5 16Z" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 12C10.7091 12 12.5 10.2091 12.5 8C12.5 5.79086 10.7091 4 8.5 4C6.29086 4 4.5 5.79086 4.5 8C4.5 10.2091 6.29086 12 8.5 12Z" fill="${fill}"/>
    </svg>    
    `,
        height,
        width,
        ...props,
    })