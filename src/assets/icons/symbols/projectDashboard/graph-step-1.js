/**
 * @file trending-arrow.js
 * @brief Ce module exporte un composant SVG représentant une icône trending-arrow.
 */
import { BaseSvg } from "assets/icons/BaseSvg"

export default ({
    fill = "#000",
    height = "40px",
    width = "40px",
    activated = false,
    ...props
}) =>
    BaseSvg({
        svg: `<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.125 38.25C10.125 37.0074 11.1324 36 12.375 36H28.125C29.3676 36 30.375 37.0074 30.375 38.25C30.375 39.4926 29.3676 40.5 28.125 40.5H14.625V58.5C14.625 59.7426 13.6176 60.75 12.375 60.75C11.1324 60.75 10.125 59.7426 10.125 58.5V38.25Z" fill="${activated ? "#116E9C" : "#CCCCCC"}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.625 58.5C5.625 57.2574 6.63236 56.25 7.875 56.25H64.125C65.3676 56.25 66.375 57.2574 66.375 58.5C66.375 59.7426 65.3676 60.75 64.125 60.75H7.875C6.63236 60.75 5.625 59.7426 5.625 58.5Z" fill="${activated ? "#116E9C" : "#CCCCCC"}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.875 24.75C25.875 23.5074 26.8824 22.5 28.125 22.5H43.875C45.1176 22.5 46.125 23.5074 46.125 24.75C46.125 25.9926 45.1176 27 43.875 27H30.375V58.5C30.375 59.7426 29.3676 60.75 28.125 60.75C26.8824 60.75 25.875 59.7426 25.875 58.5V24.75Z" fill="${activated ? "#116E9C" : "#CCCCCC"}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M41.625 11.25C41.625 10.0074 42.6324 9 43.875 9H59.625C60.8676 9 61.875 10.0074 61.875 11.25V58.5C61.875 59.7426 60.8676 60.75 59.625 60.75H43.875C42.6324 60.75 41.625 59.7426 41.625 58.5V11.25ZM46.125 13.5V56.25H57.375V13.5H46.125Z" fill="${activated ? "#116E9C" : "#CCCCCC"}"/>
        </svg>
        `,
        fill,
        height,
        width,
        ...props,
    })
