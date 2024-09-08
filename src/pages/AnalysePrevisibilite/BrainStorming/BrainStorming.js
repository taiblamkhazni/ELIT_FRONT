/**
 * @file BrainStorming.js
 * @brief Defines the BrainStorming component.
 *
 * This component handles the brainstorming phase of the predictability analysis,
 * providing functionality for adding notes, proposing actions for improvements,
 * and revising answers from the first step. It includes navigation and action
 * buttons based on user roles and analysis status.
 */
import { useEffect } from "react";
import { Flex } from "antd";
import TYPES from "common/analyseTypes"
import {
  NextStepButton,
} from "components/Button/Button";
import { StructureGrid } from "components/Grid/Grid";
import { StepPageTitle } from "components/Title/Title";
import { VerticalSpace } from "pages/ProjectDashboard/StageBase";
import BreadCrumbDetailComponent from "pages/ProjectDetail/BreadCrumbDetailComponent";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBrainStormingFetch } from "reducers/brainStormingResume/brainStormingResumeReducer";
import {
  setIsIteration2AP,
  setIsLoadingReport,
} from "reducers/multicriteriaAnalysis/multicriteriaAnalysisReducer";
import { setCurrent, setIsUpdateQuestion } from "reducers/previsibilityAnalysis/previsibilityAnalysisReducer";
import {
  getResultsMultiFetch,
} from "reducers/project/projectReducer";
import ROUTES from "routes/routes";
import styled from "styled-components";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";
import { t } from "utils/translationUtils";

import { InfoCircleOutlined } from "@ant-design/icons";

import ListAnswers from "./ListAnswers";

/**
 * @function BrainStorming
 * @brief Brainstorming section component.
 *
 * @param {boolean} iteration2 - Indicates if it's the second iteration of the brainstorming phase.
 *
 * @returns {JSX.Element} Brainstorming section component.
 */

/**
 * @brief Custom styled description component for the header section.
 */
const CustomDescription = styled.div`
  display: flex;
  flex-direction: row;
  padding:8px 24px;
  gap: 16px;
  background-color: #e2f0f9;
  border-radius: 4px;
  color: #1f1a28;
  font-size: 16px;
`;

const BrainStorming = ({ iteration2 }) => {
  const dispatch = useDispatch();
  const projectId = useSelector((state) => state.projectReducer.projectId);
  const idAL = useSelector((state) => state.previsibilityAnalysisReducer.id)
  const currentUserRole = useSelector(
    (state) => state.projectReducer.currentUserRole
  );
  const reportsNumber = useSelector(
    (state) => state.projectReducer.reportsNumber
  )
  const isUpdateQuestion = useSelector(
    (state) => state.previsibilityAnalysisReducer.isUpdateQuestion
  );
  const navigate = useNavigate();
  useEffect(() => {
    const isMultiCriteriaReportReady = reportsNumber[TYPES.multicriteria] === 2;
    if (isMultiCriteriaReportReady) {
      dispatch(setIsLoadingReport(true));
      dispatch(setCurrent(0));
      dispatch(getResultsMultiFetch(projectId));
      dispatch(setIsIteration2AP(true));
      dispatch(setIsLoadingReport(false));
      dispatch(setIsUpdateQuestion(false))
      navigate(`/projets/${projectId}/etape2/iteration2`);
    }
  }, [reportsNumber, projectId, dispatch, navigate])
  useEffect(() => {
    if (idAL && projectId) dispatch(getBrainStormingFetch({ idAL, projectId }))
  }, [idAL, projectId,dispatch])

 
  
  const onLancerAnalyseAtBrainStorming = () => {
    SwalWithBootstrapButtons.fire({
      title: t('analysePrevisibilite.brainstorming.launchAnalyse.title'),
      text: t('analysePrevisibilite.brainstorming.launchAnalyse.text'),
      showCancelButton: true,
      cancelButtonColor: "#C91432",
      confirmButtonColor: "#10B581",
      confirmButtonText: t('analysePrevisibilite.brainstorming.launchAnalyse.confirm'),
      cancelButtonText: t('analysePrevisibilite.brainstorming.launchAnalyse.cancel'),
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setIsLoadingReport(true));
        dispatch(setCurrent(0));
        dispatch(getResultsMultiFetch(projectId));
        dispatch(setIsIteration2AP(true));
        dispatch(setIsLoadingReport(false));
        dispatch(setIsUpdateQuestion(false))
        navigate(
          ROUTES.projets +
          "/" +
          projectId +
          "/etape2/brainstorming/iteration2/al"
        );
      }
    });
  };

  /**
   * @brief first return when currentUserRole is "CDP"
   */
  return (
    <>
      <BreadCrumbDetailComponent analyseType="manual" />

      <StepPageTitle
        StepNumber={"Brainstorming - Etape 1/2"}
        StepName={"Analyse multicritère v2"}
      />
      <VerticalSpace size="32px" />
      <Flex vertical>
        <CustomDescription>
          <InfoCircleOutlined
            style={{ fontSize: "2.5rem", color: "#0070AD", padding: "18px" }}
          />
          <p>{t('analysePrevisibilite.brainstorming.description')}</p>
        </CustomDescription>
      </Flex>
      <VerticalSpace size="32px" />

      <VerticalSpace size="18px" />
      <ListAnswers iteration2={iteration2} />
      {currentUserRole === "CDP" && <StructureGrid
        align="end"
        rightChild={
          <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center", justifyContent: "flex-end", width: "100%" }}
          >
            <div style={{ whiteSpace: "nowrap" }}>
              {t('analysePrevisibilite.brainstorming.nextStep')}
            </div>
            <NextStepButton
              disabled={!isUpdateQuestion}
              onClick={onLancerAnalyseAtBrainStorming}
            >
              {t('analysePrevisibilite.brainstorming.nextStepButton')}
            </NextStepButton>
          </div>
        }
        spanRight={3}
      />}
    </>
  );
};

/**
 * @var propTypes
 * @brief PropTypes for the BrainStorming component.
 *
 * @property {boolean} iteration2 - Indicates if it's the second iteration of the brainstorming phase.
 */
BrainStorming.propTypes = {
  iteration2: PropTypes.bool,
};

export default BrainStorming;
