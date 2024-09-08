/**
 * @file CustomPasswordTooltip.js
 * @module components
 * @brief CustomPasswordTooltip Module
 *
 * This module exports a function that renders the tooltip password message
 */

import { Flex, Tooltip } from "antd";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import { base } from "theme/base";
import { t } from "utils/translationUtils";

/**
 * @brief tooltipText component
 *
 * This component renders the text of the password tooltip
 *
 * @returns JSX.Element - The tooltip text component.
 */
const TooltipText = () => {
  return (
    <Flex id="tooltipFormatPassword" justify="center">
      <Flex vertical style={{padding: "20px 9px 20px 18px"}}>
        <span id="tooltip-minCharacters">
          <FiCheckCircle /> {t('auth.form.passwordTooltip.minCharacters')}
        </span>
        <span id="tooltip-minUppercase">
          <FiCheckCircle /> {t('auth.form.passwordTooltip.minUppercase')}
        </span>
        <span id="tooltip-minUndercase">
          <FiCheckCircle /> {t('auth.form.passwordTooltip.minUndercase')}
        </span>
        <span id="tooltip-noSpace">
          <FiCheckCircle /> {t('auth.form.passwordTooltip.noSpace')}
        </span>
      </Flex>
      <Flex vertical style={{padding: "20px 18px 20px 9px"}}>
        <span id="tooltip-minNumber">
          <FiCheckCircle /> {t('auth.form.passwordTooltip.minNumber')}
        </span>
        <span id="tooltip-minSpecialCharacters">
          <FiCheckCircle /> {t('auth.form.passwordTooltip.minSpecialCharacters')}
        </span>
        <span id="tooltip-specialCharactersList" style={{paddingLeft: "15px"}}>{t('auth.form.passwordTooltip.specialCharactersList')}</span>
      </Flex>
    </Flex>
  );}

/**
 * @brief CustomPasswordTooltip component
 *
 * This component renders the password tooltip
 *
 * @returns JSX.Element - The cutom password tooltip component.
 */
const CustomPasswordTooltip = ({confirm}) => {
  let id = confirm ? "link-info-confirm-password":"link-info-password";
  return (
    <Tooltip
      overlayInnerStyle={{
        width: "max-content",
        border: "1px solid #248BC0",
        colorTextLightSolid: "red",
        textAlign: "left",
        color: "#000",
      }}
      title={<TooltipText />}
      color={base.colors.primaires.blueLight}
    >
      <AiOutlineInfoCircle
        id={id}
        data-testid="info-icon"
        data-tip
        data-for="sadFace"
        size={15}
        style={{ marginLeft: 5 }}
      />
    </Tooltip>
  );
};

export default CustomPasswordTooltip;
