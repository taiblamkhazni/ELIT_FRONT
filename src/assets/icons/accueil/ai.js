/**
 * @file ai.js
 * @brief Ce module exporte un composant SVG représentant une icône AI.
 */
import { BaseSvg } from "../BaseSvg"

export default ({ fill = "#000", height = "56px", width = "56px", ...props }) =>
    BaseSvg({
        svg: `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="28" fill="#FA927D"/>
    <path d="M36.3235 21.2468H29.0854V15.7056C29.0854 15.4301 28.971 15.1658 28.7674 14.971C28.5638 14.7761 28.2876 14.6667 27.9997 14.6667C27.7117 14.6667 27.4356 14.7761 27.232 14.971C27.0283 15.1658 26.914 15.4301 26.914 15.7056V21.2468H19.6759C18.5252 21.2502 17.4226 21.6891 16.609 22.4678C15.7953 23.2464 15.3366 24.3015 15.333 25.4026V37.1775C15.3366 38.2786 15.7953 39.3337 16.609 40.1123C17.4226 40.891 18.5252 41.3299 19.6759 41.3333H36.3235C37.4742 41.3299 38.5767 40.891 39.3904 40.1123C40.2041 39.3337 40.6628 38.2786 40.6663 37.1775V25.4026C40.6628 24.3015 40.2041 23.2464 39.3904 22.4678C38.5767 21.6891 37.4742 21.2502 36.3235 21.2468ZM20.3997 27.6537C20.3997 27.3455 20.4952 27.0441 20.6741 26.7879C20.8531 26.5316 21.1074 26.3318 21.405 26.2139C21.7026 26.0959 22.0301 26.0651 22.346 26.1252C22.6619 26.1853 22.9521 26.3337 23.1798 26.5517C23.4076 26.7697 23.5627 27.0473 23.6255 27.3496C23.6884 27.652 23.6561 27.9653 23.5329 28.2501C23.4096 28.5348 23.2008 28.7782 22.933 28.9495C22.6652 29.1207 22.3503 29.2121 22.0282 29.2121C21.5963 29.2121 21.1821 29.0479 20.8767 28.7557C20.5713 28.4634 20.3997 28.067 20.3997 27.6537ZM26.3711 37.5238H23.114C22.5381 37.5238 21.9858 37.3049 21.5785 36.9152C21.1713 36.5255 20.9425 35.997 20.9425 35.4459C20.9425 34.8948 21.1713 34.3663 21.5785 33.9766C21.9858 33.5869 22.5381 33.368 23.114 33.368H26.3711V37.5238ZM29.6282 37.5238H26.3711V33.368H29.6282V37.5238ZM32.8854 37.5238H29.6282V33.368H32.8854C33.4613 33.368 34.0136 33.5869 34.4208 33.9766C34.828 34.3663 35.0568 34.8948 35.0568 35.4459C35.0568 35.997 34.828 36.5255 34.4208 36.9152C34.0136 37.3049 33.4613 37.5238 32.8854 37.5238ZM33.9711 29.2121C33.649 29.2121 33.3341 29.1207 33.0663 28.9495C32.7985 28.7782 32.5898 28.5348 32.4665 28.2501C32.3432 27.9653 32.311 27.652 32.3738 27.3496C32.4367 27.0473 32.5918 26.7697 32.8195 26.5517C33.0473 26.3337 33.3375 26.1853 33.6534 26.1252C33.9693 26.0651 34.2967 26.0959 34.5943 26.2139C34.8919 26.3318 35.1463 26.5316 35.3252 26.7879C35.5042 27.0441 35.5997 27.3455 35.5997 27.6537C35.5997 28.067 35.4281 28.4634 35.1227 28.7557C34.8173 29.0479 34.403 29.2121 33.9711 29.2121Z" fill="white"/>
    <circle cx="27.9997" cy="16" r="2.66667" fill="white"/>
    </svg>`,
        fill,
        height,
        width,
        ...props,
    })
