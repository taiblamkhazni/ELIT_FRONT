/**
 * @file AccountConfirmation.js
 * @brief Account Confirmation Page Module
 *
 * This module exports a function that renders the Account Confirmation component from
 * the AuthentificationFeatures package. It serves as the entry point for the
 * user authentication functionality in the application.
 */
import { useEffect } from "react";
import { Flex, Layout } from "antd";
import axios from "axios";
import { backendAPI } from "common/injectGlobals";
import { NextStepButton } from "components/Button/Button";
import Logo from "components/Logo/Logo";
import { MainTitle, SubTitle } from "components/Title/Title";
import { useNavigate, useSearchParams } from "react-router-dom";
import ROUTES from "routes/routes";
import { base } from "theme/base"
import { t } from "utils/translationUtils";

import LeftAuthentification from "./LeftAuthentification";

const { Sider, Content } = Layout;

/**
 * @brief layoutStyle : The layout style.
 */
const layoutStyle = {
  display: 'flex',
  textAlign: 'center',
  overflow: 'hidden',
  backgroundColor: `${base.backgrounds.white}`
};

/**
 * @brief adjustedLayoutStyle : The adjusted layout style.
 */
const adjustedLayoutStyle = {
  ...layoutStyle,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

/**
 * @brief siderStyle : The sider style.
 */
const siderStyle = {
  textAlign: 'center',
  height: '100vh',
};

/**
 * @brief Account Confirmation Page Component
 */
const AccountConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const idUser = searchParams.get('id');
  const apiUrl = backendAPI

  /** 
   * @brief useEffect hook to control navigation between pages based on the response 
   **/
  useEffect(() => {
    if (token) {
      axios.get(`${apiUrl}/confirm-account?token=${token}`)
        .then(response => {
          if (response.data === "Account confirmed") {
            navigate(ROUTES.confirmAccount);
          }
        })
        .catch((error) => {
          if (error.response.data === "Invalid token") {
            navigate(ROUTES.invalidToken + "?id=" + idUser);
          } else {
            navigate(ROUTES.tokenExpired + "?id=" + idUser);
          }
        });
    }
  }, [apiUrl, navigate, token, idUser]);
  /** 
     * @brief useEffect hook to redirect to connexion page after 3 minutes of inactivity 
     **/
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/connexion');
    }, 180000); // 3 minutes
    return () => clearTimeout(timeoutId); // Cleanup timeout on component unmount
  }, [navigate]);
  
  /**
   * @brief function that handles the navigation to connexion page 
   **/
  const handleLoginClick = () => navigate('/connexion');

  return (
    <Flex >
      <Layout style={layoutStyle}>
        <Sider width='20vw' style={siderStyle}>
          <LeftAuthentification type={"activation"} />
        </Sider>
        <Content style={adjustedLayoutStyle}>
          <Logo />
          <SubTitle>{t('auth.elitDescription')}</SubTitle>
          <MainTitle>{t('auth.confirmTitle')}</MainTitle>
          <p>{t('auth.confirmDescription')}</p>
          <NextStepButton onClick={handleLoginClick}>{t('auth.login')}</NextStepButton>
        </Content>
      </Layout>
    </Flex>
  );

};


export default AccountConfirmation;
