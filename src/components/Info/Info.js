/**
 * @file Info.js
 * @brief This module exports Info component
 */
import styled from "styled-components"

/**
 * @brief InfoWrapper : Info Text Wrapper Component
 */
export const InfoWrapper = styled.div`
  font-weight: 400;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "12px")};
  line-height: 24px;
  color: ${({ theme }) => theme.colors.secondaires.grisDark};
  min-height: ${(props) => (props.minHeight ? props.minHeight : "0px")};
  display: ${(props) => (props.display ? props.display : "block")};
  margin: ${(props) => (props.margin ? props.margin : "0")};
`
