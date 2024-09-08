/**
 * @file TabContainer.js
 * @brief Styled div component for containing tabs with a flexible layout and themed styling
 */
import styled from "styled-components";

/**
 * @brief TabContainer : Styled div component that serves as a container for tab elements.
 * @param position - The position of the tab container.
 * @param width - The width of the tab container.
 * @param margin - The margin of the tab container.
 * @param height - The height of the tab container.
 * @param bottom - The bottom margin of the tab container.
 * @param theme - The theme of the tab container.
 * 
 */
export const TabContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin: 26px 0 30px 0;

  &::after {
    content: "";
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: 0.5px;
    left: 0;
    background-color: ${props => props.theme ? '#CCCCCC' : ''};
  }
`;
