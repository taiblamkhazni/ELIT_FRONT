/**
 * @file Results.js
 * @brief This module exports MenuTitle component
 */
import { memo, useEffect, useState } from "react";
import { Flex } from "antd";
import { HandsClapping, Pdf } from "assets/icons";
import useAvatarsList from "components/AvatarCustomUrl/useAvatarsList";
import { ButtonNoBackground } from "components/Button/Button";
import { StructureGrid } from "components/Grid/Grid";
import { uploadReportApi } from "hooks/apis/ReportApi";
import GraphsBars from "pages/AnalysePrevisibilite/Graphs/GraphsBars";
import { choosenMethodologyFunction } from "pages/PlanExecution/Resultat";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SpinnerPdf } from "utils/Spinner";

import { BlobProvider } from "@react-pdf/renderer";

import GraphsGauge from "./Graphs/GraphsGauge";
import ReportPDF from "./PrevisibilitePDF/ReportPDF";


/**
 * @brief Wrapper : Wrapper Component
 */
const Wrapper = styled.div`
  margin-top: 40px;
`;

/**
 *
 */
const CongratulationsWrapper = styled(Flex)`
  margin: 1.5rem 0;
  padding: 1rem;

  background-color: white;
  border: 1px solid #e9e9e9;
`;
/**
 * @brief CongratulationsText : Congratulations Text Component
 **/
const CongratulationsText = styled.div`
  display: flex;
  align-items: center;

  padding: 0 1rem;
  gap: 1rem;

  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #1f1a28;
`;



/**
 * @brief Report : Report Component
 **/
const Report = ({
  canPassState,
  projectData,
  votes,
  brainstormingResume,
  escoreBase64,
  methodBase64,
  gaugeBase64,
  result,
  methodologieChoosed,
  methodologies,
  avatarsList,
  projectId,
  id,
}) => {
  //const dispatch = useDispatch()
  const isIteration2AP = useSelector(
    (state) => state.multicriteriaAnalysisReducer.isIteration2AP
  );

  const [uploadedIteration2, setUploadedIteration2] = useState(false);

  /**
   * @brief uploadReport : Report Component
   **/
  const uploadReport = (
    projectData,
    loading,
    blob,
    projectId,
    analyseId,
  ) => {
    if (!loading) {
      if (blob && projectId && analyseId) {
        const iteration = isIteration2AP ? 2 : 1;
        if (iteration === 2) {
          setUploadedIteration2(true);
        }
        const formData = new FormData();
        formData.append(
          "file",
          new File(
            [blob],
            (
              "Prévisibilité_" +
              projectData.name +
              "_" +
              analyseId +
              "_iteration" +
              iteration +
              ".pdf"
            ).replace(/ /g, "")
          )
        );
        uploadReportApi(
          projectId,
          analyseId,
          "predictibility_report",
          formData,
          iteration
        );
      }
    }
  };
  if (
    canPassState &&
    avatarsList.length === projectData.contributors.length
  ) {
    return (
      <BlobProvider
        document={
          <ReportPDF
            project={projectData}
            votes={votes}
            eScore={escoreBase64}
            brainstormingResume={brainstormingResume}
            aspectsBar={methodBase64}
            aspectsGauge={gaugeBase64}
            result={result}
            methodologieChoosed={methodologieChoosed}
            methodologies={methodologies}
            avatarsList={avatarsList}
          />
        }
      >

        {({ blob, url, loading }) => {
          if (loading) {
            return <SpinnerPdf size="medium" message="Loading..." />;
          }
          if (!uploadedIteration2) {
            if (methodBase64 !== "" && escoreBase64 !== "" && (gaugeBase64.includes("data:image") || gaugeBase64 !== "")) {
              uploadReport(projectData, loading, blob, projectId, id);
            }
          }
          return (
            <>
              {url ? (
                <ButtonNoBackground
                  padding=".5rem 1rem"
                  fontSize="1rem"
                  margin="auto 0 auto 1rem"
                  onClick={() => window.open(url)}
                >
                  <Flex horizontal align="center" style={{ gap: ".5rem" }}>
                    Voir le rapport <Pdf alt="icon PDF" />
                  </Flex>
                </ButtonNoBackground>
              ) : (
                <SpinnerPdf size="medium" message="Loading..." />
              )}
            </>
          );
        }}
      </BlobProvider>
    );

  } else {
    return <SpinnerPdf size="medium" message="Loading..." />;
  }

};

/**
 * @brief Results : Results Component
 **/
