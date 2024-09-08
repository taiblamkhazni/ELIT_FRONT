/**
 * @file PresentationPanel.js
 * @brief This module exports MenuTitle component
 */
import { memo, useCallback } from "react"
import { Flex, Popover, Row } from "antd"
import BienvenueImage  from "assets/images/Bienvenue_sue_ELIT.png"
import tooltipProjectCreationImg from "assets/images/image_projectCreation.png"
import { NextStepButton } from "components/Button/Button"
import { StructureGrid } from "components/Grid/Grid"
import ProjectCreationProvider from "context/ProjectCreationProvider"
import ModalProjectCreation from "pages/ProjectCreation/ModalProjectCreation/ModalProjectCreation"
import { useDispatch, useSelector } from "react-redux"
import { setStageNumberWelcomeTooltip } from "reducers/welcomeTooltip/welcomeTooltipReducer"
import styled from "styled-components"
import { t } from "utils/translationUtils"

import IgnoreButtonTooltip from "./IgnoreButtonTooltip"

const TextAnimationTitle = styled.span`
    font-weight: 700;
    font-size: 32px;
    line-height: 54px;
    color: black;
  `

const Wrapper = styled(Flex)`
  flex-direction: row;
  background-color: #248bc01a;
  border-radius: 5px;
  @media (max-width: 970px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled(Flex)`
  flex-direction: column;
  padding-left:15px;
  padding-top: 30px;
  @media (max-width: 970px) {
    align-items: center;
    margin-bottom: 2rem;
  }

`

const DescriptionTextAnimation = styled.div`
    padding: 22px 0px;
font-size: 20px;
  `

export default memo(() => {

  const toolTipStage = useSelector(
    (state) => state.welcomeTooltipReducer.stageNumber
  )
  const dispatch = useDispatch()

  const openTooltip = toolTipStage === 5

  const handleClick = useCallback(() => {
    dispatch(setStageNumberWelcomeTooltip(toolTipStage + 1))
  }, [toolTipStage, dispatch])
  const content = (
    <>
      <StructureGrid
        spanLeft={19}
        leftChild={
          <p style={{ textAlign: "justify", fontSize: "12px" }}>
            {t('dashboard.presentationPanel.projectCreation')}
          </p>
        }
        spanRight={5}
        rightChild={
          <Row align="center">
            {<img src={tooltipProjectCreationImg} alt="" />}
          </Row>
        }
      />

      <Row align="right" justify="end">
        {/* <ButtonNoBackground
          fontSize={"10px"}
          padding={"8px 12px"}
          height={"100%"}
          margin="15px 12px 0 0"
        >
          Ignorer
        </ButtonNoBackground> */}
        <IgnoreButtonTooltip />
        <NextStepButton
          padding={"0px 12px"}
          fontSize={"10px"}
          margin="15px 0 0 0"
          onClick={handleClick}
        >
          {t('dashboard.presentationPanel.next')}
        </NextStepButton>
      </Row>
    </>
  )

  return (
    <Wrapper>
      <img id="image-logo-accueil" src={BienvenueImage} alt="accueil logo"  />
      <LeftContainer>
        <TextAnimationTitle id="texte-Choisissons-ensemble-lameilleure-méthode-!">
          {t('dashboard.presentationPanel.welcome')}
        </TextAnimationTitle>
        <DescriptionTextAnimation id="texte-intro-ELIT">
        {t('dashboard.presentationPanel.description1')}</DescriptionTextAnimation>
        <DescriptionTextAnimation id="texte-intro-ELIT-description">{t('dashboard.presentationPanel.description2')}</DescriptionTextAnimation>

        <ProjectCreationProvider style={{ marginTop: "2rem" }}>
          <Popover
            open={openTooltip}
            placement="topLeft"
            content={content}
            overlayStyle={{ width: "406px" }}
            overlayInnerStyle={{ padding: "0" }}
          >
            <div
              style={
                openTooltip
                  ? {
                    position: "relative",
                    zIndex: "2",
                    background: "white",
                    display: "block",
                    borderRadius: "4px",
                    padding: "8px 4px 6px 4px",
                  }
                  : {}
              }
            >
              <ModalProjectCreation />
            </div>
          </Popover>
        </ProjectCreationProvider>
      </LeftContainer>
    </Wrapper>
  );
})
