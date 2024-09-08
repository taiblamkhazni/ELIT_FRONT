/**
 * @file aideDe.js
 * @brief Ce module exporte un composant SVG représentant une icône aide.
 */
import { BaseSvg } from "../BaseSvg"

export default ({ fill = "#000", height = "56px", width = "56px", ...props }) =>
    BaseSvg({
        svg: `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="28" fill="#6FC1E2"/>
    <path d="M26.975 38.85C26.9197 39.067 26.794 39.2596 26.6175 39.3976C26.4411 39.5356 26.2239 39.6111 26 39.6125C25.9193 39.6122 25.8392 39.5996 25.7625 39.575L21.9875 38.6375C21.6813 38.5602 21.3983 38.4101 21.1625 38.2L18.35 35.75C18.2515 35.6647 18.1708 35.5607 18.1124 35.4442C18.0541 35.3276 18.0193 35.2007 18.01 35.0707C18.0007 34.9407 18.0171 34.8102 18.0583 34.6865C18.0995 34.5628 18.1646 34.4485 18.25 34.35C18.3353 34.2515 18.4392 34.1708 18.5558 34.1125C18.6723 34.0541 18.7992 34.0193 18.9292 34.0101C19.0592 34.0008 19.1898 34.0172 19.3135 34.0584C19.4371 34.0995 19.5515 34.1647 19.65 34.25L22.475 36.7L26.2375 37.6375C26.4948 37.7026 26.7163 37.8661 26.8542 38.0929C26.9921 38.3197 27.0355 38.5916 26.975 38.85ZM43.55 26.95C43.4678 27.2018 43.3358 27.4344 43.1618 27.6341C42.9879 27.8338 42.7755 27.9965 42.5375 28.1125L39.625 29.575L37.7625 31.7625H37.7375C37.7375 31.775 37.725 31.775 37.725 31.7875H37.7125L33.1125 36.3875C32.7312 36.7601 32.2205 36.9707 31.6875 36.975C31.5272 36.9735 31.3677 36.9525 31.2125 36.9125L23.9625 35.125C23.6887 35.0611 23.4326 34.9373 23.2125 34.7625L16.4625 29.4875L13.4625 27.9875C12.9832 27.7446 12.6193 27.3223 12.45 26.8125C12.3699 26.5599 12.3408 26.2939 12.3644 26.03C12.388 25.766 12.4638 25.5094 12.5875 25.275L15.6625 19.3875C15.9055 18.9242 16.3193 18.5737 16.8164 18.4104C17.3134 18.247 17.8545 18.2837 18.325 18.5125L21.125 19.9125L27.2125 18.1375C27.6688 18.0132 28.1539 18.0484 28.5875 18.2375L32.7125 20.1125H34.7625L37.675 18.65C38.1434 18.417 38.6845 18.3767 39.1822 18.538C39.6799 18.6992 40.0947 19.0491 40.3375 19.5125L43.4125 25.4C43.5365 25.6365 43.6124 25.8953 43.636 26.1613C43.6596 26.4273 43.6304 26.6953 43.55 26.95ZM35.4625 31.225L31.5125 28.35L30.5 29.1125C29.6329 29.7578 28.5808 30.1063 27.5 30.1063C26.4191 30.1063 25.3671 29.7578 24.5 29.1125L23.825 28.6C23.5944 28.4292 23.4035 28.2105 23.2654 27.959C23.1274 27.7074 23.0454 27.4289 23.0252 27.1427C23.0051 26.8564 23.0471 26.5692 23.1485 26.3008C23.2498 26.0323 23.4081 25.789 23.6125 25.5875L28.5 20.6875L28.725 20.5L27.7625 20.0625L21.675 21.8375L18.275 28.3625L24.45 33.1875L31.6875 35L35.4625 31.225ZM37.8 28.6375L34.4 22.1125H29.9125L25.025 27L25.7 27.5125C26.2216 27.8963 26.8523 28.1033 27.5 28.1033C28.1476 28.1033 28.7783 27.8963 29.3 27.5125L30.9 26.3125C31.0706 26.1838 31.2779 26.1131 31.4917 26.1109C31.7054 26.1086 31.9142 26.1749 32.0875 26.3L36.8375 29.75L37.8 28.6375Z" fill="white"/>
    </svg>`,
        fill,
        height,
        width,
        ...props,
    })