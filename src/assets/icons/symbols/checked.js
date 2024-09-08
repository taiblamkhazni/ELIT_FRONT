/**
 * @file checked.js
 * @brief Ce module exporte un composant SVG représentant une icône checked.
 */
import { BaseSvg } from "../BaseSvg"

export default ({ width = "17px", height = "16px", ...props }) =>
  BaseSvg({
    svg: `<svg viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path fill-rule="evenodd" clip-rule="evenodd" d="M8 12.5C10.2091 12.5 12 10.7091 12 8.5C12 6.29086 10.2091 4.5 8 4.5C5.79086 4.5 4 6.29086 4 8.5C4 10.7091 5.79086 12.5 8 12.5Z" fill="white"/>
           <path d="M8.5 0C6.91775 0 5.37103 0.469192 4.05544 1.34824C2.73985 2.22729 1.71447 3.47672 1.10897 4.93853C0.503466 6.40034 0.34504 8.00887 0.653721 9.56072C0.962403 11.1126 1.72433 12.538 2.84315 13.6569C3.96197 14.7757 5.38743 15.5376 6.93928 15.8463C8.49113 16.155 10.0997 15.9965 11.5615 15.391C13.0233 14.7855 14.2727 13.7602 15.1518 12.4446C16.0308 11.129 16.5 9.58225 16.5 8C16.4959 5.87952 15.6518 3.84705 14.1524 2.34764C12.653 0.848226 10.6205 0.00406613 8.5 0ZM12.3077 6.6L7.8 10.9077C7.68347 11.0173 7.52922 11.0779 7.36923 11.0769C7.29103 11.078 7.21338 11.0637 7.14077 11.0346C7.06815 11.0056 7.00201 10.9624 6.94616 10.9077L4.69231 8.75384C4.6298 8.6993 4.57896 8.63269 4.54285 8.558C4.50673 8.48331 4.4861 8.40209 4.48218 8.31922C4.47826 8.23635 4.49113 8.15354 4.52003 8.07578C4.54893 7.99801 4.59325 7.92689 4.65034 7.86669C4.70742 7.8065 4.77609 7.75846 4.85221 7.72548C4.92833 7.69249 5.01034 7.67524 5.0933 7.67476C5.17626 7.67428 5.25846 7.69058 5.33496 7.72267C5.41146 7.75477 5.48068 7.802 5.53846 7.86154L7.36923 9.60769L11.4615 5.70769C11.5812 5.6033 11.7366 5.5492 11.8952 5.5567C12.0538 5.56421 12.2034 5.63273 12.3126 5.74796C12.4219 5.86318 12.4824 6.01618 12.4815 6.17497C12.4806 6.33376 12.4183 6.48605 12.3077 6.6Z" fill="#248BC0"/>
          </svg>
    `,
    height,
    width,
    ...props,
  });
