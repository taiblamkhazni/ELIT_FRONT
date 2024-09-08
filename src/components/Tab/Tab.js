/**
 * @file Tab.js
 * @brief Styled div component for tab interface with conditional styling based on active state
 */
/**
 * @brief styled : import styled-components library
 */
import styled from "styled-components";

/**
 * @brief Styled div component representing a tab.
 * @param align - The alignment of the tab.
 * @param padding - The padding of the tab.
 * @param margin - The margin of the tab.
 * @param cursor - The cursor style of the tab.
 * @param font - The font size of the tab.
 * @param line - The line height of the tab.
 * @param color - The color of the tab.
 * @param border - The border of the tab.
 */
export const Tab = styled.div`
  display: flex;
  align-items: center;
  padding: 1px 3px 0 3px;
  margin-right: 16px;
  cursor: pointer;

  font-size: 18px;
  font-weight: 400;
  line-height: 40px;
  color: ${({ $isactive }) => ($isactive ? "#116E9C" : "#6a6a6a")};
  border-bottom: 2px solid
  ${({ $isactive }) => ($isactive ? "#116E9C" : "transparent")};
`;
