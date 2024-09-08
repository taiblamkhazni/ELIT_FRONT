/**
 * @file warning.js
 * @module warning
 * @description Ce module exporte un composant SVG représentant une icône warning.
 */
import { BaseSvg } from "../BaseSvg"

export default ({ height = "64px", width = "64px", ...props }) =>
    BaseSvg({
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="65" viewBox="0 0 64 65" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M32 24.5215C33.1046 24.5215 34 25.4169 34 26.5215V36.5215C34 37.6261 33.1046 38.5215 32 38.5215C30.8954 38.5215 30 37.6261 30 36.5215V26.5215C30 25.4169 30.8954 24.5215 32 24.5215Z" fill="black"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M29.0027 7.32768C29.9134 6.7996 30.9474 6.52148 32.0001 6.52148C33.0528 6.52148 34.0868 6.7996 34.9974 7.32768C35.9065 7.85487 36.6605 8.6125 37.1833 9.52409C37.1842 9.52563 37.185 9.52718 37.1859 9.52873L59.1821 47.5221C59.7078 48.4327 59.9851 49.4654 59.986 50.5168C59.9869 51.5683 59.7115 52.6015 59.1874 53.513C58.6633 54.4245 57.9089 55.1822 56.9997 55.7103C56.0905 56.2385 55.0585 56.5184 54.0071 56.5221L54.0001 56.5221H10.0001L9.99303 56.5221C8.9416 56.5184 7.90961 56.2385 7.00044 55.7103C6.09126 55.1822 5.33683 54.4245 4.81272 53.513C4.28861 52.6015 4.01323 51.5683 4.01416 50.5168C4.01509 49.4654 4.29231 48.4327 4.81803 47.5221L26.8142 9.52873C26.8151 9.52718 26.816 9.52563 26.8169 9.52409C27.3396 8.6125 28.0936 7.85487 29.0027 7.32768ZM28.5501 10.5221L30.2809 11.5242L8.28212 49.5221C8.28197 49.5224 8.28226 49.5219 8.28212 49.5221C8.10716 49.8255 8.01447 50.1702 8.01416 50.5204C8.01385 50.8708 8.10564 51.2153 8.28035 51.5191C8.45505 51.8229 8.70653 52.0755 9.00959 52.2515C9.31186 52.4271 9.65486 52.5204 10.0044 52.5221H53.9958C54.3453 52.5204 54.6883 52.4271 54.9906 52.2515C55.2936 52.0755 55.5451 51.8229 55.7198 51.5191C55.8945 51.2152 55.9863 50.8708 55.986 50.5204C55.9857 50.1703 55.8935 49.8265 55.7187 49.5233C55.7185 49.5229 55.7189 49.5237 55.7187 49.5233L33.7142 11.5155C33.5414 11.2135 33.2918 10.9625 32.9908 10.788C32.6898 10.6134 32.348 10.5215 32.0001 10.5215C31.6521 10.5215 31.3103 10.6134 31.0093 10.788C30.7083 10.9625 30.4587 11.2135 30.2859 11.5155L28.5501 10.5221Z" fill="black"/>
  <path d="M32 48.5215C33.6569 48.5215 35 47.1783 35 45.5215C35 43.8646 33.6569 42.5215 32 42.5215C30.3431 42.5215 29 43.8646 29 45.5215C29 47.1783 30.3431 48.5215 32 48.5215Z" fill="black"/>
</svg>
    `,
        height,
        width,
        ...props,
    })
