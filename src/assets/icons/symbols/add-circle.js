/**
 * @file add-circle.js
 * @brief Ce module exporte un composant SVG représentant une icône Circle.
 */
import { BaseSvg } from "../BaseSvg"

export default ({ fill = "#000", height = "24px", width = "24px", ...props }) =>
    BaseSvg({
        svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#E9E9E9"/>
    <path d="M20.8506 15.1357V16.665H12.0791V15.1357H20.8506ZM17.2822 11.4004V20.7168H15.6562V11.4004H17.2822Z" fill="#7A7A7A"/>
    </svg>`,
        fill,
        height,
        width,
        ...props,
    })
