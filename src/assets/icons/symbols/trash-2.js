/**
 * @file trash-2.js
 * @module trash-2
 * @description Ce module exporte un composant SVG représentant une icône trash-2.
 */
import { BaseSvg } from "../BaseSvg"

export default ({ fill="#116E9C", height = "24px", width = "24px", ...props }) =>
    BaseSvg({
        svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z" fill="${fill}"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V5H15V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10ZM17 5V4C17 3.20435 16.6839 2.44129 16.1213 1.87868C15.5587 1.31607 14.7956 1 14 1H10C9.20435 1 8.44129 1.31607 7.87868 1.87868C7.31607 2.44129 7 3.20435 7 4V5H5C4.44772 5 4 5.44772 4 6V20C4 20.7957 4.31607 21.5587 4.87868 22.1213C5.44129 22.6839 6.20435 23 7 23H17C17.7957 23 18.5587 22.6839 19.1213 22.1213C19.6839 21.5587 20 20.7957 20 20V6C20 5.44772 19.5523 5 19 5H17ZM6 7V20C6 20.2652 6.10536 20.5196 6.29289 20.7071C6.48043 20.8946 6.73478 21 7 21H17C17.2652 21 17.5196 20.8946 17.7071 20.7071C17.8946 20.5196 18 20.2652 18 20V7H6Z" fill="${fill}"/>
    </svg>
    `,
        height,
        width,
        ...props,
    })
