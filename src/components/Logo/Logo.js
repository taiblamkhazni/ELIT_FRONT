/**
 * @file Logo.js
 * @brief This module exports the Logo component.
 *        It is used to display the logo of the application.
 *
 * The Logo component utilizes styled-components for styling and
 * Ant Design's Row and Col components for layout. It imports
 * the logo icon from the assets and displays it.
 */
import { LogoAuthen } from "assets/icons";
import styled from "styled-components"

/**
 * @brief Styled component for the wrapper around the logo.
 * It uses flexbox to center the logo.
 */
const WrapperLogo = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`

/**
 * Logo Component
 * This component renders the application's logo.
 *
 * @returns {React.Component} The Logo component.
 */
export default () => {
  return (
    <WrapperLogo >
      <LogoAuthen alt="Image logo elit" id="image-logo-elit" style={{ height: "2.5rem", width: "auto" }} data-testid="logo" />
    </WrapperLogo>
  )
}
