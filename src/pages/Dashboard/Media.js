/**
 * @file Media.js
 * @brief This component displays media content and a tooltip for explaining ELIT.
 * It includes a video, description text, and a tooltip with additional information.
 */
import { useCallback } from "react";
import { Flex, Popover, Row } from "antd";
import tooltipVideolImg from "assets/images/image_video.png";
import { NextStepButton } from "components/Button/Button";
import { StructureGrid } from "components/Grid/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setStageNumberWelcomeTooltip } from "reducers/welcomeTooltip/welcomeTooltipReducer";
import styled from "styled-components";
import { t } from "utils/translationUtils";

import IgnoreButtonTooltip from "./IgnoreButtonTooltip";
import Video from "./marketing.mp4";


/**
 * @brief Styled component for description content.
 */
const DescriptionContent = styled(Flex)`
  gap: 1rem;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

/**
 * @brief Styled component for description text.
*/
const DescriptionText = styled.div`
  text-align: justify;
  line-height: 28px;
  font-size: 16px;
`;

/**
 * @brief Media component.
 */
export default () => {
  // Selecting the stage number from the welcome tooltip reducer
  const toolTipStage = useSelector(
    (state) => state.welcomeTooltipReducer.stageNumber
  );
  const dispatch = useDispatch();

  const openTooltip = toolTipStage === 4;

  const handleClick = useCallback(() => {
    dispatch(setStageNumberWelcomeTooltip(toolTipStage + 1))
  }, [toolTipStage,dispatch])
  const content = (
    <>
      <StructureGrid
        spanLeft={19}
        leftChild={
          <p style={{ textAlign: "justify", fontSize: "12px" }}>
            {t('dashboard.media.welcomeVideoDescription')}
          </p>
        }
        spanRight={5}
        rightChild={
          <Row align="center">{<img src={tooltipVideolImg} alt="" />}</Row>
        }
      />

      <Row align="right" justify="end">
        {/* Component for ignoring the tooltip */}
        <IgnoreButtonTooltip />
        {/* Button for moving to the next step */}
        <NextStepButton
          padding={"0px 12px"}
          fontSize={"10px"}
          margin="15px 0 0 0"
          onClick={handleClick}
        >
          Suivant
        </NextStepButton>
      </Row>
    </>
  );

  return (
    <Flex vertical>
      <p id="texte-QuestionPresentationElit" style={{ fontSize: "24px", fontWeight: 700, marginBottom: "20px" }}>
      {t('dashboard.media.whatIsElit')}
      </p>
      <DescriptionContent id="bloc-TexteVideoPresentationElit">
        <DescriptionText>
          <p id="bloc-premierparagrapheElit">
           {t('dashboard.media.elitDescription')}
          </p>
          <ul>
            <li id="texte-Multicritere">{t('dashboard.media.multicriteriaAnalysis2')}</li>
            <li id="texte-Analysepredictive">
            {t('dashboard.media.predictiveAnalysis')}
            </li>
          </ul>
        </DescriptionText>
        <Popover
          data-testid="tooltip-popover"
          open={openTooltip}
          placement="top"
          content={content}
          trigger="click"
          overlayStyle={{ width: "406px" }}
          overlayInnerStyle={{ padding: "0" }}
        >
          <Row justify="center" align="middle">
            <video
              id="video-presentation-Elit"
              width="100%"
              controls
              style={
                openTooltip
                  ? {
                      position: "relative",
                      zIndex: "2",
                      background: "white",
                      display: "block",
                      borderRadius: "4px",
                      padding: "5px",
                    }
                  : {
                      border: "1px solid #e9E9E9",
                      cursor: "pointer",
                      display: "block",
                    }
              }
            >
              <source src={Video} />
            </video>
          </Row>
        </Popover>
      </DescriptionContent>
    </Flex>
  );
};
