/**
 * @file MenuTitle.js
 * @brief This module exports MenuTitle component
 */
import { Flex } from "antd";
import { Edit } from "assets/icons";
import styled from "styled-components";
import { base } from "theme/base";

export const CustomStyledFlex = styled(Flex)`
  &&& {
    line-height: normal;
    font-size: 18px;
    font-weight: ${({ $isactive }) => ($isactive ? 'bold' : 'normal')};
  }
`;

/** Projects List Title Component*/
export const MenuTitle = ({ isActive }) => {
  return (
    <Flex $isactive={isActive} align="center" gap="small">
      <Edit id="image-Touslesprojets" fill={base.colors.primaires.blueDark} data-testid="edit-icon" />
      <span id="texte-Touslesprojets">Tous les projets</span>
    </Flex>
  );
};
