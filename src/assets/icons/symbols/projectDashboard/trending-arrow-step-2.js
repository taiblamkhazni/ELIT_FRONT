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
        <g clip-path="url(#clip0_5847_29499)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M71.1213 15.8787C72.2929 17.0503 72.2929 18.9497 71.1213 20.1213L42.6213 48.6213C41.4497 49.7929 39.5503 49.7929 38.3787 48.6213L25.5 35.7426L5.12132 56.1213C3.94975 57.2929 2.05025 57.2929 0.87868 56.1213C-0.292893 54.9497 -0.292893 53.0503 0.87868 51.8787L23.3787 29.3787C24.5503 28.2071 26.4497 28.2071 27.6213 29.3787L40.5 42.2574L66.8787 15.8787C68.0503 14.7071 69.9497 14.7071 71.1213 15.8787Z" fill="${activated ? "#116E9C" : "#CCCCCC"}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M48 18C48 16.3431 49.3431 15 51 15H69C70.6569 15 72 16.3431 72 18V36C72 37.6569 70.6569 39 69 39C67.3431 39 66 37.6569 66 36V21H51C49.3431 21 48 19.6569 48 18Z" fill="${activated ? "#116E9C" : "#CCCCCC"}"/>
        </g>
        <defs>
        <clipPath id="clip0_5847_29499">
        <rect width="72" height="72" fill="white"/>
        </clipPath>
        </defs>
        </svg>`,
        fill,
        height,
        width,
        ...props,
    })
