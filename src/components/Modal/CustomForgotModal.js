/**
 * @file CustomForgotModal.js
 * @brief Defines the CustomForgotModal component.
 */
import { NextStepButton } from "../Button/Button";

import { CustomModalEdit, CustomTitleModalEdit } from "./Modal";
const CustomModal = ({ isVisible, onRedirect, onClose, message }) => {
  return (
    <CustomModalEdit
      title={<CustomTitleModalEdit>Attention</CustomTitleModalEdit>}
      open={isVisible}
      onCancel={onClose}
      footer={[
        <NextStepButton key="redirect" onClick={onRedirect}>
          Rediriger
        </NextStepButton>,
      ]}
      width="50%"
    >
      <p>{message}</p>
    </CustomModalEdit>
  );
};

export default CustomModal;
