/**
 * @file InscriptionForm.js
 * @brief Inscription Form Component
 *
 * This file contains the InscriptionForm component which is used for user registration.
 * The form includes fields for user's name, email, and password. It uses react-hook-form
 * for form validation and styled-components for styling.
 */
import { Flex, Input } from "antd"
import { ErrorAlert } from "components/Alert/Alert"
import { NextStepButton } from "components/Button/Button"
import { LabelCustom } from "components/Label/Label"
import CustomPasswordTooltip from "components/Tooltip/CustomPasswordTooltip"
import { resetPasswordApi } from "hooks/apis/axios"
import _ from "lodash"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import ROUTES from "routes/routes"
import styled from "styled-components"
import { Snackbar } from "utils/Snackbar/Snackbar";
import { t } from "utils/translationUtils";
import { passwordResetSchema } from "validation/Schema"

import { yupResolver } from "@hookform/resolvers/yup"

const Wrapper = styled(Flex)`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 30rem;
  gap: 2rem;
  margin: auto;
`

/**
 * @brief InscriptionForm Component
 *
 * This component renders the registration form. It utilizes react-hook-form for form validation,
 * styled-components for styling, and custom input components for enhanced user experience.
 * The form includes fields for name, email, password, and password confirmation.
 *
 * @returns JSX.Element - The rendered registration form component.
 */
export default (props) => {
  const { setModalMessage, token } = props;
  const navigate = useNavigate();
  const optionsForm = {
    mode: "onChange",
    resolver: yupResolver(passwordResetSchema),
    defaultValues: {
      email: "",
    }
  }
  const validationResetPassword = useForm(optionsForm)
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    clearErrors,
    register
  } = validationResetPassword;
  /**
   * Handles the form submission.
   *
   * Submits the password reset data to the server and handles the response.
   * Navigates to login page on success or shows an error modal on failure.
   *
   * @param {Object} data - Form data containing the new password and its confirmation.
   */
  const onSubmit = async (data) => {
    const response = await resetPasswordApi({ ...data, token });
    if (response.success) {
      Snackbar("success", t('auth.resetPasswordSuccess'));
      navigate(ROUTES.connexion);
    } else {

      setModalMessage(response.message);
      setModalOpen(true);
    }
  };

  const handleChange = (e) => {
    if (_.isEmpty(e.target.value)) {
      clearErrors(e.target.name, '');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper vertical>
        <Flex vertical align="center">
          <Controller
            name="newPassword"
            control={control}
            {...register("newPassword")}
            render={({ field }) => (
              <Flex vertical style={{ width: "100%" }}>
                <LabelCustom data-tooltip-id="my-tooltip-1">
                  {t('auth.form.newPasswordLabel')}
                  <CustomPasswordTooltip />
                </LabelCustom>
                <Input.Password
                  {...field}
                  label="Nouveau mot de passe"
                  placeholder={t('auth.form.newPasswordPlaceholder')}
                  type="password"
                  onKeyUp={(e) => handleChange(e)}
                  status={_.has(errors, "newPassword") ? "error" : ""}
                  style={{
                    height: "2.5rem",
                    width: "100%",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
                <ErrorAlert>
                  {errors && _.has(errors, "newPassword")
                    ? _.get(errors, "newPassword").message
                    : ""}
                </ErrorAlert>
              </Flex>
            )}
          />
        </Flex>
        <Flex vertical align="center">
          <Controller
            name="confirmPassword"
            control={control}
            {...register("confirmPassword")}
            render={({ field }) => (
              <Flex vertical style={{ width: "100%" }}>
                <LabelCustom data-tooltip-id="my-tooltip-1">
                  {t('auth.form.confirmNewPasswordLabel')}
                  <CustomPasswordTooltip />
                </LabelCustom>
                <Input.Password
                  {...field}
                  label="Confirmez votre nouveau mot de passe"
                  placeholder={t('auth.form.confirmNewPasswordPlaceholder')}
                  type="password"
                  onKeyUp={(e) => handleChange(e)}
                  status={_.has(errors, "confirmPassword") ? "error" : ""}
                  style={{
                    height: "2.5rem",
                    width: "100%",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
                <ErrorAlert>
                  {errors && _.has(errors, "confirmPassword")
                    ? _.get(errors, "confirmPassword").message
                    : ""}
                </ErrorAlert>
              </Flex>
            )}
          />
        </Flex>
      </Wrapper>
      <NextStepButton
        data-testid="forgetButton"
        disabled={!isValid}
        margin="2rem"
      >
        {t('auth.form.send')}
      </NextStepButton>
    </form>
  );
}
