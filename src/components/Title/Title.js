/**
 * @file Title.js
 * @brief This module exports Title component
 **/
import styled from "styled-components"

/**
 * @brief Custom Header Title Component
 **/
export const HeaderTitle = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.secondaires.grisDark};
`

/**
 * @brief Custom Title of a section Component
 **/
export const TitleSection = styled.div`
  line-height: 24px;
  font-weight: 700;
  font-style: normal;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primaires.blue};
  margin: ${props=>props.margin?props.margin:"0px 0px 8px 0px"};
  min-height: ${props => props.minHeight? props.minHeight: "0px"};
  text-align: ${props => props.textAlign?props.textAlign:"left"};
`

/**
 * @brief Custom Title of a collaborator section Component
 **/
export const ColabTitleSection = styled.div`
  line-height: 24px;
  font-weight: 700;
  font-style: normal;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.secondaires.blueDark};
  margin: ${props=>props.margin?props.margin:"0px 0px 8px 0px"};
  min-height: ${props => props.minHeight? props.minHeight: "0px"};
  text-align: ${props => props.textAlign?props.textAlign:"left"};
`

/**
* @brief CustomTitleStyle : Component
**/
const CustomTitleStyle = styled.span`
line-height: 48px;
font-size: 24px;
font-weight: 400;
color: ${props=> props.color ? props.color : "#116E9C"};
`
/**
* @brief StepPageTitle : Component
**/
export const StepPageTitle = ({StepNumber, StepName }) => {
  return (
    <h2>
      <CustomTitleStyle>{StepNumber} : </CustomTitleStyle>
      <CustomTitleStyle color="#000000">{StepName}</CustomTitleStyle>
    </h2>
  );
}

/**
 * @brief Custom Title of a step (subStep of Steps Component) Component
 **/
export const TitleStep = styled.div`
  line-height: 40px;
  font-weight: 700;
  font-size: 18px;
  font-style: normal;
  color: ${({ theme }) => theme.colors.primaires.blue};
  margin: ${props=>props.margin?props.margin:"0px 0px 8px 0px"};
`

/**
 * @brief Custom Title of the authentification section Component
 **/
export const AuthentificationTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 54px;
  color: #1F1A28;
`

/**
 * @brief Custom Title Description of the authentification section Component
 **/
export const AuthentificationSubtitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  color: #1F1A28;
`

/**
 * @brief Custom Title Description of the Connexion Component
 **/
export const MainTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 2rem;
  margin: 0.5rem 0;
`;

/**
 * @brief SubTitle : Component
 */
export const SubTitle = styled.h1`
  font-size: 1rem;
  font-weight: normal;
  line-height: 2rem;
  margin-bottom: 2rem;
`;

/**
 * @brief Custom Title of a in section Component
 **/
export const TitleH3 = styled.h3`
  font-size: ${props => props.fontSize ? props.fontSize : "18px"};
  font-weight: 700;
  line-height: 22px;
  margin: ${props => props.margin ? props.margin : "2rem 0 0.5rem"};
  color: ${({ theme }) => theme.colors.primaires.blue};
`;
