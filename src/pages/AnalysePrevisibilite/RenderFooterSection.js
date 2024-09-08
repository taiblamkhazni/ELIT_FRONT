
import { ButtonNoBackground, NextStepButton } from "components/Button/Button";
import { StructureGrid } from "components/Grid/Grid";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { NextStepButtonRight } from "./ModalAnalyse";

/**
 * @brief Styled container for the footer section.
 */
const FooterWrapper = styled.div`
  border-top: 1px solid #e9e9e9;
  margin: 1.5rem 0;
  padding: 1.5rem 0;
`;

/**
 * @brief Styled text component for the footer section.
 **/
const Text = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  color: ${(props) => (props.color ? props.color : " #1f1a28")};
`;

/**
 * @brief RenderFooterSection component
 */
const RenderFooterSection = ({
  current,
  result,
  currentUserRole,
  passToStage3,
  handleClickNextStepButtonRight,
  handleClickleftChild,
  handleClickNextStepButton,
  handleClickrightChild,
}) => {
  const isBrainStorming = useSelector((state) => state.previsibilityAnalysisReducer.isBrainStorming);
  if (current === 0) {
    return (
      <>
        {currentUserRole === "CDP" && (
          <NextStepButtonRight onClick={handleClickNextStepButtonRight}>
            Lancer l'analyse
          </NextStepButtonRight>
        )}
      </>
    );
  } else if (current === 1 && result === "high") {
    return (
      <StructureGrid
        spanLeft={12}
        spanRight={12}
        leftChild={
          <ButtonNoBackground margin="0" onClick={handleClickleftChild}>
            Retour au tableau de bord
          </ButtonNoBackground>
        }
        rightChild={
          <ButtonNoBackground
            style={{ float: "right" }}
            margin="0"
            onClick={handleClickNextStepButton}
          >
            Passer à l'étape 3
          </ButtonNoBackground>
        }
      />
    );
  } else if (current === 1 && result === "low") {
    return (
      <>
        <StructureGrid
          justifyRight="end"
          spanLeft={18}
          spanRight={6}
          leftChild={
            <Text>
              Nous vous recommandons de revoir les réponses de l’analyse multicritères grâce à une étape de brainstorming. Sinon, passez à l’étape 3.{" "}
            </Text>
          }
          rightChild={null}
        />

        <FooterWrapper>
          <StructureGrid
            justify="space-between"
            spanLeft={12}
            spanRight={12}
            leftChild={
              <ButtonNoBackground margin="0" onClick={handleClickleftChild}>
                Retour au tableau de bord
              </ButtonNoBackground>
            }
            rightChild={
              <>
                <ButtonNoBackground
                  style={{ float: "right",marginLeft: "10px" }}
                  margin="0"
                  onClick={passToStage3}
                >
                  Passer tout de même à l’étape 3
                </ButtonNoBackground>
                {!isBrainStorming && ( <NextStepButton
                  style={{ float: "right" }}
                  margin="0"
                  onClick={handleClickrightChild}
                >
                  Réaliser un Brainstorming
                </NextStepButton>)}    
              </>
            }
          />
        </FooterWrapper>
      </>
    );
  } else {
    return <></>;
  }
};

/**
 * @brief PropTypes for the RenderFooterSection component.
 */
RenderFooterSection.propTypes = {
  current: PropTypes.number.isRequired,
  result: PropTypes.string.isRequired,
  currentUserRole: PropTypes.string.isRequired,
  passToStage3: PropTypes.func.isRequired,
  handleClickButtonNoBackground: PropTypes.func.isRequired,
  handleClickNextStepButtonRight: PropTypes.func.isRequired,
  handleClickleftChild: PropTypes.func.isRequired,
  handleClickNextStepButton: PropTypes.func.isRequired,
  handleClickrightChild: PropTypes.func.isRequired,
};

export default RenderFooterSection;
