/**
 * @file Text.js
 * @brief This module exports Text component
 */
import styled from "styled-components"

/** Custom Normal Text Component */
export const Text = styled.p`
  cursor: ${(props) => (props.cursor ? props.cursor : "pointer")};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem;
  color: ${(props) => (props.color ? props.color : "")};
  margin: ${(props) => (props.margin ? props.margin : "0 0 0 0")};
`

/** Custom Small Text Component */
export const SmallText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "12px")};
  line-height: 16px;
  color: ${(props) => (props.color ? props.color : "")};
  margin: ${(props) => (props.margin ? props.margin : "0 0 0 0")};
`

/** Custom Small Text HyperLink Component */
export const SmallTextHyperLink = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "12px")};
  line-height: 16px;
  color: ${(props) => (props.color ? props.color : "")};
  margin: ${(props) => (props.margin ? props.margin : "0 0 0 0")};
  &:hover {
    text-decoration: ${(props) =>
        props.textDecoration ? props.textDecoration : "underline"};
    cursor: ${(props) => (props.cursor ? props.cursor : "pointer")};
  }
`

/** Custom Bold Text Component */
export const TextBold = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: ${(props) => (props.textAlign ? props.textAlign : "")};
  color: ${(props) => (props.color ? props.color : "")};
  margin: ${(props) => (props.margin ? props.margin : "0 0 0 0")};
`

/** Custom Light Text Component */
export const TextLight = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  color: ${(props) => (props.color ? props.color : "")};
  margin: ${(props) => (props.margin ? props.margin : "0 0 0 0")};
`

/** Custom Normal Description of Title Component */
export const SubText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${(props) => (props.color ? props.color : "")};
  margin: ${(props) => (props.margin ? props.margin : "0 0 0 0")};
`
