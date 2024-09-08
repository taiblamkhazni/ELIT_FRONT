/**
 * @file Textarea.js
 * @brief This module exports Textarea component
 */
import styled from "styled-components"
import { scrollBarStyle } from "theme/GlobalStyles"

/** Custom Textarea Component */
export const TextareaCustom = styled.textarea`
  margin-top: 0.5rem;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.primaires.blueDark};
  border-radius: 4px;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.secondaires.grisLight};
  background: ${(props) => (props.background ? props.background : "")};

  &:hover {
    outline: none;
    box-shadow: 0px 0px 2px ${({ theme }) => theme.colors.primaires.blueDark};
    transition: 0.15s;
  }
  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px ${({ theme }) => theme.colors.primaires.blueDark};
  }

  ${scrollBarStyle}
`
