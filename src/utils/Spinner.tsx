/**
 * @file Spinner.js
 * @brief This module exports the Spinner.
 * The loading spinner.
 */
/* eslint-disable react/prop-types */
import React, { FunctionComponent } from "react";
import { Spin } from "antd";
import { SpinProps } from "antd/lib/spin";
import styled from "styled-components";

type SpinnerProps = SpinProps & {
  className?: string;
  message?: string;
};

/**
 * @var defaultMessage
 * @brief defaultMessage text.
 */
const defaultMessage = "Loading...";
/**
 * @var SpinnerWrapper
 * @brief SpinnerWrapper.
 */
const SpinnerWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
/**
 * @var CustomSpin
 * @brief CustomSpin.
 */
const CustomSpin = styled(Spin)`
	.ant-spin-dot-item {
		background-color: ${({theme}) => theme.colors.primaires.blue};
	}
`;
/**
 * @brief Spinner.
 * @param props the props.
 * @return Component.
 */
export const Spinner: FunctionComponent<SpinnerProps> = (props) => {
  const {
    size,
    children,
    message = defaultMessage,
  } = props;
  return (
    <SpinnerWrapper>
      <CustomSpin size={size} tip={message}>
        {children}
      </CustomSpin>
    </SpinnerWrapper>
  );
};


/**
 * CSS style for content SpinnerPdf
 */
const contentStyle = {
  padding :".8rem 2rem",
  fontSize :"1rem",
  margin :"auto 0 auto 2rem"

};

const content = <div style={contentStyle} />;

/**
 * @brief Spinner for generate PDF.
 * @param props
 * @returns Component
 */
export const SpinnerPdf: FunctionComponent<SpinnerProps> = (props)=>{
  const {
    size,
    message,
  } = props;
  return (
    <div style={{ position: "relative" }}>
      <CustomSpin style={{ color: "rgb(17, 110, 156)" }} tip={message} size={size}>
        {content}
      </CustomSpin>
    </div>
  );
 }

