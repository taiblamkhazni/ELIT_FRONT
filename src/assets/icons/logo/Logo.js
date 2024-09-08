/**
 * @file Logo.js
 * @brief Ce module exporte un composant SVG représentant une icône Logo.
 */
import { BaseSvg } from "../BaseSvg"

export default ({ width="23px", height="23px", ...props }) =>
    BaseSvg({
        svg: `<svg viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.5649 8.81732L12.2312 0.483604C11.8171 0.0695309 11.1457 0.0695308 10.7317 0.483604L0.360097 10.8552C-0.0539761 11.2692 -0.0539764 11.9406 0.360096 12.3547L2.6045 14.5991L12.3334 4.87015L18.4227 10.9595L20.5649 8.81732Z" fill="#1F1A28"/>
        <path d="M28.8505 12.3549C29.2646 11.9408 29.2647 11.2694 28.8506 10.8553L19.331 1.33579C18.917 0.921718 18.2456 0.921718 17.8315 1.33579L16.4391 2.72819L22.5284 8.81744L18.4225 12.9229L12.3335 6.83387L3.58638 15.5809L4.81012 16.8047C5.22419 17.2188 5.89554 17.2188 6.30961 16.8047L12.1648 10.9495L13.1466 11.9313L6.54168 18.5362L7.85473 19.8493C8.26881 20.2634 8.94015 20.2634 9.35422 19.8493L15.2094 13.9941L16.1912 14.9759L9.58629 21.5809L10.8993 22.8939C11.3134 23.308 11.9848 23.308 12.3988 22.8939L18.254 17.0387L19.2358 18.0205L12.6309 24.6255L13.8548 25.8494C14.2689 26.2634 14.9402 26.2635 15.3543 25.8494L28.8505 12.3549Z" fill="#248BC0"/>
        </svg>`,
        width,
        height,
        ...props,
    })