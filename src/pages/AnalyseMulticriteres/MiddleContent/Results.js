/**
 * @file Results.js
 * @brief Results Display Module
 *
 * This module showcases the results from a multicriteria analysis.
 * It provides both a graphical representation and an exportable PDF report.
 * The Results component uses various graph components, avatars, and Redux state to produce the output.
 */
import { useEffect } from "react";
import { Col, Flex, Row } from "antd";
import { Pdf } from "assets/icons";
import useAvatarsList from "components/AvatarCustomUrl/useAvatarsList";
import { ButtonNoBackground } from "components/Button/Button";
import { uploadReportApi } from "hooks/apis/ReportApi";
import PropTypes from "prop-types";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getResultsMultiByProjectIdFetch } from "reducers/multicriteriaAnalysis/multicriteriaAnalysisReducer";
import {
    chartMultiReportStateSelector,
    listStepweightsMultiAnalysisSelector,
} from "reducers/selectors";
import { initiateAllStateWeight } from "store/features/AnalyseMulticritereFeatures/weightPieSlice";
import styled from "styled-components";
import { SpinnerPdf } from "utils/Spinner";

import { BlobProvider } from "@react-pdf/renderer";

import ChartForCriteriaWeight from "../MulticriterePDF/ChartForCriteriaWeight";
import ReportPDF from "../MulticriterePDF/ReportPDF";

import GraphsBars from "./Graphs/GraphsBars";
import GraphsColumns from "./Graphs/GraphsColumns";

/**
 * @brief Wrapper component for the Results module.
 */
const Wrapper = styled.div`
  margin-top: 40px;
`;

/**
 * @brief Styled column component for the Results module.
 */
const ColBar = styled(Col)`
  margin: 16px 0 16px 0;
`;

/**
 * @brief Styled column component for text display.
 **/
export const ColText = styled(Col)`
  height: 88px;
  background: #ffffff;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  padding: 1.2rem 1.5rem;
  line-height: 1.5rem;
  margin: 0 0 1rem 0;
`;

/**
 * Report
 * @brief Generates and renders a downloadable PDF report for the multicriteria analysis.
 *
 * @param {Object} props - Properties passed to the component
 * @returns {JSX.Element} A BlobProvider component that produces the report.
 */
