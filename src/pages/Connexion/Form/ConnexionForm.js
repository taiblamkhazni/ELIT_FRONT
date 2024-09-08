/**
 * @file ConnexionForm.js
 * @module AuthentificationFeatures
 * @brief ConnexionForm  Module
 *
 * This module exports a function that renders the Connexion form component from
 * the AuthentificationFeatures package. It serves as the entry point for the
 * user authentication functionality in the application.
 */
import { useState } from "react"
import { Flex, Input, Spin } from "antd"
import { ErrorAlert } from "components/Alert/Alert"
import { NextStepButton } from "components/Button/Button";
import { InputCustom } from "components/Input/Input"
import { LabelCustom } from "components/Label/Label"
import ActivationModal from "components/Modal/ModalActivate";
import CustomPasswordTooltip from "components/Tooltip/CustomPasswordTooltip"
import { getUsersByKeywordApi } from "hooks/apis/UserApi";
import useAuth from "hooks/useAuth/useAuth"
import _ from "lodash"
import { Controller, useForm, useWatch } from "react-hook-form"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import ROUTES from "routes/routes";
import styled from "styled-components"
import { t } from "utils/translationUtils";
import { connexionSchema } from "validation/Schema"

import { yupResolver } from "@hookform/resolvers/yup"

/**
 * @brief Styled wrapper for the form components
 */
const Wrapper = styled(Flex)`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 30rem;
  gap: 2rem;
  margin: auto;
`

/**
 * @brief Styled link component
 */
const StyledLink = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.primaires.blue};

  &:hover {
    color: ${({ theme }) => theme.colors.secondaires.blue};
  }
`;

const CustomSpinner = styled(Spin)`
  margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  border-radius: 4px;
}
`

/**
 * @brief ConnexionForm component
 *
 * This component renders the login form. It uses react-hook-form for form validation,
 * and custom input components for enhanced user experience. It also includes a link
 * for password recovery and a submit button.
 *
 * @returns JSX.Element - The rendered form component.
 */
const ConnexionForm = () => {
    const optionsForm = {
        mode: "onChange",
        resolver: yupResolver(connexionSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    }
    const validationConnexion = useForm(optionsForm);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingForModal, setIsLoadingForModal] = useState(false);

    const {
        handleSubmit,
        formState: { errors, isValid },
        register,
        clearErrors,
        control
    } = validationConnexion;
    const { loginUser } = useAuth()
    const { resendMail } = useAuth()
    const navigate = useNavigate();
    const emailValue = useWatch({
        control: validationConnexion.control,
        name: "email",
    });
    const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);
    /**
     * @brief Form submission handler
     *
     * This function is invoked upon form submission. It handles user authentication
     * and displays appropriate snack bar notifications based on the authentication response.
     *
     * @param {Object} inputs - User login credentials.
     */
    const onSubmit = async (inputs) => {
        setIsLoading(true);
        const response = await loginUser(inputs);
        if (
            !_.isNil(response.success) &&
            _.isEqual(response.success, true)
        ) {
            setIsLoading(false);
        } else if (
            !_.isNil(response?.errorType) &&
            _.isEqual(response?.errorType, "accountNotActivated")
        ) {
            setIsActivationModalOpen(true);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    const handleResendActivation = async () => {
        try {
            setIsLoadingForModal(true);
            const user = await getUsersByKeywordApi(emailValue)
            await resendMail(user[0]);
            setIsLoadingForModal(false);
            setIsActivationModalOpen(false);
            navigate(ROUTES.receiveMail);
            if (_.isEqual(response.success, true)) {
                setIsLoadingForModal(false);
                navigate(ROUTES.receiveMail);
            }
        } catch (error) {
            setIsLoadingForModal(false);
        }
    };

    const handleChange = (e) => {
        if (_.isEmpty(e.target.value)) {
            clearErrors(e.target.name, '');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ActivationModal
                isVisible={isActivationModalOpen}
                onResendActivation={handleResendActivation}
                onClose={() => setIsActivationModalOpen(false)}
                isLoading={isLoadingForModal}
            />
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
                                    <LabelCustom id="text-email-address" data-tooltip-id="my-tooltip-1">
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
                                    <ErrorAlert id="text-field-email-adress-error" style={{ textAlign: "left" }}>
                                        {errors && _.has(errors, "email")
                                            ? _.get(errors, "email").message
                                            : ""}
                                    </ErrorAlert>
                                </Flex>
                            )}
                        />
                    </Flex>
                    <Flex vertical align="center">
                        <Controller
                            name="password"
                            control={control}
                            {...register("password")}
                            render={({ field }) => (
                                <Flex vertical style={{ width: "100%" }}>
                                    <LabelCustom id="text-password" data-tooltip-id="my-tooltip-1">
                                        {t('auth.form.passwordLabel')}
                                        <CustomPasswordTooltip />
                                    </LabelCustom>
                                    <Input.Password
                                        {...field}
                                        label="Mot de passe"
                                        placeholder={t('auth.form.passwordPlaceholder')}
                                        type="password"
                                        onKeyUp={(e) => handleChange(e)}
                                        status={_.has(errors, "password") ? "error" : ""}
                                        style={{
                                            height: "2.5rem",
                                            width: "100%",
                                            borderRadius: "4px",
                                            fontSize: "14px",
                                        }}
                                        id="eys"

                                    />
                                    <ErrorAlert id="password-error-message" style={{ textAlign: "left" }}>
                                        {errors && _.has(errors, "password")
                                            ? _.get(errors, "password").message
                                            : ""}
                                    </ErrorAlert>
                                    <StyledLink
                                        id="link-forgotten-password"
                                        style={{
                                            margin: "1em 0 2em 0",
                                            textAlign: "right",
                                            textDecoration: "underline",
                                        }}
                                        to={ROUTES.forgotPassword}
                                    >
                                        {t('auth.form.forgotPassword')}
                                    </StyledLink>
                                </Flex>
                            )}
                        />
                    </Flex>
                </Wrapper>
            }
            {_.isEqual(isLoading, false) &&
                <NextStepButton id="button-connection" data-testid="connexionButton" disabled={!isValid}>
                    {t('auth.form.connexionButton')}
                </NextStepButton>
            }
        </form>
    );
}

export default ConnexionForm;
