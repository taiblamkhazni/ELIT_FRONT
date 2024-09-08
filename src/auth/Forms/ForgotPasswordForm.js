/**
 * @file InscriptionForm.js
 * @brief Inscription Form Component
 *
 * This file contains the InscriptionForm component which is used for user registration.
 * The form includes fields for user's name, email, and password. It uses react-hook-form
 * for form validation and styled-components for styling.
 */
import { useState } from "react"
import { Flex, Spin } from "antd"
import { ErrorAlert } from "components/Alert/Alert"
import { NextStepButton } from "components/Button/Button"
import { InputCustom } from "components/Input/Input"
import { LabelCustom } from "components/Label/Label"
import { sendForgotPasswordEmailApi } from "hooks/apis/UserApi"
import _ from "lodash"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Snackbar } from "utils/Snackbar/Snackbar";
import { t } from "utils/translationUtils";
import { forgetPasswordSchema } from "validation/Schema"

import { yupResolver } from "@hookform/resolvers/yup"

const Wrapper = styled(Flex)`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 30rem;
  gap: 2rem;
  margin: auto;
`

const CustomSpinner = styled(Spin)`
  margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  border-radius: 4px;
}
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
export default () => {
  const navigate = useNavigate();
  const optionsForm = {
    mode: "onChange",
    resolver: yupResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    }
  }
  const [isLoading, setIsLoading] = useState(false);
  const validationForgotPassword = useForm(optionsForm)
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    register,
    clearErrors,
    reset,
  } = validationForgotPassword;

  const onSubmit = async (email) => {
    try {
      setIsLoading(true);
      const response = await sendForgotPasswordEmailApi(email);
      if (_.isEqual(response.success, true)) {
        setIsLoading(false);
        Snackbar("success", response.message);
        navigate("/receiveMail", { state: { email } });
      } else {
        Snackbar("error", response.message);
        reset();
        setIsLoading(false);
      }
    } catch (error) {
      Snackbar("error", error);
      reset();
      setIsLoading(false);
    }

  };

  const handleChange = (e) => {
    if (_.isEmpty(e.target.value)) {
      clearErrors(e.target.name, '');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLoading ?
        <div className="spinner">
          <CustomSpinner size="large" spinning={isLoading} />
        </div>
        :
        <Wrapper vertical>
          <Flex vertical align="center">
            <Controller
              name="email"
              control={control}
              {...register("email")}
              render={({ field }) => (
                <Flex vertical style={{ width: "100%" }}>
                  <LabelCustom  id="texte-adresseMail" data-tooltip-id="my-tooltip-1">
                    {t('auth.form.emailLabel')}
                  </LabelCustom>
                  <InputCustom
                    {...field}
                    label="Adresse e-mail"
                    placeholder={t('auth.form.emailPlaceholder')}
                    type="email"
                    onKeyUp={(e) => handleChange(e)}
                    status={_.has(errors, "email") ? "error" : ""}
                  />

                  <ErrorAlert id="message-erreur-adresse-mail">
                    {errors && _.has(errors, "email")
                      ? _.get(errors, "email").message
                      : ""}
                  </ErrorAlert>

                </Flex>

              )}
            />
          </Flex>

        </Wrapper>
      }

      {_.isEqual(isLoading, false) &&
        <NextStepButton
          data-testid="forgetButton"
          disabled={!isValid}
          margin="2rem"
          id="bouton-motPasseOublie"
        >
          {t('auth.form.send')}
        </NextStepButton>
      }
    </form>
  );
}
