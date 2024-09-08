/**
 * @file Connexion.js
 * @brief Connexion Page Module
 *
 * This module exports a function that renders the Connexion component from
 * the AuthentificationFeatures package. It serves as the entry point for the
 * user authentication functionality in the application.
 */
import { createContext } from "react"
import { Layout } from "antd"
import LeftAuthentification from "auth/LeftAuthentification"
import Logo from "components/Logo/Logo"
import { Text } from "components/Text/Text"
import { MainTitle, SubTitle } from "components/Title/Title"
import { Link as RouterLink } from "react-router-dom"
import styled from "styled-components"
import { base } from "theme/base"
import { t } from "utils/translationUtils";

import ConnexionForm from "./Form/ConnexionForm"

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
    height: '100vh'
};

/**
 * @brief StyledLink : The styled link.
 */
const StyledLink = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.primaires.blue};
  &:hover {
    color: ${({ theme }) => theme.colors.secondaires.blue};
  }
`;

export const ConnexionContext = createContext({})

/**
 * @brief Connexion Page Component
 */
const ConnexionPage = () => {
    /**
     * @brief Using useMemo would memoize the object, preventing unnecessary recalculations and re-renders
     * The useMemo hook will recompute the memoized value only when `passwordHidden` changes
     */
    const contextValue = () => { };

    return (
      <ConnexionContext.Provider value={contextValue}>
        <Layout style={layoutStyle}>
          <Sider width="20vw" style={siderStyle}>
            <LeftAuthentification type={"connexion"} />
          </Sider>
          <Content>
            <Logo />
            <SubTitle id="text-title">{t('auth.elitDescription')}</SubTitle>
            <MainTitle id="text-connection">{t('auth.title')}</MainTitle>
            <ConnexionForm />
            <Text id="Pas-encore-membre">
              {t('auth.notMemberYet')}{" "}
              <StyledLink
                id="link-inscription"
                style={{ textDecoration: "underline" }}
                to="/inscription"
              >
                {t('auth.createAccount')}
              </StyledLink>
            </Text>
          </Content>
        </Layout>
      </ConnexionContext.Provider>
    );
}

export default ConnexionPage;
