/**
 * @file Modal.js
 * @brief This module exports Modal component
 */
import { Modal } from "antd";
import styled from "styled-components";

/**
 * @brief Basic Custom Modal
 **/
export const CustomModal = styled(Modal)`
  .ant-modal-content {
    padding: 0;
  }

  .ant-modal-header {
    margin-bottom: 1.5rem;
    padding: 1rem 2rem;

    border-bottom: solid 1px #e9e9e9;
    border-radius: 30px;
  }

  .ant-modal-title {
    font-size: 18px;
    font-weight: 500;
  }

  .ant-modal-body {
    padding: 0 2rem;
  }

  .ant-modal-footer {
    padding: 1rem 2rem;
  }
`;

/**
 * @brief Enhanced Custom Modal
 **/
export const CustomModalEdit = styled(Modal)`
  .ant-modal-header {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;

    height: fit-content;

    border-radius: 0.5rem;
  }
  .ant-modal-footer {
    border: none;
  }
  .ant-modal-body {
    ::-webkit-scrollbar {
      width: 6px;
      background-color: #f5f5f5;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      background-color: #d9d9d9;
    }
    scroll-behavior: smooth;
  }
`;

/**
 * @brief Basic Custom Modal Title
 **/
export const CustomTitleModal = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
  color: ${({ theme }) => theme.colors.primaires.blueDark};
  margin-bottom: 0;
`;

/**
 * @brief Basic Custom Modal H2 Title
 **/
export const CustomTitleModalH2 = styled.h2`
  margin-top: 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 40px;
  color: ${({ theme }) => theme.colors.primaires.blueDark};
  margin-bottom: 0;
`;

/**
 * @brief Enhanced Custom Modal Title
 **/
export const CustomTitleModalEdit = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primaires.blueDark};
  margin-bottom: 0;
`;

/**
 * @brief nhanced Custom Modal Content Component
 **/
export const CustomTextModalEdit = styled.p`
  font-weight: 700;
  font-style: normal;
  color: #248bc0;
  margin: 0 1rem 0 0;
`;
