/**
 * @file step3.js
 * @brief Ce module exporte un composant SVG représentant une icône step3.
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
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="${validated ? "#248BC0" : "#E9E9E9"}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5039 9.13176C15.7942 8.96587 16.1482 8.95605 16.4472 9.10557L23.9685 12.8662L30.5039 9.13176C30.8134 8.9549 31.1936 8.95617 31.5019 9.13509C31.8102 9.31401 32 9.64353 32 10V26C32 26.3589 31.8077 26.6902 31.4961 26.8682L24.4961 30.8682C24.2058 31.0341 23.8518 31.044 23.5528 30.8944L16.0315 27.1338L9.49614 30.8682C9.18664 31.0451 8.80639 31.0438 8.49807 30.8649C8.18976 30.686 8 30.3565 8 30V14C8 13.6411 8.19229 13.3098 8.50386 13.1318L15.5039 9.13176ZM16.0315 11.1338L10 14.5803V28.2768L15.5039 25.1318C15.7942 24.9659 16.1482 24.956 16.4472 25.1056L23.9685 28.8662L30 25.4197V11.7232L24.4961 14.8682C24.2058 15.0341 23.8518 15.044 23.5528 14.8944L16.0315 11.1338Z" fill="${
    validated ? "white" : "#7A7A7A"
}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 9C16.5523 9 17 9.44772 17 10V26C17 26.5523 16.5523 27 16 27C15.4477 27 15 26.5523 15 26V10C15 9.44772 15.4477 9 16 9Z" fill="${
    validated ? "white" : "#7A7A7A"
}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 13C24.5523 13 25 13.4477 25 14V30C25 30.5523 24.5523 31 24 31C23.4477 31 23 30.5523 23 30V14C23 13.4477 23.4477 13 24 13Z" fill="${
    validated ? "white" : "#7A7A7A"
}"/>
    </svg>`,
        fill,
        height,
        width,
        ...props,
    })
