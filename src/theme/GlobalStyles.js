/**
 * @file GloblaStyles.js
 * @brief Ce fichier définit plusieurs composants de style.
 * @details Chaque composant est un style spécifique.
 */
import { createGlobalStyle, css } from "styled-components"
/**
 *
 * @param theme - The theme to use.
 * @param customColor - The color choosed.
 *
 * @returns Composant.
 */
export const scrollBarStyle = css`
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme, customColor }) => customColor ? customColor : theme.colors.primaires.blue};
  }
  scroll-behavior: smooth;
`
/**
 * Determines the color for a project's status button.
 *
 * @param theme - The theme to use.
 *
 * @returns Composant.
 */
export const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.backgrounds.white};
        color: ${({ theme }) => theme.colors.primaires.blueDark};
        font-family: ${({ theme }) => theme.font};
        transition: all 0.50s linear;
        box-sizing: border-box;
        margin: 0;
        padding: 0 !important;
        ${scrollBarStyle}
    }
    .ant-modal-wrap {
        overflow-x: hidden;
        ${scrollBarStyle}
    }

    input[type="checkbox"] {
      width: 1.15em;
      height: 1.15em;
      border-radius: 0.15em;
      transform: translateY(-0.075em);
      vertical-align: middle;
      accent-color: ${({ theme }) => theme.colors.primaires.blue};
    }
`
