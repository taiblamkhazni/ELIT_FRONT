/**
 * @file Steps.js
 * @brief This module exports MenuTitle component
 */
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNewPlanExecutionFetch } from "reducers/executionPlan/executionPlanReducer";
import { setIsIteration2AP } from "reducers/multicriteriaAnalysis/multicriteriaAnalysisReducer";
import {
  getIdPreviAnalysisFetch,
  getIdPreviAnalysisSuccess,
  getResultsFetch,
  getVotesFetch,
  runFirstIterationAP,
  setCurrent,
  setIsBrainStorming,
  setIsLoadingReport,
} from "reducers/previsibilityAnalysis/previsibilityAnalysisReducer";
import { getProjectFetch } from "reducers/project/projectReducer";
import ROUTES from "routes/routes";
import { getLastInterationMultiAnalysis } from "sagas/project/projectSaga";
import urlJoin from "url-join";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";

import RenderBodySection from "./RenderBodySection";
import RenderFooterSection from "./RenderFooterSection";
import RenderHeaderSection from "./RenderHeaderSection";

const onAnalyse = (votes, id, contributors, dispatch, projectId) => {
  const isPresentedVote = votes.find(v => v.voteId !== null)
  const userNotValidatingVote = votes
    ?.filter((v) => v.isConfirmed === null)
    .map((e) => {
      return contributors.filter((c) => c.contributerId === e.userId)[0];
    });
  let text = "";
  let message = "";

  if (userNotValidatingVote.length > 1) {
    userNotValidatingVote.forEach((u, index) => {
      if (index === userNotValidatingVote.length - 1) {
        text += `et <strong>[${
          u.firstName
        } ${u.lastName.toUpperCase()}]</strong> `;
      } else if (index === userNotValidatingVote.length - 2) {
        text += `<strong>[${
          u.firstName
        } ${u.lastName.toUpperCase()}]</strong> `;
      } else {
        text += `<strong>[${
          u.firstName
        } ${u.lastName.toUpperCase()}]</strong>, `;
      }
    });
    message =
      text +
      " n'ont pas encore validé leurs réponses, voulez-vous lancer l'analyse de cette étape?";
  } else if (userNotValidatingVote.length === 1) {
    text = `<strong>[${
      userNotValidatingVote[0].firstName
    } ${userNotValidatingVote[0].lastName.toUpperCase()}]</strong> `;
    message =
      text +
      " n'a pas encore validé ses réponses, voulez-vous lancer l'analyse de cette étape?";
  } else {
    message = "Etes-vous sur? Voulez-vous lancer l'analyse de cette étape?";
  }

  if (
    userNotValidatingVote.length ===
    contributors.filter((e) => e.role !== "Observateur").length || !isPresentedVote
  ) {
    SwalWithBootstrapButtons.fire({
      title: "Choix de la méthodologie",
      text: "Il faut avoir au moins d'une vote avant de lancer cette l'analyse",
      cancelButtonColor: "#C91432",
      confirmButtonColor: "#10B581",
      confirmButtonText: "Oui",
      reverseButtons: true,
    });
  } else {
    SwalWithBootstrapButtons.fire({
      title: "Choix de la méthodologie",
      html: message,
      showCancelButton: true,
      cancelButtonColor: "#C91432",
      confirmButtonColor: "#10B581",
      confirmButtonText: "Oui, lancer l'analyse",
      cancelButtonText: " Non, attendre",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setIsLoadingReport(false));
        dispatch(getVotesFetch(id));
        dispatch(runFirstIterationAP({ analyseId: id, projectId }));
        dispatch(setIsLoadingReport(true));
      }
    });
  }
};

/**
 * @brief default
 * @param iteration2
 **/
