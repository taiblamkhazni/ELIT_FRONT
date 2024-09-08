/**
 * @file StageBase.js
 * @brief Exports the StageBase.js.
 */
import { useCallback, useState } from "react";
import { Card, Divider, Flex, Spin } from "antd";
import { Graph, InfoFill, Map, Pdf, TrendingArrow } from "assets/icons"
import TYPES from "common/analyseTypes"
import {
  BlockButton,
  ButtonNoBackground,
  NextStepButton,
} from "components/Button/Button"
import { StructureGrid } from "components/Grid/Grid"
import { SmallText, SmallTextHyperLink, TextBold } from "components/Text/Text"
import { TitleStep } from "components/Title/Title"
import ModalReportsList from "pages/ProjectDashboard/ModalReportsList"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import ROUTES from "routes/routes"
import MethodologieDonut from "shared/Graphs/MethodologieDonut"
import MethodologiePie from "shared/Graphs/MethodologiePie"
import StepColumn from "shared/Graphs/StepColumn"
import styled from "styled-components"
import urlJoin from "url-join"
import { Spinner } from "utils/Spinner"
import { t } from "utils/translationUtils";

/**
 * @var StageBaseWrapper
 * @brief StageBaseWrapper.
 */
export const StageBaseWrapper = styled.div`
  text-align: center;
  background-color: white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: ${(props) => (props.padding ? props.padding : "0")};
  height: ${(props) => (props.height ? props.height : "")};
`;

/**
 * @brief VerticalSpace.
 */
export const VerticalSpace = styled.div`
  display: flex;
  margin-top: ${(props) => (props.size ? props.size : "0")};
`;

/**
 * @brief WrapperGraph.
 */
export const WrapperGraph = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.width};
  height: 30rem;
  margin: 0;
