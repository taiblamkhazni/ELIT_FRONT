/**
 * @file Input.js
 * @brief This module exports Input component
 */
import {Input} from "antd";
import styled from "styled-components"

/** Custom Input Component **/
export const InputCustom = styled(Input)`
  height: 2.5rem;
  width: 100%;
  line-height: 1em;

  border-radius: 4px;
  border: 1px solid ${({ hasError, theme }) => hasError ? theme.colors.avertissements.danger : theme.colors.secondaires.grisMedium};

  color: ${({ theme }) => theme.colors.primaires.blueDark};
  font-size: "16px";

  &:hover {
    outline: none;
    box-shadow: 0 0 2px ${({ theme }) => theme.colors.primaires.blueDark};
    transition: 0.15s;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 2px ${({ theme }) => theme.colors.primaires.blueDark};
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

/** Custom Input Component when antd Input create conflict **/
export const SimpleInputCustom = styled.input`
  height: 2.5rem;
  width: 100%;
  line-height: 1em;

  border-radius: 4px;
  border: 1px solid ${({ hasError, theme }) => hasError ? theme.colors.avertissements.danger : theme.colors.secondaires.grisMedium};

  color: ${({ theme }) => theme.colors.primaires.blueDark};
  font-size: "16px";

  &:hover {
    outline: none;
    box-shadow: 0 0 2px ${({ theme }) => theme.colors.primaires.blueDark};
    transition: 0.15s;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 2px ${({ theme }) => theme.colors.primaires.blueDark};
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const InputTextAreaCustom = styled.textarea`
  padding: 0.5em;
  color: ${({ theme }) => theme.colors.primaires.blueDark};
  border-radius: 4px;
  width: 98%;
  resize: vertical;
  border: 1px solid ${({ hasError, theme }) => hasError ? theme.colors.avertissements.danger : theme.colors.secondaires.grisMedium};

  &:hover {
    outline: none;
    box-shadow: 0 0 2px ${({ theme }) => theme.colors.primaires.blueDark};
    transition: 0.15s;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 2px ${({ theme }) => theme.colors.primaires.blueDark};
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`
