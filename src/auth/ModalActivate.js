/**
 * @file ModalActivate.js
 * @brief Defines the ModalActivate component.
 */
import { NextStepButton } from "components/Button/Button";
import { CustomModalEdit, CustomTitleModalEdit } from "components/Modal/Modal";
import { t } from "utils/translationUtils";

/**
 * @brief ActivationModal Component
 * @param isVisible - The visibility state of the modal.
 * @param onResendActivation - The function to resend the activation email.
 * @param onClose - The function to close the modal.
 */
const ActivationModal = ({ isVisible, onResendActivation, onClose }) => {
  return (
    <CustomModalEdit
      title={<CustomTitleModalEdit>{t('auth.accountNotActivated.title')}</CustomTitleModalEdit>}
      open={isVisible}
      onCancel={onClose}
      footer={[
        <NextStepButton key="activate" onClick={onResendActivation}>
          {t('auth.accountNotActivated.btn')}
        </NextStepButton>
      ]}
      width="50%"
    >
      <p>{t('auth.accountNotActivated.text')}</p>
      <p>{t('auth.accountNotActivated.description')}</p>
    </CustomModalEdit>
  );
};

export default ActivationModal;
