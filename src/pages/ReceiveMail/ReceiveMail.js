/**
 * @file ReceiveMail.js
 * @brief ReceiveMail Component for email reception.
 */
import { useEffect, useState } from "react";
import { Flex, Layout, Spin } from "antd";
import LeftAuthentification from "auth/LeftAuthentification"
import { NextStepButton } from "components/Button/Button"
import Logo from "components/Logo/Logo"
import { MainTitle, SubTitle } from "components/Title/Title"
import { sendForgotPasswordEmailApi } from "hooks/apis/UserApi";
import useAuth from "hooks/useAuth/useAuth"
import _ from "lodash";
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { base } from "theme/base"
import { Snackbar } from "utils/Snackbar/Snackbar";

/**
 * @brief The styled layout.
 **/
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
};

/**
 * @brief siderStyle : The sider style.
 */
const siderStyle = {
  textAlign: 'center',
  height: '100vh',
};

/**
 * @brief StyledParagraph : The styled paragraph.
 */
const StyledParagraph = styled.span`
  margin-bottom: 2em;
`;

/**
 * @brief StyledLinkButton : The styled link button.
 */
const StyledLinkButton = styled(NextStepButton)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.secondaires.blue};
  padding: 0;
  text-decoration: underline;
  cursor: pointer;
  display: inline;
  margin: 0;
  font-size: inherit;
  font-family: inherit;
  &:hover {
    color: ${({ theme }) => theme.colors.primaires.blue};
    text-decoration: none;
    background: none;
    border: none;
  }
  &:focus {
    outline: none;
    text-decoration: none;
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
 * @brief The component that handles the email reception step in authentication.
 * @returns JSX element for the email reception view.
 */
const ReceiveMail = () => {
  const { registerUser } = useAuth()
  const navigate = useNavigate();

  const location = useLocation()
  const inputs = location.state?.inputs;
  const email = location.state?.email;
  const isForgotPassword = Boolean(email);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/connexion');
    }, 180000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  const handleClick = async () => {
    try {
      let response;
      setIsLoading(true);
      if (isForgotPassword) {
        response = await sendForgotPasswordEmailApi(email);
      } else {
        response = await registerUser(inputs, "registerAgain");
      }
      if (_.isEqual(response.success, true)) {
        Snackbar("success", response.message);
        setIsLoading(false);
      }
    } catch (error) {
      Snackbar("error", error.message);
      setIsLoading(false);
    }
  }

  return (
    <Flex >
      <Layout style={layoutStyle}>
        <Sider width='20vw' style={siderStyle}>
          <LeftAuthentification type={"inscription"} />
        </Sider>
        <Content style={adjustedLayoutStyle}>
          <Logo />
          <SubTitle id="text-sous-titre">La méthodologie à la mesure de votre projet</SubTitle>
          <MainTitle id={isForgotPassword ? "message-envoi-mail-reinitialisation-mdp" : "text-titre"}>Vous y êtes presque !</MainTitle>
          <p id="message-inscription-priseencompte">Votre demande a bien été prise en compte.</p>
          {isForgotPassword ? (
            <StyledParagraph id="message-validite-lien-reintialisation">
              Vous allez recevoir un e-mail afin de réinitialiser votre mot de passe. <br />
              Attention, le lien a une durée de validité de 48 heures.
            </StyledParagraph>
          ) : (
            <StyledParagraph id="message-envoi-mail">
              Vous allez recevoir un e-mail afin d'activer votre compte. <br />
              Attention, le lien a une durée de validité de 48 heures.
            </StyledParagraph>
          )}

          {
            _.isEqual(isLoading, true) ?
              <div className="spinner">
                <CustomSpinner size="large" spinning={isLoading} />
              </div>
              :
              <>
                <p id="message-non-reception-mail">Si vous ne l'avez pas reçu, cliquez sur le bouton ci-dessous.</p>
                <StyledLinkButton id="renvoi-mail"
                  onClick={handleClick}>
                  Renvoyer un e-mail de confirmation
                </StyledLinkButton>
              </>
          }

        </Content>
      </Layout>
    </Flex>
  )
}

export default ReceiveMail;
