/**
 * @file Link.js
 * @brief This module exports StyledLink component
 */
import {Link as RouterLink} from "react-router-dom";
import styled from "styled-components"
import { base } from "theme/base"
/** Custom Style of a link Component */
export const StyledLink = styled(RouterLink)`
  & {
    text-decoration: none;
    color: ${base.colors.primaires.blue};
  }

  &:hover{
    text-decoration: none;
    color: ${base.colors.secondaires.blue};
}
`;
