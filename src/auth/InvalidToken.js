/**
 * @file InvalidToken.js
 * @brief Invalid Token Page Module
 *
 * This module exports a function that renders the Invalid Token component from
 * the AuthentificationFeatures package. It serves as the entry point for the
 * user authentication functionality in the application.
 */
import React, { useEffect, useState } from "react";
import { Flex, Layout, Spin } from "antd";
import Warning from "assets/icons/symbols/warning";
import { NextStepButton } from "components/Button/Button";
import Logo from "components/Logo/Logo";
import { MainTitle, SubTitle } from "components/Title/Title";
import useAuth from "hooks/useAuth/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom"
import { getUserInfoByIdFetch } from "reducers/user/userReducer";
import ROUTES from "routes/routes";
import styled from "styled-components";
import { base } from "theme/base"
import { Snackbar } from "utils/Snackbar/Snackbar";
import { t } from "utils/translationUtils";

import LeftAuthentification from "./LeftAuthentification";

const { Sider, Content } = Layout;

/**
 * @brief layoutStyle : The layout style.
 **/
const layoutStyle = {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    backgroundColor: `${base.backgrounds.white}`
};

/**
 * @brief siderStyle : The sider style.
 **/
const siderStyle = {
    textAlign: 'center',
    height: '100vh'
};

/**
 * @brief SubTitle : The styled subtitle.
 **/
const ConfirmationText = styled.p`
  width: 36rem;
  margin: auto auto 2rem auto;
`;

/**
 * @brief ContactText : The styled contact text.
**/
const ContactText = styled.p`
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.primaires.blueDark};
`;

/**
 * @brief StyledLink : The styled link.
 **/
const StyledLink = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.primaires.blue};
  text-decoration: underline;
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
 * @brief Invalid Token Page Component
 */
const InvalidToken = () => {
    /** @brief Variables */
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { resendMail } = useAuth()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.userInfo);
    const idUser = searchParams.get('id');
    const [isLoading, setIsLoading] = useState(false);

    /** @brief Hook to set a timeout to navigate to the connexion page after 3 minutes */
    useEffect(() => {
        dispatch(getUserInfoByIdFetch(idUser));
        if (!idUser) {
            Snackbar("error", t('auth.errors.tokenError'));
        }

        const timeoutId = setTimeout(() => {
            navigate(ROUTES.connexion);
        }, 180000);

        return () => clearTimeout(timeoutId);
    }, [dispatch, idUser, navigate]);

    const handleClick = async () => {
        setIsLoading(true);
        const response = await resendMail(user);
        if (response.success) {
            setIsLoading(false);
        }
        else {
            setIsLoading(false);
        }
    }

    return (
        <Flex >
            <Layout style={layoutStyle}>
                <Sider width='20vw' style={siderStyle}>
                    <LeftAuthentification type={"activation"} />
                </Sider>
                <Content >
                    <Logo />
                    <SubTitle>{t('auth.elitDescription')}</SubTitle>
                    <Warning />
                    <MainTitle>{t('auth.activationError.title')}</MainTitle>
                    <ConfirmationText>{t('auth.activationError.description')} <br />
                        {t('auth.activationError.tryAgain')} <br />
                        {t('auth.activationError.warning')}</ConfirmationText>
                    {
                        isLoading ?
                            <div className="spinner">
                                <CustomSpinner size="large" spinning={isLoading} />
                            </div>
                            : <NextStepButton onClick={handleClick}>
                                {t('auth.activationError.resend')}
                            </NextStepButton>
                    }
                    <ContactText>{t('auth.activationError.contactText')}</ContactText>
                    <StyledLink href="mailto:elit.global@capgemini.com ">{t('auth.activationError.contactEmail')} </StyledLink>
                </Content>
            </Layout>
        </Flex>
    );
};

export default InvalidToken;