`;
/**
 * @brief moreOneReports.
 * @param reportsNumber - reportsNumber.
 */
export const moreOneReports = (reportsNumber) => {
  return reportsNumber > 1 ? "s" : "";
};
/**
 * @brief StageBase : Displays the stage base component.
 * @param activated - activated.
 * @param title - title.
 * @param completed - completed.
 * @param step - step.
 * @param type - type.
 */
const StageBase = ({ activated, title, completed, step, type }) => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const projectId = useSelector((state) => state.projectReducer.projectId);
  const currentUser = useSelector((state) => state.projectReducer.currentUser);
  const reportsNumber = useSelector(
    (state) => state.projectReducer.reportsNumber
  );

  const percentages = useSelector(
    (state) => state.previsibilityAnalysisReducer.percentages
  );
  const valueMethodPrevi = useSelector(
    (state) => state.previsibilityAnalysisReducer.methodologies
  );
  const isLoadingApResult = useSelector(
    (state) => state.previsibilityAnalysisReducer.isLoadingApResult
  );

  const isFinishedPlanExe = useSelector(
    (state) => state.executionPlanReducer.isFinished
  );

  const resultPlanExeForDashboard = useSelector(
    (state) => state.executionPlanReducer.results
  );

  let checkObservateur = useSelector(
    (state) => state.projectReducer.checkUserIsObservateur
  );

  let route = ROUTES.analyseMulticriteres;
  if (step === 2) {
    route = ROUTES.analysePrevisibilite;
  } else if (step === 3) {
    route = ROUTES.planExecution;
  }

  const onCompleter = useCallback((url) => {
    navigate(url)
  }, [navigate])

  const handleClickNextStepButton = useCallback(() => {
    const url = urlJoin(pathname, route)
    return onCompleter(url)
  }, [onCompleter, pathname, route])

  const handleClickButtonNoBackground = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleClickSmallTextHyperLink = useCallback(() => {
    navigate(`/projets/${projectId}/etape2`)
  }, [navigate, projectId])

  const [isModalOpen, setIsModalOpen] = useState(false)

  let RenderContent;

  if (completed) {
    if (step === 1) {
      RenderContent = renderStepOne();
    } else if (step === 2) {
      RenderContent = renderStepTwo();
    } else if (step === 3) {
      RenderContent = renderStepThree();
    } else {
      RenderContent = <></>;
    }
  } else {
    RenderContent = renderNotCompleted();
  }

  /** Seperate functions for clarity  */
  /**
   * @brief renderStepOne : Renders the step one.
   */
  function renderStepOne() {
    return (
      <WrapperGraph>
        <StepColumn projectId={projectId} />
        <Divider style={{ marginBottom: 0 }} />
        <ButtonNoBackground
          id="boutton-visualisation-rapport"
          margin="1rem auto auto"
          width="100%"
          onClick={handleClickButtonNoBackground}
        >
          <Flex
            horizontal
            justify="center"
            align="center"
            style={{ gap: "1rem" }}
          >
            Voir le{moreOneReports(reportsNumber[TYPES.multicriteria])} rapport
            {moreOneReports(reportsNumber[TYPES.multicriteria])} (
            {reportsNumber[TYPES.multicriteria]}) <Pdf alt="icon PDF" />
          </Flex>
        </ButtonNoBackground>
      </WrapperGraph>
    );
  }

  /**
   * @brief renderStepTwo : Renders the step two.
   */
  function renderStepTwo() {
    return (
      <WrapperGraph>
        {valueMethodPrevi && <MethodologiePie />}
        {percentages < 50 && (
          <StructureGrid
            margin="8px 0 0"
            leftChild={<InfoFill fill="#C91432" fontSize="1.2rem" />}
            rightChild={
              <>
                {isFinishedPlanExe || reportsNumber[TYPES.predictibility] == 2 ? (
                  <SmallText
                    color="#1F1A28"
                    margin="0 1rem"
                    style={{ textAlign: "justify" }}
                  >
                    Les résultats suite au choix de la méthodologie ont été
                    identifiés comme étant LOW.
                  </SmallText>
                ) : (
                  <>
                    {checkObservateur ? (
                      <SmallText
                        color="#1F1A28"
                        margin="0 1rem"
                        style={{ textAlign: "justify" }}
                      >
                        Les résultats suite au choix de la méthodologie ont été
                        identifiés comme étant LOW.
                      </SmallText>
                    ) : (
                      <SmallTextHyperLink
                        color="#1F1A28"
                        margin="0 1rem"
                        style={{ textAlign: "justify" }}
                        onClick={handleClickSmallTextHyperLink}
                      >
                        Les résultats suite au choix de la méthodologie ont été
                        identifiés comme étant LOW.
                      </SmallTextHyperLink>
                    )}
                  </>
                )}
              </>
            }
            spanLeft={1}
            spanRight={23}
            justify="center"
            align="top"
            padding="0 0 15px 0"
          />
        )}
        <Divider style={{ marginBottom: 0 }} />
        <ButtonNoBackground
          margin="1rem auto auto"
          width="100%"
          onClick={handleClickButtonNoBackground}
        >
          <Flex
            horizontal
            justify="center"
            align="center"
            style={{ gap: "1rem" }}
          >
            Voir le{moreOneReports(reportsNumber[TYPES.predictibility])} rapport
            {moreOneReports(reportsNumber[TYPES.predictibility])} (
            {reportsNumber[TYPES.predictibility]}) <Pdf alt="icon PDF" />
          </Flex>
        </ButtonNoBackground>
      </WrapperGraph>
    );
  }

  /**
   * @brief renderStepThree : Renders the step three.
   */
  function renderStepThree() {
    return (
      <WrapperGraph>
        {resultPlanExeForDashboard ? (
          <MethodologieDonut results={resultPlanExeForDashboard} />
        ) : (
          <Flex align="center" style={{ height: "100%" }}>
            <Spin />
          </Flex>
        )}
        <Divider style={{ marginBottom: 0 }} />
        <ButtonNoBackground
          margin="1rem auto auto"
          width="100%"
          onClick={handleClickButtonNoBackground}
        >
          <Flex
            horizontal
            justify="center"
            align="center"
            style={{ gap: "1rem" }}
          >
            Voir le{moreOneReports(reportsNumber[TYPES.execution])} rapport
            {moreOneReports(reportsNumber[TYPES.execution])} (
            {reportsNumber[TYPES.execution]}) <Pdf alt="icon PDF" />
          </Flex>
        </ButtonNoBackground>
      </WrapperGraph>
    );
  }

  /**
   * @brief renderNotCompleted : Renders the not completed.
   */
  function renderNotCompleted() {
    if (!checkObservateur) {
      if (currentUser?.role === "Contributeur" && step === 1) {
        return (
          <WrapperGraph>
            {step == 1 ? (
              <Graph
                alt="icon graphique"
                width="4.5rem"
                height="4.5rem"
                activated={activated}
              />
            ) : step == 2 ? (
              <TrendingArrow
                alt="Icon fleche montante "
                width="4.5rem"
                height="4.5rem"
                activated={activated}
              />
            ) : (
              <Map
                alt="Icon carte Plan d'exécution"
                width="4.5rem"
                height="4.5rem"
                activated={activated}
              />
            )}
            <TextBold color="#7A7A7A">
              Cette étape est en cours. Son résultat n'est pas encore
              disponible.
            </TextBold>
          </WrapperGraph>
        );
      } else {
        return (
          <WrapperGraph style={{ padding: "97px 1.5rem" }}>
            {step == 1 ? (
              <Graph
                id="graphe-multicritere-sans-rapport"
                alt="icon graphique"
                width="4.5rem"
                height="4.5rem"
                activated={activated}
              />
            ) : step == 2 ? (
              <TrendingArrow
                alt="Icon fleche montante "
                id="fleche-montante"
                width="4.5rem"
                height="4.5rem"
                activated={activated}
              />
            ) : (
              <Map
                alt="Icon carte Plan d'exécution"
                width="4.5rem"
                height="4.5rem"
                activated={activated}
              />
            )}
            {activated && step === 1 ? (
              <>
                {isLoadingApResult ? (
                  <Spinner size="small" message="" />
                ) : (
                  <>
                    <TextBold
                      id="analyse-previsibilite-etape"
                      textAlign="center"
                      color="#7A7A7A"
                      width="100%"
                    >
                      Étape 1
                    </TextBold>
                    <NextStepButton
                      id="completer-formulaire"
                      margin="0 0 1.5rem 0"
                      width="100%"
                      onClick={handleClickNextStepButton}
                    >
                      Compléter le formulaire
                    </NextStepButton>
                  </>
                )}
              </>
            ) : activated && step === 2 ? (
              <>
                {isLoadingApResult ? (
                  <Spinner size="small" message="" />
                ) : (
                  <>
                    <TextBold
                      id="analyse-previsibilite-etape"
                      textAlign="center"
                      color="#7A7A7A"
                      width="100%"
                    >
                      Étape 2
                    </TextBold>
                    <NextStepButton
                      id="completer-formulaire"
                      margin="0 0 1.5rem 0"
                      width="100%"
                      onClick={handleClickNextStepButton}
                    >
                      Compléter le formulaire
                    </NextStepButton>
                  </>
                )}
              </>
            ) : activated && step === 3 ? (
              <>
                {isLoadingApResult ? (
                  <Spinner size="small" message="" />
                ) : (
                  <>
                    <TextBold
                      id="analyse-previsibilite-etape"
                      textAlign="center"
                      color="#7A7A7A"
                      width="100%"
                    >
                      Étape 3
                    </TextBold>
                    <NextStepButton
                      id="completer-formulaire"
                      margin="0 0 1.5rem 0"
                      width="100%"
                      onClick={handleClickNextStepButton}
                    >
                      Compléter le formulaire
                    </NextStepButton>
                  </>
                )}
              </>
            ) : (
              <>
                <TextBold textAlign="center" color="#7A7A7A">
                  {`Étape ${step}`}
                </TextBold>
                <BlockButton width="100%" margin="0 0 1.5rem 0">
                  Compléter le formulaire
                </BlockButton>
              </>
            )}
          </WrapperGraph>
        );
      }
    } else {
      return (
        <WrapperGraph style={{ padding: "97px 1.5rem" }}>
          {step == 1 ? (
            <Graph width="4.5rem" height="4.5rem" activated={activated} />
          ) : step == 2 ? (
            <TrendingArrow
              width="4.5rem"
              height="4.5rem"
              activated={activated}
            />
          ) : (
            <Map width="4.5rem" height="4.5rem" activated={activated} />
          )}
          <TextBold color="#7A7A7A">
            Cette étape est en cours. Son résultat n'est pas encore disponible
          </TextBold>
        </WrapperGraph>
      );
    }
  }

  return (
    <Flex vertical>
      <ModalReportsList
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={title}
        type={type}
      />
      <TitleStep
        id={
          title == t("projectDashboard.listStage.multicriteria")
            ? "analyse-multicritere"
            : title == t("projectDashboard.listStage.predictibility")
            ? "titre-analyse-previsibilite"
            : ""
        }
        style={{
          textAlign: "center",
          lineHeight: "3rem",
          color: "#116E9C",
        }}
      >
        {title}
      </TitleStep>
      <Card
        bordered={false}
        style={{
          width: "23vw",
        }}
      >
        {RenderContent}
      </Card>
    </Flex>
  );
};

export default StageBase;
