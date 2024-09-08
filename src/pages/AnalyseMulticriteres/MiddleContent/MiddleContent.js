/**
 * @file MiddleContent.js
 * @brief This module represents the middle part of the Multicriteria Analysis.
 *
 * It decides to render either the ListForm or Results component based on the current step.
 * It also handles the arrangement and preprocessing of results data for graphical representation.
 */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ListForm from "./ListForm";
import Results from "./Results";

/**
 * MiddleComponent
 * @brief This component serves as the central part of the Multicriteria Analysis.
 * Depending on the current step, it displays a list of questions for the analysis or showcases the results.
 *
 * @returns {JSX.Element} Either a list of questions or the analysis results.
 */
const MiddleContent = () => {
    const current = useSelector(
        (state) => state.multicriteriaAnalysisReducer.current
    );
    const projectId = useSelector((state) => state.projectReducer.projectId);
    const projectData = useSelector((state) => state.projectReducer.project);
    const resultsMulti = useSelector(
        (state) => state.projectReducer.resultsMulti
    );

    const [allGraphSorted, setAllGraphSorted] = useState(null);
    const [partialResultsData, setPartialResultsData] = useState(null);

    useEffect(() => {
        if (resultsMulti?.multiCriteriaStepScores.length > 0) {
            const onArrangeResultsList = resultsMulti.multiCriteriaStepScores.reduce(
                (acc, n) => {
                    if (n.stepName === "Spécificité") {
                        acc[0] = n;
                    } else if (n.stepName === "Certitude") {
                        acc[1] = n;
                    } else {
                        acc[2] = n;
                    }
                    return acc;
                },
                []
            );
            setAllGraphSorted(onArrangeResultsList);
            setPartialResultsData(
                onArrangeResultsList.reduce((acc, element) => {
                    acc = [
                        ...acc,
                        { value: element.criteriaScores, name: element.stepName },
                    ];
                    return acc;
                }, [])
            );
        }
    }, [resultsMulti, projectId]);

    return (
        <>
            {/* questions by step in the analysis section */}
            {current <= 3 && <ListForm current={current} />}

            {/* results of the analysis */}
            {current === 4 &&
                allGraphSorted &&
                partialResultsData &&
                projectId &&
                projectData && (
                    <Results
                        allGraphSorted={allGraphSorted}
                        projectData={projectData}
                        projectId={projectId}
                        partialResultsData={partialResultsData}
                    />
                    
                )}
        </>
    );
};

export default MiddleContent;
