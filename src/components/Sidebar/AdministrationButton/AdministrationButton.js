/**
 * @file AdministrationButton.js
 * @brief This module exports the AdministrationButton component.
 */
import { Flex, } from "antd";
import { Settings } from "assets/icons";
import styled from "styled-components";

/**
 * @brief Styled component for the Administration button.
 */
const AdminWrapper = styled(Flex)`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 8px;
  padding: 0 1.2rem ;
  gap: 0.5rem;

  font-weight: ${({ $isactive }) => ($isactive ? "700" : "500")};
  font-size: 13px;
  line-height: 56px;
  color: #2b0a3d;

  background: ${(props) =>
    props.checked ? "rgba(36, 139, 192, 0.1)" : "white"};

  &:hover {
    cursor: pointer;
    font-weight: 700;
    background: rgba(36, 139, 192, 0.1);
  }
`;

/**
 * @brief AdministrationButton component.
 * @returns {JSX.Element} The rendered AdministrationButton component.
 */
export default () => {
  return (
    <AdminWrapper data-testid="administration-button">
      <Settings fill="#248BC0" internFill="#2B0A3D" />
      <span>Administration</span>
    </AdminWrapper>
  );
};
