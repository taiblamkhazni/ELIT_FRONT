/**
 * @file step2.js
 * @brief Ce module exporte un composant SVG représentant une icône step2.
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
    <g clip-path="url(#clip0_2485_10788)">
    <path d="M26 21V28H12V14H17.02C17.07 13.29 17.24 12.62 17.5 12H10V30H28V23L26 21ZM24.5 26H13.5L16.25 22.47L18.21 24.83L20.96 21.29L24.5 26ZM27.3 16.89C27.74 16.19 28 15.38 28 14.5C28 12.01 25.99 10 23.5 10C21.01 10 19 12.01 19 14.5C19 16.99 21.01 19 23.49 19C24.37 19 25.19 18.74 25.88 18.3L29 21.42L30.42 20L27.3 16.89ZM23.5 17C22.12 17 21 15.88 21 14.5C21 13.12 22.12 12 23.5 12C24.88 12 26 13.12 26 14.5C26 15.88 24.88 17 23.5 17Z" fill="${
    validated ? "white" : "#7A7A7A"
}"/>
    </g>
    <defs>
    <clipPath id="clip0_2485_10788">
    <rect width="24" height="24" fill="white" transform="translate(8 8)"/>
    </clipPath>
    </defs>
    </svg>`,
        fill,
        height,
        width,
        ...props,
    })
