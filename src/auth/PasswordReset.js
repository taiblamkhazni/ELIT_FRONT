/**
 * @file PasswordReset.js
 * @brief Password Reset Component
 *
 * This component renders the password reset form. It is used to reset the user's
 * password via an email token. The component handles form submission, password
 * visibility toggling, and navigation after successful password reset.
 */
import React, { useEffect, useState } from 'react';
import { Flex, Layout } from 'antd';
import { StyledLink } from 'components/Link/Link';
import Logo from "components/Logo/Logo";
import CustomForgotModal from "components/Modal/CustomForgotModal";
import { MainTitle, SubTitle } from "components/Title/Title";
import { useLocation, useNavigate } from 'react-router-dom';
import ROUTES from "routes/routes";
import { base } from "theme/base"
import { t } from "utils/translationUtils";

import ResetPasswordForm from './Forms/ResetPasswordForm';
import LeftAuthentification from "./LeftAuthentification";

const { Sider, Content } = Layout;

/**
 * @brief siderStyle : The sider style.
 */
const siderStyle = {
  textAlign: 'center',
  height: '100vh',
};

/**
 * @brief layoutStyle : The layout style.
 */
const layoutStyle = {
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  overflow: 'hidden',
  backgroundColor: `${base.backgrounds.white}`
};

/**
 * @brief PasswordReset component.
 *
 * Renders the password reset form. It includes fields for the new password and its confirmation.
 * It uses react-hook-form for form validation and styled-components for styling.
 *
 * @returns JSX.Element
 */
const PasswordReset = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState('');
  const [ModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tokenParam = query.get('token');
    if (tokenParam != null) {
      setToken(tokenParam);
    } else {
      navigate(ROUTES.connexion);
    }
  }, [location, navigate]);

  return (
    <Flex>
      <Layout style={layoutStyle}>
        <Sider width="20vw" style={siderStyle}>
          <LeftAuthentification type={"forgot"} />
        </Sider>
        <Content>
          <Logo />
          <SubTitle>{t('auth.elitDescription')}</SubTitle>
          <MainTitle>{t('auth.forgotPasswordTitle')}</MainTitle>
          <ResetPasswordForm
            setModalMessage={setModalMessage}
            token={token}
          />
          {ModalOpen && (
            <CustomForgotModal
              isopen={ModalOpen}
              onClose={() => setModalOpen(false)}
              onRedirect={() => navigate(ROUTES.forgotPassword)}
              message={modalMessage}
            />
          )}
          <StyledLink style={{ textDecoration: "underline" }} to="/connexion">
            {t('auth.forgotPasswordGoBack')}
          </StyledLink>
        </Content>
      </Layout>
    </Flex>
  );

}

export default PasswordReset;
