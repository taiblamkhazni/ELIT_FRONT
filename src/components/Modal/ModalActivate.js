/**
 * @file ModalActivate.js
 * @brief Defines the ModalActivate component.
 */
import React from 'react';
import { Flex, Spin } from 'antd';
import { NextStepButton } from "components/Button/Button";
import { CustomModalEdit, CustomTitleModalEdit } from "components/Modal/Modal";
import _ from 'lodash';
import styled from 'styled-components';

/**
 * @brief Styled component for the custom spinner.
 */
const CustomSpinner = styled(Spin)`
  margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  border-radius: 4px;
`

/**
 * @brief ActivationModal component.
 * 
 * This component displays a modal prompting the user to activate their account.
 * 
 * @param {boolean} isVisible - Determines if the modal is visible.
 * @param {function} onResendActivation - Function to call when the user requests to resend the activation email.
 * @param {function} onClose - Function to call when the modal is closed.
 * @param {boolean} isLoading - Determines if the loading spinner should be displayed.
 * 
 * @returns {JSX.Element} The rendered component.
 */
const ActivationModal = ({ isVisible, onResendActivation, onClose, isLoading }) => {
  return (
    <CustomModalEdit
      title={<CustomTitleModalEdit>Votre compte n'est pas activé</CustomTitleModalEdit>}
      open={isVisible}
      onCancel={onClose}
      footer={[
        _.isEqual(isLoading, false) && <NextStepButton key="activate" onClick={onResendActivation}>
          Activer mon compte
        </NextStepButton>,
      ]}
      width="50%"
    >
      {_.isEqual(isLoading, true) ?
        <Flex align='center' justify='center' className="spinner">
          <CustomSpinner size="large" spinning={isLoading} />
        </Flex>
        :
        <Flex align='center' vertical>
          <p>
            Vous n'avez pas encore activé votre compte! <br />
            Vous allez recevoir un e-mail afin d'activer votre compte. <br />
            Attention, le lien a une durée de validité de 48 heures.
          </p>
        </Flex>
      }
    </CustomModalEdit >
  );
};

export default ActivationModal;
