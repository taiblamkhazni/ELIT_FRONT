/**
 * @file ELIT.js
 * @brief Ce module exporte un composant SVG représentant une icône ELIT.
 */
import { BaseSvg } from "../BaseSvg"

export default ({ width = "61px", height = "22px", ...props }) =>
    BaseSvg({
        svg: `<svg viewBox="0 0 58 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 18V0H11.6612V2.67429H2.8558V15.3257H11.6612V18H0ZM1.29569 10.1057V7.43143H10.2068V10.1057H1.29569Z" fill="#1F1A28"/>
        <path d="M16.7714 18V0H19.6272V15.3257H28.3004V18H16.7714Z" fill="#1F1A28"/>
        <path d="M32.4422 18V15.4286H35.4302V2.57143H32.4422V0H41.274V2.57143H38.286V15.4286H41.274V18H32.4422Z" fill="#1F1A28"/>
        <path d="M49.8028 18V2.67429H44.62V0H58V2.67429H52.6586V18H49.8028Z" fill="#1F1A28"/>
        </svg>`,
        height,
        width,
        ...props,
    })
