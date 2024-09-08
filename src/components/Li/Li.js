/**
 * @file Li.js
 * @brief This module exports Input component
 */
import styled from "styled-components"

/** Custom Li of a list Component */
export const NotifyLi = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaires.grisMedium};
  padding: 12px 0px 7px 0px;
  min-height: 56px;
`
