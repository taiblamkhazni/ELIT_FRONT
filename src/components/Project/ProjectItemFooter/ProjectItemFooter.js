/**
 * @file ProjectItemFooter.js
 * @brief Styled Row component from Ant Design for project item footers with theme-based styling
 */
import { Row } from "antd";
import styled from "styled-components";
/**
 * @brief Styled component for the footer of a project item.
 *        It uses the Row component from Ant Design and applies custom styling.
 *        The background color is derived from the theme, and padding is applied for layout.
 */
export const ProjectItemFooter = styled(Row)`
  padding: 8px 24px 8px 0;
  background-color: ${({ theme }) => theme.colors.secondaires.gris};
`;
