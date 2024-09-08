/**
 * @file ellipse.js
 * @brief Ce module exporte un composant SVG représentant une icône ellipse.
 */
import { BaseSvg } from "../BaseSvg"

export default ({ fill="none", width = "17px", height = "16px", ...props }) =>
    BaseSvg({
        svg: `<svg viewBox="0 0 16 16" fill="${fill}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="#CCCCCC" stroke-width="2"/>
    </svg>
    `,
        height,
        width,
        ...props,
    })
