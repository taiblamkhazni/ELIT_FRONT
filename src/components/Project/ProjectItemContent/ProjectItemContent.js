/**
 * @file ProjectItemContent.js
 * @brief Styled div component for project item content with customizable background
 */
import styled from "styled-components";

/**
 * @brief Styled component for the content of a project item.
 *        It allows a customizable background color and has fixed padding.
 */
export const ProjectItemContent = styled.div`
  background-color: ${(props) => props.background};
  padding: 30px 24px;
`;
