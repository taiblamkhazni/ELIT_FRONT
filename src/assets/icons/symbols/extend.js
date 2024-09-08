/**
 * @file extend.js
 * @brief Ce module exporte un composant SVG représentant une icône extend.
 */
import { BaseSvg } from "../BaseSvg"

export default ({ height = "8px", width = "12px", ...props }) =>
    BaseSvg({
        svg: `<svg viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.59 0.590012L6 5.17001L1.41 0.590012L0 2.00001L6 8.00001L12 2.00001L10.59 0.590012Z" fill="#1F1A28"/>
    </svg>
    `,
        height,
        width,
        ...props,
    })