const Results = ({
  result,
  methodologies,
  elementalEscores = [],
}) => {
  const id = useSelector((state) => state.previsibilityAnalysisReducer.id);
  const votes = useSelector(
    (state) => state.previsibilityAnalysisReducer.votes
  );
  const isLoadingReport = useSelector(
    (state) => state.previsibilityAnalysisReducer.isLoadingReport
  );
  const sections = useSelector(
    (state) => state.brainStormingResumeReducer.brainStorming
  )
  const isLoading = useSelector(
    (state) => state.brainStormingResumeReducer.isLoading
  )
  const projectData = useSelector((state) => state.projectReducer.project);
  const avatarsList = useAvatarsList(projectData.contributors);
  const { projectId } = projectData;

  const escoreBase64 = useSelector((state) => state.aspectsBarEScore.base64);
  const methodBase64 = useSelector((state) => state.aspectsBarMethod.base64);
  const gaugeBase64 = useSelector((state) => state.aspectsGauge.base64);

  const methodologieChoosed =
    choosenMethodologyFunction(methodologies).elementHavingMax?.name;

  const [canPassState, setCanPassState] = useState(false);
  const [brainstormingResume, setBrainstormingResume] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let canPass = false;
    if (result === "high") {
      canPass = [
        projectData,
        votes,
        methodBase64,
        gaugeBase64,
        result,
        methodologieChoosed,
        methodologies,
        avatarsList,
      ].every(Boolean);
    }

    if (result === "low") {
      setBrainstormingResume([...sections]
        ?.sort((a, b) => (a.stepRef > b.stepRef ? 1 : -1))
        .map((brainstormingRes) => {
          const filteredQuestions = brainstormingRes.formQuestions.filter(
            (question) => question.brainstormings && question.brainstormings.length > 0
          );
          return {
            ...brainstormingRes,
            formQuestions: filteredQuestions
          };
        })
        .filter((brainstormingRes) => brainstormingRes.formQuestions.length > 0));

      if (brainstormingResume.length > 1) {
        canPass = [
          !isLoading,
          brainstormingResume,
          projectData,
          votes,
          escoreBase64,
          methodBase64,
          gaugeBase64,
          result,
          methodologieChoosed,
          methodologies,
          avatarsList,
        ].every(Boolean);
      } else {
        canPass = [
          projectData,
          votes,
          escoreBase64,
          methodBase64,
          gaugeBase64,
          result,
          methodologieChoosed,
          methodologies,
          avatarsList,
        ].every(Boolean);
      }



    }
    if (canPass) {
      setCanPassState(true);
    } else {
      setCanPassState(false);
    }
  }, [sections, projectData, votes, escoreBase64, methodBase64, gaugeBase64, result, methodologies, methodologieChoosed, avatarsList, isLoading]);

  return (
    <Wrapper>
      <Flex justify="space-between">
        <p>
          Les résultats issus de l'étape 2 de du choix de la méthodologie ainsi
          que toutes vos réponses sont disponibles dans ce PDF.
        </p>
        {isLoadingReport && (
          <Report
            canPassState={canPassState}
            brainstormingResume={brainstormingResume}
            projectData={projectData}
            votes={votes}
            escoreBase64={escoreBase64}
            methodBase64={methodBase64}
            gaugeBase64={gaugeBase64}
            result={result}
            methodologieChoosed={methodologieChoosed}
            methodologies={methodologies}
            avatarsList={avatarsList}
            projectId={projectId}
            id={id}
            dispatch={dispatch}
          />
        )}
      </Flex>
      {result === "high" && (
        <>
          <CongratulationsWrapper vertical>
            <CongratulationsText>
              <HandsClapping alt="icon main qui applaudit " width="28.55px" height="30.6px" fill="#178036" />{" "}
              Félicitations !
            </CongratulationsText>
            <div style={{ padding: ".5rem" }}>
              Le résultat obtenu à l’issue du choix de la méthodologie indique
              que l’équipe a convergé sur le choix d’une{" "}
              <b>méthodologie {`${methodologieChoosed}`}</b>. <br></br>
              Découvrez maintenant le plan d’exécution proposé par ELIT afin de
              chosir la méthode appropriée.
            </div>
          </CongratulationsWrapper>
          <StructureGrid
            gutter={16}
            justify="space-between"
            margin="auto auto 1.5rem"
            spanLeft={20}
            spanRight={4}
            leftChild={
              <GraphsBars
                name="Choix de la méthodologie"
                type="method"
                methodologies={methodologies}
              />
            }
            rightChild={
              <GraphsGauge
                name="Valeur moyenne des 3 aspects décisionnels"
                result={result}
              />
            }
          />
        </>
      )}

      {result === "low" && (
        <>
          <StructureGrid
            gutter={16}
            justify="space-between"
            margin="auto auto 1.5rem"
            spanLeft={24}
            spanRight={0}
            leftChild={
              <GraphsBars
                name="Choix de la méthodologie"
                type="method"
                methodologies={methodologies}
              />
            }
            rightChild={null}
          />
          <StructureGrid
            gutter={16}
            justify="space-between"
            margin="auto auto 1.5rem"
            spanLeft={4}
            spanRight={20}
            leftChild={
              <GraphsGauge
                name="Valeur moyenne des 3 aspects décisionnels"
                result={result}
              />
            }
            rightChild={
              <GraphsBars
                name="Résultat de l’analyse multicritères"
                type="e-score"
                methodologies={methodologies}
                elementalEscores={elementalEscores}
              />
            }
          />
        </>
      )}
    </Wrapper>
  );
};

/**
 * @brief Results : PropTypes
 **/
Results.propTypes = {
  result: PropTypes.string, // (low|high) - the status of analysis result
  methodologies: PropTypes.array,
  elementalEscores: PropTypes.array,
};

export default memo(Results);
