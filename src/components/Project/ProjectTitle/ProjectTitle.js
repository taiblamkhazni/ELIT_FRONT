/**
 * @file ProjectTitle.js
 * @brief Styled div component for displaying project titles with theme-based styling
 */
import styled from "styled-components";
/**
 * @brief Styled div component for project titles.
 *        It applies a specific font size, color, and weight based on the theme settings.
 */
export const ProjectTitle = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primaires.blue};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
`;
