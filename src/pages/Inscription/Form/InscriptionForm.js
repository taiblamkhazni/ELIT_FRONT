/**
 * @file InscriptionForm.js
 * @brief Inscription Form Component
 *
 * This file contains the InscriptionForm component which is used for user registration.
 * The form includes fields for user's name, email, and password. It uses react-hook-form
 * for form validation and styled-components for styling.
 */
import { useState } from "react"
import { Flex, Input, Spin } from "antd"
import { ErrorAlert } from "components/Alert/Alert"
import { NextStepButton } from "components/Button/Button"
import { InputCustom } from "components/Input/Input"
import { LabelCustom } from "components/Label/Label"
import CustomPasswordTooltip from "components/Tooltip/CustomPasswordTooltip"
import useAuth from "hooks/useAuth/useAuth"
import _ from "lodash"
import { Controller, useForm } from "react-hook-form"
import styled from "styled-components"
import { Snackbar } from "utils/Snackbar/Snackbar";
import { t } from "utils/translationUtils";
import { inscriptionSchema } from "validation/Schema"

import { yupResolver } from "@hookform/resolvers/yup"

const Wrapper = styled(Flex)`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 35rem;
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
const InscriptionForm = () => {
    const optionsForm = {
        resolver: yupResolver(inscriptionSchema),
        mode: "onChange",
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        }
    }
    const [isLoading, setIsLoading] = useState(false);
    const validationInscription = useForm(optionsForm)
    const {
        handleSubmit,
        formState: { errors, isValid },
        control,
        register,
        reset
    } = validationInscription;

    const { registerUser } = useAuth()

    const onSubmit = async (inputs) => {
        try {
            setIsLoading(true);
            const response = await registerUser(inputs, "register");
            if (response.success) {
                setIsLoading(false);
            } else {
                Snackbar("error", response.message);
                reset();
                setIsLoading(false);
            }
        } catch (error) {
            Snackbar("error", error);
            throw new Error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                isLoading ?
                    <div className="spinner">
                        <CustomSpinner size="large" spinning={isLoading} />
                    </div>
                    :
                    <Wrapper vertical>
                        <Flex gap="middle" justify="space-between">
                            <Controller
                                name="lastname"
                                control={control}
                                {...register("lastname")}
                                render={({ field }) => (
                                    <Flex vertical style={{ width: "100%" }}>
                                        <LabelCustom id="label-name" data-tooltip-id="my-tooltip-1">{t('auth.form.lastnameLabel')}</LabelCustom>
                                        <InputCustom
                                            {...field}
                                            label="Nom"
                                            placeholder={t('auth.form.lastnamePlaceholder')}
                                            type="text"
                                            status={_.has(errors, "lastname") ? "error" : ""}
                                        />
                                        <ErrorAlert id="text-field-name-error">
                                            {errors && _.has(errors, "lastname")
                                                ? _.get(errors, "lastname").message
                                                : ""}
                                        </ErrorAlert>
                                    </Flex>
                                )}
                            />
                            <Controller
                                name="firstname"
                                control={control}
                                {...register("firstname")}
                                render={({ field }) => (
                                    <Flex vertical style={{ width: "100%" }}>
                                        <LabelCustom id="label-first-name" data-tooltip-id="my-tooltip-1">{t('auth.form.firstnameLabel')}</LabelCustom>
                                        <InputCustom
                                            {...field}
                                            label="Prénom"
                                            placeholder={t('auth.form.firstnamePlaceholder')}
                                            type="text"
                                            status={_.has(errors, "firstname") ? "error" : ""}
                                        />
                                        <ErrorAlert id="text-field-firstname-error">
                                            {errors && _.has(errors, "firstname")
                                                ? _.get(errors, "firstname").message
                                                : ""}
                                        </ErrorAlert>
                                    </Flex>
                                )}
                            />
                        </Flex>
                        <Flex vertical>
                            <Controller
                                name="email"
                                control={control}
                                {...register("email")}
                                render={({ field }) => (
                                    <Flex vertical>
                                        <LabelCustom id="label-email" data-tooltip-id="my-tooltip-1">
                                            {t('auth.form.emailLabel')}
                                        </LabelCustom>
                                        <InputCustom
                                            {...field}
                                            label="Adresse e-mail"
                                            placeholder={t('auth.form.emailPlaceholder')}
                                            type="email"
                                            status={_.has(errors, "email") ? "error" : ""}
                                        />
                                        <ErrorAlert id="text-field-email-adress-error">
                                            {errors && _.has(errors, "email")
                                                ? _.get(errors, "email").message
                                                : ""}
                                        </ErrorAlert>
                                    </Flex>
                                )}
                            />
                        </Flex>
                        <Flex gap="large" justify="space-between">
                            <Controller
                                name="password"
                                control={control}
                                {...register("password")}
                                render={({ field }) => (
                                    <Flex vertical style={{ width: "100%" }}>
                                        <LabelCustom id="label-password" data-tooltip-id="my-tooltip-1">
                                            {t('auth.form.passwordLabel')}
                                            <CustomPasswordTooltip/>
                                        </LabelCustom>
                                        <Input.Password
                                            {...field}
                                            label="Mot de passe"
                                            placeholder={t('auth.form.passwordPlaceholder')}
                                            type="password"
                                            status={_.has(errors, "password") ? "error" : ""}
                                            style={{
                                                height: "2.5rem",
                                                width: "100%",
                                                borderRadius: "4px",
                                                fontSize: "14px",
                                            }}
                                        />
                                        <ErrorAlert
                                            style={{ textAlign: "left" }}
                                            id="password-error-message"
                                        >
                                            {errors && _.has(errors, "password")
                                                ? _.get(errors, "password").message
                                                : ""}
                                        </ErrorAlert>
                                    </Flex>
                                )}
                            />
                            <Controller
                                name="confirmPassword"
                                control={control}
                                {...register("confirmPassword")}
                                render={({ field }) => (
                                    <Flex vertical style={{ width: "100%" }}>
                                        <LabelCustom data-tooltip-id="my-tooltip-1">
                                            {t('auth.form.confirmPasswordLabel')}
                                            <CustomPasswordTooltip confirm={"confirmPassword"} />
                                        </LabelCustom>
                                        <Input.Password
                                            {...field}
                                            label="Confirmation du mot de passe"
                                            placeholder={t('auth.form.confirmPasswordPlaceholder')}
                                            type="password"
                                            status={_.has(errors, "confirmPassword") ? "error" : ""}
                                            style={{
                                                height: "2.5rem",
                                                width: "100%",
                                                borderRadius: "4px",
                                                fontSize: "14px",
                                            }}
                                        />
                                        <ErrorAlert id="text-field-confirm-password" style={{ textAlign: "left" }}>
                                            {errors && _.has(errors, "confirmPassword")
                                                ? _.get(errors, "confirmPassword").message
                                                : ""}
                                        </ErrorAlert>
                                    </Flex>
                                )}
                            />
                        </Flex>
                    </Wrapper>
            }
            {_.isEqual(isLoading, false) && <NextStepButton id="button-inscription" margin="2rem" disabled={!isValid}>
                {t('auth.form.register')}
            </NextStepButton>
            }
        </form>
    );
}

export default InscriptionForm;
