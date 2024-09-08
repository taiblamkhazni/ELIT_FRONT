/**
 * @file ForgotPassword.js
 * @brief ForgotPassword Module
 *
 * This module exports a function that renders the ForgotPassword component from
 * the AuthentificationFeatures package. It serves as the entry point for the
 * user authentication functionality in the application.
 */
import { Flex, Layout } from "antd"
import LeftAuthentification from "auth/LeftAuthentification"
import { StyledLink } from 'components/Link/Link';
import Logo from "components/Logo/Logo"
import { MainTitle, SubTitle } from "components/Title/Title"
import { base } from "theme/base"
import { t } from "utils/translationUtils";

import ForgotPasswordForm from "./Forms/ForgotPasswordForm"

const { Sider, Content } = Layout;

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
 * @brief siderStyle : The sider style.
 */
const siderStyle = {
    textAlign: 'center',
    height: '100vh',
};

/**
 * @brief ForgotPassword Page Component
 */
export default () => {
    return (
      <Flex>
        <Layout style={layoutStyle}>
          <Sider width="20vw" style={siderStyle}>
            <LeftAuthentification type={"forgot"} />
          </Sider>
          <Content>
            <Logo />
            <SubTitle id="texte-MethodologieProjet-page-reintialisation-mdp">{t('auth.elitDescription')}</SubTitle>
            <MainTitle id="texte-MotdePasseOublie">{t('auth.forgotPasswordTitle')}</MainTitle>
            <ForgotPasswordForm />
            <StyledLink id="bouton-retourConnexion" style={{ textDecoration: "underline" }} to="/connexion">
              {t('auth.forgotPasswordGoBack')}
            </StyledLink>
          </Content>
        </Layout>
      </Flex>
    );
}
