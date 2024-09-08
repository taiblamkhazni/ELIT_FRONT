/**
 * @file Select.js
 * @brief Ce fichier définit le composant SelectCustom .
 */
import { Select } from "antd"
import styled from "styled-components"
/**
 * @brief Custom Selector
 */
export const SelectCustom = styled(Select)`
  .antd-select {
    height: 100% !important;
  }
  .ant-select-selector {
    height: 100% !important;
    align-items: center !important;
    font-size: 14px !important;
    border-radius: 4px !important;
    border-color: #CCCCCC !important;
  }
  .ant-select-arrow {
    color: #248BC0 !important;
  }
  .ant-select-selection-search {
    height: 100% !important;
  }
  .ant-select-selection-search-input {
    height: 100% !important;
  }
`
