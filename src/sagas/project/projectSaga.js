/**
 * @file projectSaga.js
 * @brief This file contains sagas related to Project.
 */
import { GetResultsAnalyseMulticriteByProjectId } from "hooks/apis/AnalyseMulticritereApi";
import { getProjetById } from "hooks/apis/ProjetApi";
import { getReportsApi } from "hooks/apis/ReportApi";
import {
  getNewPlanExecutionFetch,
  getResultsFetch as getResultsPlanExecuFetch,
  getResultsSuccess,
  setIdPlanExecution,
  setIsFinishedPlanExecu,
} from "reducers/executionPlan/executionPlanReducer";
import {
  setId,
  setIsFinished,
} from "reducers/multicriteriaAnalysis/multicriteriaAnalysisReducer";
import {
  getIdPreviAnalysisSuccess,
  getIteration,
  getMethodologiesSuccess,
  getResultsFetch,
  setFinished,
} from "reducers/previsibilityAnalysis/previsibilityAnalysisReducer";
import {
  getCurrentUser,
  getCurrentUserRole,
  getProjectSuccess,
  getReportsListSuccess,
  getResultsMultiFetchSuccess,
  setAttachements,
  setCheckUserIsObservateur,
  setProjectId,
} from "reducers/project/projectReducer";
import { call, put, select, takeEvery } from "redux-saga/effects";

/**
 * getLastInterationMultiAnalysis
 * @brief Retrieves the last iteration of the multi-criteria analysis.
 *
 * @param listAM - The list of multi-criteria analyses.
 * @return Multi-criteria analysis of the last iteration.
 */
export const getLastInterationMultiAnalysis = (listAM) => {
  const reduceTemp = listAM.reduce(
    (acc, el) => {
      if (el.multiCriteriaAnalysisIteration > acc.maxIte) {
        acc.maxIte = el.multiCriteriaAnalysisIteration;
        acc.al = el;
      }
      return acc;
    },
    { maxIte: 0, al: null }
  );
  return reduceTemp.al;
};
/**
 * userSelect
 * @brief Selects the user from the auth reducer.
 *
 * @param state - The overall state of the application.
 * @return The selected user.
 */
export const userSelect = (state) => state.authentificationReducer.user;
/**
 * workGetProjectFetch
 * @brief Manages the recovery of a project and executes actions accordingly.
 * @param data - The data associated with the query. This should contain payload necessary for the project fetch operation.
 */
