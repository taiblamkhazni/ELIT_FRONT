/**
 * @file TooltipModal
 * @brief This component displays a tooltip modal with different stages based on the user's welcome tooltip stage.
 */

import { useCallback } from "react";
import { Row } from "antd";
import tooltipCongratulationImg from "assets/images/image_congratulations.png";
import { NextStepButton } from "components/Button/Button";
import { StructureGrid } from "components/Grid/Grid";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  setStageNumberWelcomeTooltipEnd,
} from "reducers/welcomeTooltip/welcomeTooltipReducer";
import { t } from "utils/translationUtils";


export default () => {
  const toolTipStage = useSelector(
    (state) => state.welcomeTooltipReducer.stageNumber
  ); // Getting the current tooltip stage from Redux state
  const openTooltip = toolTipStage === 6;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentificationReducer.user);

  // Function to handle click on the "Fin" button
  const handleClickPrevStepButtonFin = useCallback(() => {
    const cookies = new Cookies();
    dispatch(setStageNumberWelcomeTooltipEnd(-1));
    cookies.set("isShowedTooltip_" + user.id, "yes", {
      path: "/",
      maxAge: 3600 * 24 * 30,
    });
  }, [user.id, dispatch]);

  /** Function to render tooltip content based on the tooltip stage*/
  const renderTooltipContent = () => {
    if (toolTipStage === 6) {
      return (
        <>
          <h2 style={{ fontSize: "18px", fontWeight: 700 }}>
          {t('dashboard.toolTipModal.congratsOnFinishingIntro')}
          </h2>

          <p style={{ textAlign: "justify", fontSize: "12px" }}>
          {t('dashboard.toolTipModal.useDifferentFunctionalities')}
          </p>
          <p style={{ textAlign: "justify", fontSize: "12px" }}>
          {t('dashboard.toolTipModal.navigateOrCreateFirstProject')}
          </p>
        </>
      );
    }
    return null;
  };

  /** Function to render the "Next Step" or "Fin" button based on the tooltip stage */
  const renderNextStepButton = () => {
    if (toolTipStage === 6) {
      return (
        <NextStepButton
          padding={"8px 17px"}
          fontSize={"10px"}
          margin="15px 0 0 0"
          onClick={handleClickPrevStepButtonFin}
        >
          {t('dashboard.toolTipModal.theEnd')}
        </NextStepButton>
      );
    }
    return null;
  };

  return (
    <div
      style={
        openTooltip
          ? {
              position: "absolute",
              zIndex: "2",
              background: "white",
              display: "block",
              borderRadius: "4px",
              width: "40%",
              top: "35%",
              left: "30%",
              padding: "15px",
            }
          : {}
      }
    >
      {openTooltip && (
        <>
          <StructureGrid
            spanLeft={19}
            leftChild={renderTooltipContent()}
            spanRight={5}
            rightChild={
              <Row align="center">
                {toolTipStage === 6 && (
                  <img src={tooltipCongratulationImg} alt="" />
                )}
              </Row>
            }
          />

          <Row align="right" justify="end">
            {renderNextStepButton()}
          </Row>
        </>
      )}
    </div>
  );
};
