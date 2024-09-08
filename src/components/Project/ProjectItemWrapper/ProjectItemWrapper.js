/**
 * @file ProjectItemWrapper.js
 * @brief Styled list item component for wrapping project items with custom styling and cursor property
 */
import styled from "styled-components";

/**
 * @brief ItemWrapper : Styled list item component used to wrap individual items.
 */
const ItemWrapper = styled.li`
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  background-color: ${({ theme }) => theme.colors.secondaires.gris};
  cursor: ${(props) => props.cursor};
`;

/**
 * @brief ProjectItemWrapper : Styled list item component used to wrap individual project items.
 * @param children : The children components to be wrapped.
 * @param props : The properties of the item wrapper.
 * @returns The ItemWrapper component.
 */
export const ProjectItemWrapper = ({ children }, ...props) => {
  return (
    <ItemWrapper props={props}>
      {children}
    </ItemWrapper>
  );
};
