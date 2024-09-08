/**
 * @file InscriptionPage.js
 * @brief Ce fichier contient le composant d'inscription.
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

import InscriptionForm from "./Form/InscriptionForm";

const { Sider, Content } = Layout;

/**
 * @brief layoutStyle : Le style du layout.
 */
const layoutStyle = {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    backgroundColor: `${base.backgrounds.white}`
};

/**
 * @brief siderStyle : Le style du sider.
 */
const siderStyle = {
    textAlign: 'center',
    height: '100vh',
};

/**
 * @brief StyledLink : Le lien stylisé.
 */
const StyledLink = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.primaires.blue};
  &:hover {
    color: ${({ theme }) => theme.colors.secondaires.blue};
  }
`;

export const InscriptionContext = createContext({})

/**
 * @brief Inscription Page Component
 */
const InscriptionPage = () => {
    const contextValue = () => { };

    return (
        <InscriptionContext.Provider value={contextValue}>
            <Layout style={layoutStyle}>
                <Sider width="20vw" style={siderStyle}>
                    <LeftAuthentification type={"inscription"} />
                </Sider>
                <Content>
                    <Logo />
                    <SubTitle id="text-title">{t('auth.elitDescription')}</SubTitle>
                    <MainTitle id="text-inscription">{t('auth.registerTitle')}</MainTitle>
                    <InscriptionForm />
                    <Text id="text-compte-existant">
                        {t('auth.existingAccount')}{" "}
                        <StyledLink
                            id="link-connection"
                            style={{ textDecoration: "underline" }}
                            to="/connexion">
                            {t('auth.login')}
                        </StyledLink>
                    </Text>
                </Content>
            </Layout>
        </InscriptionContext.Provider>
    );
}

export default InscriptionPage;
