/**
 * @file inProgressStep.js
 * @module inProgressStep
 * @description Ce module exporte un composant SVG représentant une icône inProgressStep pour les étapes de remplissage de formulaires.
 */
import { BaseSvg } from "../BaseSvg"

export default ({ height = "16px", width = "16px", ...props }) =>
    BaseSvg({
        svg: `<svg viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16.5C12.4183 16.5 16 12.9183 16 8.5C16 4.08172 12.4183 0.5 8 0.5C3.58172 0.5 0 4.08172 0 8.5C0 12.9183 3.58172 16.5 8 16.5Z" fill="#248BC0"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 12.5C10.2091 12.5 12 10.7091 12 8.5C12 6.29086 10.2091 4.5 8 4.5C5.79086 4.5 4 6.29086 4 8.5C4 10.7091 5.79086 12.5 8 12.5Z" fill="white"/>
              </svg>`,
        height,
        width,
        ...props,
    })