export function* workGetProjectFetch(data) {
  /** reset initiated result of plan every time when we consult dashboard of a project to prevent previous results of precedent project*/
  yield put(getResultsSuccess(null));
  const project = yield call(() => getProjetById(data.payload));
  /** set project data after success fetching*/
  yield put(getProjectSuccess(project));
  yield put(setProjectId(project.projectId));
  yield put(setAttachements(project.attachments));
  /** set id multicriteria analysis*/
  const am = yield getLastInterationMultiAnalysis(
    project.multiCriteriaAnalysisList
  );
  yield put(setId(am.multiCriteriaAnalysisId));
  yield put(setIsFinished(am.isFinished));

  const user = yield select(userSelect);
  const { contributors } = project;
  const currentUser = contributors.filter((c) => c.email === user.sub)[0];

  yield put(
    setCheckUserIsObservateur(
      contributors.filter((c) => c.email === user.sub)[0]?.role ===
      "Observateur"
    )
  );

  yield put(getCurrentUser(currentUser));
  yield put(getCurrentUserRole(currentUser.role));
  /**
   * executePlanFunction Performs the actions necessary for the execution plan functionality.
   */
  function* executePlanFunction(ap, projectId) {
    yield put(setIdPlanExecution(ap.executionPlan.executionPlanId));
    yield put(getMethodologiesSuccess(ap.executionPlan.predictibilityResults));
    yield put(setIsFinishedPlanExecu(ap.executionPlan.isFinished));
    yield put(getResultsPlanExecuFetch({ idPE: ap.executionPlan.executionPlanId, projectId }));
  }
  /**
   * executeApIsFinished : Manages the actions to be performed when the predictability analysis is complete.
   */
  function* executeApIsFinished(data) {
    const { ap, projectId } = data;
    yield put(setFinished(true));
    yield put(
      getResultsFetch({ analyseId: ap.predictibilityAnalysisId, projectId })
    );
    /** Plan d'exécution */
if (ap.executionPlan && ap.executionPlan.isFinished) {
  yield call(executePlanFunction, ap, projectId);
} else {
  yield put(setIsFinishedPlanExecu(false));
  yield put(getNewPlanExecutionFetch(projectId));
  return;
}
  }
  /**
   * executeApIsNotFinished : Manages the actions to take when the predictability analysis is not completed.
   */
  function* executeApIsNotFinished(data) {
    const { ap, projectId } = data;
    yield put(setFinished(false));
    yield put(setIsFinishedPlanExecu(false));
    if (ap.predictibilityAnalysisIteration === 2) {
      yield put(setFinished(true));
      yield put(
        getResultsFetch({ analyseId: ap.predictibilityAnalysisId, projectId })
      );

      if (!ap.executionPlan) {
        yield put(setIsFinishedPlanExecu(false));
        yield put(getNewPlanExecutionFetch(projectId));
        return;
      }

      yield call(computeNextFctForExecPlan, ap);
    }
  }
  /**
   * computeNextFctForExecPlan : Calculates the next steps for the execution plan.
   */
  function* computeNextFctForExecPlan(ap) {
    yield put(setIdPlanExecution(ap.executionPlan.executionPlanId));
    if (!ap.executionPlan.isFinished) {
      return yield put(setIsFinishedPlanExecu(false));
    }
    yield put(setIsFinishedPlanExecu(true));
    yield put(getResultsPlanExecuFetch(ap.executionPlan.executionPlanId));
  }
  /**
   * getPredictibilityData : Retrieves predictability data and manages appropriate actions.
   */
  function* getPredictibilityData(data) {
    const { ap, projectId } = data;
    yield put(getIdPreviAnalysisSuccess(ap.predictibilityAnalysisId));
    yield put(getIteration(ap.predictibilityAnalysisIteration));

    if (ap.isFinished) {
      return yield call(executeApIsFinished, { ap, projectId });
    }
    yield call(executeApIsNotFinished, { ap, projectId });
  }
  /**
   * amFinished : Manages the actions to be performed when the multi-criteria analysis is completed.
   */
  function* amFinished(projectId) {
    const transformedResults = yield {
      multiCriteriaStepScores: am.formSteps.map((el) => {
        return {
          stepName: el.stepName,
          criteriaScores: null,
          escore: el.escore,
        };
      }),
    };
    yield put(getResultsMultiFetchSuccess(transformedResults));

    const ap = am.predictibilityAnalysis;
    if (!ap) {
      yield put(getIdPreviAnalysisSuccess(null));
      yield put(setFinished(false));
      yield put(setIsFinishedPlanExecu(false));
      return;
    }
    yield call(getPredictibilityData, { ap, projectId });
  }
  if (am.isFinished) {
    yield call(amFinished, project.projectId);
    return;
  }
  yield put(setFinished(false));
  yield put(setIsFinishedPlanExecu(false));
}

/**
 * workGetResultsMulticriteriaFetch
 * @brief Manages the retrieval of the results of the multi-criteria analysis.
 *
 * @param data - The data associated with the query.
 */
export function* workGetResultsMulticriteriaFetch(data) {
  const response = yield call(() =>
    GetResultsAnalyseMulticriteByProjectId(data.payload)
  );
  const results = yield response.data;

  yield put(getResultsMultiFetchSuccess(results));
}
/**
 * workGetReportsListFetch
 * @brief Manages the retrieval of the results of the multi-criteria analysis.
 *
 * @param data - The data associated with the query.
 */
export function* workGetReportsListFetch(data) {
  const res = yield call(() => getReportsApi(data.payload));
  yield put(getReportsListSuccess(res));
}

/**
 * getAttachementsProjectById
 * @brief Manages the actions to take when the predictability analysis is not completed.
 *
 * @param data - The data associated with id project.
 */
export function* getAttachementsProjectById(data) {
  const project = yield call(() => getProjetById(data.payload));
  /** set attachements project data after success fetching*/
  yield put(setAttachements(project.attachments));
}

/**
 * projectSaga
 * @brief Entry point to the sagas linked to the project. Listens for actions and triggers the appropriate functions.
 */
export function* projectSaga() {
  yield takeEvery("projectReducer/getProjectFetch", workGetProjectFetch);
  yield takeEvery(
    "projectReducer/getResultsMultiFetch",
    workGetResultsMulticriteriaFetch
  );
  yield takeEvery(
    "projectReducer/getReportsListFetch",
    workGetReportsListFetch
  );
  yield takeEvery(
    "projectReducer/getAttachementsProjectById",
    getAttachementsProjectById
  );
}
