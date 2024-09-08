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
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5116 3.39527C23.3825 2.89761 24.4445 2.86814 25.3416 3.31672L47.9056 14.5987L67.5116 3.39527C68.4401 2.8647 69.5808 2.8685 70.5058 3.40527C71.4307 3.94204 72 4.93059 72 6V54C72 55.0766 71.4231 56.0706 70.4884 56.6047L49.4884 68.6047C48.6175 69.1024 47.5555 69.1319 46.6584 68.6833L24.0944 57.4013L4.48842 68.6047C3.55991 69.1353 2.41916 69.1315 1.49422 68.5947C0.569275 68.058 0 67.0694 0 66V18C0 16.9234 0.576858 15.9294 1.51158 15.3953L22.5116 3.39527ZM24.0944 9.40131L6 19.741V60.8305L22.5116 51.3953C23.3825 50.8976 24.4445 50.8681 25.3416 51.3167L47.9056 62.5987L66 52.259V11.1695L49.4884 20.6047C48.6175 21.1024 47.5555 21.1319 46.6584 20.6833L24.0944 9.40131Z" fill="${activated ? "#116E9C" : "#CCCCCC"}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M24 3C25.6569 3 27 4.34315 27 6V54C27 55.6569 25.6569 57 24 57C22.3431 57 21 55.6569 21 54V6C21 4.34315 22.3431 3 24 3Z" fill="${activated ? "#116E9C" : "#CCCCCC"}"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M48 15C49.6569 15 51 16.3431 51 18V66C51 67.6569 49.6569 69 48 69C46.3431 69 45 67.6569 45 66V18C45 16.3431 46.3431 15 48 15Z" fill="${activated ? "#116E9C" : "#CCCCCC"}"/>
        </svg>`,
        fill,
        height,
        width,
        ...props,
    })