const Report = ({
    projectData,
    analyseMulticriteresResult,
    barBase64,
    specificiteBase64,
    certitudeBase64,
    manoeuvrabiliteBase64,
    specificiteWeightBase64,
    certitudeWeightBase64,
    manoeuvrabiliteWeightBase64,
    avatarsList,
    projectId,
    multiCriteriaAnalysisId,
}) => {
    const isIteration2AP = useSelector(
        (state) => state.multicriteriaAnalysisReducer.isIteration2AP
    );

    const uploadReport = (loading, blob, projectId, analyseId) => {
        if (!loading) {
            if (blob && projectId && analyseId) {
                const iteration = isIteration2AP ? 2 : 1;
                const formData = new FormData();
                formData.append(
                    "file",
                    new File(
                        [blob],
                        (
                            "Multicritères_" +
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
                    "multicriteria_report",
                    formData,
                    iteration
                );
            }
        }
    };

    if (
        projectData &&
        analyseMulticriteresResult &&
        barBase64 &&
        specificiteBase64 &&
        certitudeBase64 &&
        manoeuvrabiliteBase64 &&
        specificiteWeightBase64 &&
        certitudeWeightBase64 &&
        manoeuvrabiliteWeightBase64 &&
        avatarsList.length === projectData.contributors.length
    ) {
        return (
            <BlobProvider
                document={
                    <ReportPDF
                        project={projectData}
                        bar={barBase64}
                        specificite={specificiteBase64}
                        certitude={certitudeBase64}
                        manoeuvrabilite={manoeuvrabiliteBase64}
                        specificiteWeightBase64={specificiteWeightBase64}
                        certitudeWeightBase64={certitudeWeightBase64}
                        manoeuvrabiliteWeightBase64={manoeuvrabiliteWeightBase64}
                        analyseMulticriteresResult={analyseMulticriteresResult}
                        avatarsList={avatarsList}
                    />
                }
            >
                {({ blob, url, loading }) => {
                    if (loading) {
                        return <SpinnerPdf size="medium" message="Loading..." />;
                    }
                    uploadReport(loading, blob, projectId, multiCriteriaAnalysisId);
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
                                        Voir le rapport <Pdf />
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
 * Results
 * @brief Main component that renders graphical results and the downloadable PDF report.
 *
 * @param {Object} props - Properties passed to the component
 * @returns {JSX.Element} A wrapper component with all visualizations and the report.
 */
const Results = ({
    allGraphSorted,
    partialResultsData,
    projectData,
    projectId,
}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initiateAllStateWeight());
        if (projectId) {
            dispatch(getResultsMultiByProjectIdFetch(projectId));
        }
    }, [projectId,dispatch]);

    const avatarsList = useAvatarsList(projectData.contributors);

    const multiCriteriaAnalysisId = useSelector(
        (state) => state.multicriteriaAnalysisReducer.multiCriteriaAnalysisId
    );

    const isLoadingReport = useSelector(
        (state) => state.multicriteriaAnalysisReducer.isLoadingReport
    );

    const state = useSelector(chartMultiReportStateSelector, shallowEqual);

    const barBase64 = state?.bar.base64;

    const specificiteBase64 = state?.column.specificite.base64;
    const certitudeBase64 = state?.column.certitude.base64;
    const manoeuvrabiliteBase64 = state?.column.manoeuvrabilite.base64;

    const specificiteWeightBase64 = state?.weight.specificite.base64;
    const certitudeWeightBase64 = state?.weight.certitude.base64;
    const manoeuvrabiliteWeightBase64 = state?.weight.manoeuvrabilite.base64;

    const analyseMulticriteresResult = useSelector(
        (state) => state.multicriteriaAnalysisReducer.analyseMulticriteresResult
    );
    const listStepweights = useSelector(listStepweightsMultiAnalysisSelector);

    return (
        <Wrapper>
            <Flex justify="space-between">
                <p>
                    Les résultats issus de l'étape 1 de l'analyse multicritère ainsi que
                    toutes vos réponses sont disponibles dans ce PDF.
                </p>
                <div>
                    {partialResultsData?.length &&
                        !isLoadingReport &&
                        avatarsList?.length ? (
                        <>
                            <Report
                                projectData={projectData}
                                analyseMulticriteresResult={analyseMulticriteresResult}
                                barBase64={barBase64}
                                specificiteBase64={specificiteBase64}
                                certitudeBase64={certitudeBase64}
                                manoeuvrabiliteBase64={manoeuvrabiliteBase64}
                                specificiteWeightBase64={specificiteWeightBase64}
                                certitudeWeightBase64={certitudeWeightBase64}
                                manoeuvrabiliteWeightBase64={manoeuvrabiliteWeightBase64}
                                avatarsList={avatarsList}
                                projectId={projectId}
                                multiCriteriaAnalysisId={multiCriteriaAnalysisId}
                            />
                            <div style={{ height: '0px' }}>
                                {listStepweights &&
                                    listStepweights.map((e) => {
                                        return <ChartForCriteriaWeight graphData={e} key={e.id} />;
                                    })}
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </Flex>
            <ColBar span={24}>
                {allGraphSorted !== null && (
                    <div style={{ marginTop: '20px' }}>
                        <GraphsBars name="Résultat" allGraphSorted={allGraphSorted} />
                    </div>
                )}
            </ColBar>
            <Row gutter={16} style={{ marginBottom: "1rem" }}>
                {partialResultsData !== null &&
                    partialResultsData.map((graph) => {
                        return (
                            <Col span={8} key={graph.id}>
                                <GraphsColumns graph={graph} />
                            </Col>
                        );
                    })}
            </Row>
        </Wrapper>
    );
};

Results.propTypes = {
    allGraphSorted: PropTypes.array,
    partialResultsData: PropTypes.array,
    projectData: PropTypes.object,
    projectId: PropTypes.number,
};

export default Results;
