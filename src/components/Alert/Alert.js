/**
 * @file Alert.js
 * @brief This module exports Error Warning component
 */
import styled from "styled-components"

/**
 * @brief ErrorAlert : error warning component
 */
export const ErrorAlert = styled.span`
  margin: ${(props) => (props.margin ? props.margin : "initial")};
  color: ${({ theme }) => theme.colors.avertissements.danger};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "initial")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "0.75rem")};
  font-style: ${(props) => (props.fontStyle ? props.fontStyle : "normal")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "400")};
`;
