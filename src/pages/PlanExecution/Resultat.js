/**
 * @file ProjectReportsUI.js
 * @brief Exports the ProjectReportsUI.js.
 */
import { memo, useCallback, useEffect } from "react"
import { Col, Row } from "antd"
import { Flex } from "antd";
import { Pdf } from "assets/icons"
import HandsClapping from "assets/icons/symbols/hands-clapping"
import useAvatarsList from "components/AvatarCustomUrl/useAvatarsList"
import { ButtonNoBackground, NextStepButton } from "components/Button/Button"
import { HorizontalDivider } from "components/Divider/Divider"
import { StructureGrid } from "components/Grid/Grid"
import { TitleSection } from "components/Title/Title"
import { uploadReportApi } from "hooks/apis/ReportApi"
import { ColText } from "pages/AnalyseMulticriteres/MiddleContent/Results"
import { StageBaseWrapper } from "pages/ProjectDashboard/StageBase"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
    setMethodology
} from "reducers/executionPlan/executionPlanReducer"
import { getProjectFetch } from "reducers/project/projectReducer"
import ROUTES from "routes/routes"
import MethodologiePie from "shared/Graphs/MethodologiePie"
import styled from "styled-components";
import { Spinner } from "utils/Spinner"

import { BlobProvider } from "@react-pdf/renderer"

import ReportPDF from "./ExecutionPlanPDF/ReportPDF"
import MethodsBar from "./Graphs/MethodsBar"

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
 * @var choosenMethodologyFunction
 * @brief choosenMethodologyFunction.
 */
export const choosenMethodologyFunction = (methodologies) => {

    return methodologies?.reduce(
        (acc, element) => {
            if (element.value > acc.max) {
                acc["max"] = element.value
                acc["elementHavingMax"] = element
            }
            return acc
        },
        { max: 0, elementHavingMax: null }
    )
}

/**
 * @var ResultsFooter
 * @brief ResultsFooter.
 */
const ResultsFooter = ({ projectId }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleClick = useCallback(() => {
        dispatch(getProjectFetch(projectId))
        navigate(ROUTES.projets + "/" + projectId)
    }, [dispatch, projectId, navigate])
    return (
        <Col span={24} align="end">
            <NextStepButton
                margin="30px 0 0 0"
                onClick={handleClick}
            >
                Retour au tableau de bord
            </NextStepButton>
        </Col>
    )
}

/**
 * @var Report
 * @brief Report.
 */
const Report = ({
    executionPlanId,
    countVotes,
    chooseMethod,
    projectData,
    choosenMethodology,
    isLoadingReport,
    projectId,
    name
}) => {
    const avatarsList = useAvatarsList(projectData.contributors)
    const inputForm = useSelector(
        (state) => state.executionPlanReducer.inputForm
    )
    const listQuestions = useSelector(
        (state) => state.executionPlanReducer.listQuestions
    )

    const methodsBarBase64 = useSelector((state) => state.methodsBar.base64)
    const methodsPieBase64 = useSelector((state) => state.methodsPie.base64)

    const uploadReport = (loading, blob, projectId, analyseId) => {
        if (!loading) {
            if (blob && projectId && analyseId) {
                const formData = new FormData()
                formData.append(
                    "file",
                    new File(
                        [blob],
                        ("Exécution_" + name + "_" + analyseId + ".pdf").replace(/ /g, "")
                    )
                )
                uploadReportApi(projectId, analyseId, "execution_report", formData)
            }
        }
    }
    if (
        methodsBarBase64 &&
        methodsPieBase64 &&
        countVotes &&
        chooseMethod &&
        inputForm &&
        listQuestions &&
        projectData &&
        choosenMethodology &&
        avatarsList
    ) {
        return (
            <BlobProvider
                document={
                    <ReportPDF
                        methodsBar={methodsBarBase64}
                        methodologiePie={methodsPieBase64}
                        listQuestions={listQuestions}
                        project={projectData}
                        choosenMethodology={choosenMethodology}
                        inputForm={inputForm}
                        countVotes={countVotes}
                        chooseMethod={chooseMethod}
                        avatarsList={avatarsList}
                    />
                }
            >
                {({ blob, url, loading }) => {
                    if (loading) {
                        return <Spinner size="medium" message="" />
                    }
                    if (isLoadingReport) {
                        uploadReport(loading, blob, projectId, executionPlanId)
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
                                <Spinner size="medium" message="" />
                            )}
                        </>
                    )
                }}
            </BlobProvider>
        )
    } else {
        return <Spinner size="medium" message="" />
    }
}

