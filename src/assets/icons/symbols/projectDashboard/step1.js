/**
 * @file step1.js
 * @brief Ce module exporte un composant SVG représentant une icône step1.
 */
import { BaseSvg } from "assets/icons/BaseSvg"

export default ({
    fill = "#000",
    height = "40px",
    width = "40px",
    validated = false,
    ...props
}) =>
    BaseSvg({
        svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="${validated ? "#248BC0" : "#E9E9E9"}"/>
    <g clip-path="url(#clip0_2485_10631)">
    <path d="M22 18H10V20H22V18ZM22 14H10V16H22V14ZM10 24H18V22H10V24ZM29.5 19.5L31 21L24.01 28L19.5 23.5L21 22L24.01 25L29.5 19.5Z" fill="${
    validated ? "white" : "#7A7A7A"
}"/>
    </g>
    <defs>
    <clipPath id="clip0_2485_10631">
    <rect width="24" height="24" fill="white" transform="translate(8 8)"/>
    </clipPath>
    </defs>
    </svg>`,
        fill,
        height,
        width,
        ...props,
    })
