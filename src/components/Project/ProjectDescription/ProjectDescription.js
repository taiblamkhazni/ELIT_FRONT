/**
 * @file ProjectDescription.js
 * @brief Styled div component for displaying project descriptions with customizable styling
 */
import styled from "styled-components";

/**
 * @brief Styled component for project descriptions.
 *        Allows customization of font size, color, and top margin.
 *        Defaults to font size 14px, inherits color from theme, and a top margin of 14px unless reset.
 */
export const ProjectDescription = styled.div`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};
  color: ${({ theme }) => theme.colors.primaires.blueDark};
  margin-top: ${(props) => (props.resetMargin ? "0px" : "14px")};
  font-weight: 400;
`;