/**
 * @var default
 * @brief default.
 */
export default memo(({ resultatPlanExecution }) => {
    const dispatch = useDispatch()
    const projectData = useSelector((state) => state.projectReducer.project)
    const { projectId, name } = projectData
    const choosenMethodology = useSelector(
        (state) => state.executionPlanReducer.choosenMethodology
    )
    const isLoadingReport = useSelector(
        (state) => state.executionPlanReducer.isLoadingReport
    )
    const { executionPlanId, predictibilityResults, countVotes, chooseMethod } =
        resultatPlanExecution
    const id = useSelector((state) => state.previsibilityAnalysisReducer.id)
    const methodologies = predictibilityResults
    const chooseMethodology = choosenMethodologyFunction(methodologies)

    /** Function to replace nested ternary operation in Methodology section */
    const getMethodologyName = (choosenMethodology) => {
        if (choosenMethodology?.name === "CLASSIC") {
            return "Classique";
        }
        if (choosenMethodology?.name === "AGILE") {
            return "Agile";
        }
        return "Hybride";
    };

    useEffect(() => {
        dispatch(setMethodology(chooseMethodology.elementHavingMax))
    }, [chooseMethodology, dispatch, isLoadingReport])



    return (
        <Wrapper>
            <Flex justify="space-between">
                <p>
                    Les résultats issus de l'étape 3 du plan d'exécution ainsi que toutes vos réponses sont enregistrés dans un PDF que vous pouvez le visualiser et le télécharger.
                </p>
                {isLoadingReport &&
                    <Report
                        executionPlanId={executionPlanId}
                        countVotes={countVotes}
                        chooseMethod={chooseMethod}
                        projectData={projectData}
                        choosenMethodology={chooseMethodology}
                        isLoadingReport={isLoadingReport}
                        projectId={projectId}
                        name={name}
                    />
                }
            </Flex>

            <CongratulationsWrapper vertical>
                <CongratulationsText>
                    <HandsClapping alt="icon main qui applaudit " width="28.55px" height="30.6px" fill="#178036" />{" "}
                    Félicitations !
                </CongratulationsText>
                <div id="testId" style={{ padding: ".5rem" }}>
                    Le résultat obtenu à l’issue du choix de la méthodologie indique
                    que l’équipe a convergé sur le choix de la méthode{" "}
                    <b>{getMethodologyName(choosenMethodology)}</b>.
                </div>
            </CongratulationsWrapper>
            <StructureGrid
                justify="center"
                gutter={[22, 0]}
                spanLeft={8}
                spanRight={16}
                leftChild={
                    <StageBaseWrapper padding={"24px"} height="35rem">
                        <TitleSection style={{ marginBottom: "20px" }}>
                            Méthodologie choisie à l’étape précédente
                        </TitleSection>
                        <div style={{ height: "90%" }}>
                            <MethodologiePie />
                        </div>
                    </StageBaseWrapper>
                }
                rightChild={
                    <StageBaseWrapper height="35rem">
                        <div style={{ padding: "1.5rem 0 0 1.5rem", height: "10%" }}>
                            <TitleSection>Résultat de l’analyse de l’étape 3 ({countVotes} {countVotes > 1 ? 'votes' : 'vote'})</TitleSection>
                        </div>
                        <div style={{ height: "78%" }}>
                            <MethodsBar />
                        </div>
                    </StageBaseWrapper>
                }
            />
            <ResultsFooter projectId={projectId} />
        </Wrapper>


    )
})