export default ({ iteration2 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    id,
    votes,
    projectData,
    current,
    user,
    percentages,
    methodologies,
    elementalEscores,
    currentUserRole,
    projectId,
  } = useSelectors();
  const emailCurrentUser = user ? user.sub : null;
  const { contributors } = projectData;

  useEffect(() => {
    if (id) {
      dispatch(getVotesFetch(id));
    } else if (!id && currentUserRole === "CDP") {
      dispatch(getIdPreviAnalysisFetch());
    }
  }, [currentUserRole, dispatch, id]);

  useEffect(() => {

    initializePrevisibilityAnalysis(projectData, iteration2, dispatch);
  }, [dispatch, iteration2, projectData]);

  const result = calculateResult(percentages);

  const passToStage3 = useCallback(() => {
    SwalWithBootstrapButtons.fire({
      title: "Êtes-vous sûr?",
      text: "Cette action est irréversible ! Vous voulez terminer cette analyse et passer directement à l'étape 3?",
      showCancelButton: true,
      cancelButtonColor: "#C91432",
      confirmButtonColor: "#10B581",
      confirmButtonText: "Valider",
      cancelButtonText: "Annuler",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(getNewPlanExecutionFetch(projectId));
        // dispatch(getProjectFetch(projectId));
        navigate(`/projets/${projectId}/etape3`);
      }
    });
  }, [dispatch, projectId, navigate]);

  const handleClickButtonNoBackground = useCallback(() => {
    navigate(ROUTES.projets + "/" + projectId);
  }, [navigate, projectId]);

  const handleClickNextStepButtonRight = useCallback(() =>{
    onAnalyse(votes, id, contributors, dispatch, projectData.projectId)
  },[contributors, dispatch, id, projectData.projectId, votes]);

  const handleClickleftChild = useCallback(() => {
    dispatch(getProjectFetch(projectId));
    navigate(ROUTES.projets + "/" + projectId);
  }, [dispatch, projectId,navigate]);

  const handleClickNextStepButton = useCallback(() => {
    dispatch(getNewPlanExecutionFetch(projectId));
    navigate(`/projets/${projectId}/etape3`);
  }, [dispatch, projectId,navigate]);

  const handleClickrightChild = useCallback(() => {
    dispatch(setIsBrainStorming(true));
    const url = urlJoin(
      ROUTES.projets,
      projectId.toString(),
      ROUTES.analysePrevisibilite,
      "brainstorming"
    );
    navigate(url);
  }, [dispatch, projectId,navigate]);

  return (
    <>
      <RenderHeaderSection current={current} iteration2={iteration2} />
      <RenderBodySection
        current={current}
        percentages={percentages}
        methodologies={methodologies}
        elementalEscores={elementalEscores}
        iteration2={iteration2}
        votes={votes}
        contributors={contributors}
        user={user}
        emailCurrentUser={emailCurrentUser}
        projectData={projectData}
      />
      <RenderFooterSection
        current={current}
        result={result}
        currentUserRole={currentUserRole}
        passToStage3={passToStage3}
        handleClickButtonNoBackground={handleClickButtonNoBackground}
        handleClickNextStepButtonRight={handleClickNextStepButtonRight}
        handleClickleftChild={handleClickleftChild}
        handleClickNextStepButton={handleClickNextStepButton}
        handleClickrightChild={handleClickrightChild}
      />
    </>
  );
};

const useSelectors = () => {
  return {
    id: useSelector((state) => state.previsibilityAnalysisReducer.id),
    votes: useSelector((state) => state.previsibilityAnalysisReducer.votes),
    isFinishedAM: useSelector(
      (state) => state.multicriteriaAnalysisReducer.isFinished
    ),
    projectData: useSelector((state) => state.projectReducer.project),
    current: useSelector((state) => state.previsibilityAnalysisReducer.current),
    user: useSelector((state) => state.authentificationReducer.user),
    percentages: useSelector(
      (state) => state.previsibilityAnalysisReducer.percentages
    ),
    methodologies: useSelector(
      (state) => state.previsibilityAnalysisReducer.methodologies
    ),
    elementalEscores: useSelector(
      (state) => state.previsibilityAnalysisReducer.elementalEscores
    ),
    currentUserRole: useSelector(
      (state) => state.projectReducer.currentUserRole
    ),
    projectId: useSelector((state) => state.projectReducer.projectId),
  };
};

const calculateResult = (percentages) => {
  return percentages >= 50 ? "high" : "low";
};

const initializePrevisibilityAnalysis = (projectData, iteration2, dispatch) => {

  dispatch(setIsLoadingReport(false));
  if (!iteration2) {
    dispatch(setIsBrainStorming(false));
    dispatch(setIsIteration2AP(false));
    if (projectData.multiCriteriaAnalysisList.length) {
      const ap = getLastInterationMultiAnalysis(
        projectData.multiCriteriaAnalysisList
      ).predictibilityAnalysis;
      if (ap) {
        dispatch(getIdPreviAnalysisSuccess(ap.predictibilityAnalysisId));
        if (ap.predictibilityAnalysisIteration === 2 || ap.isFinished) {

          dispatch(
            getResultsFetch({
              analyseId: ap.predictibilityAnalysisId,
              projectId: projectData.projectId,
            })
          );
          dispatch(setCurrent(1));
        } else {
          dispatch(setCurrent(0));
        }
      } else {
        dispatch(setCurrent(0));
      }
    }
  } else {
    dispatch(setIsIteration2AP(true));
  }
};
