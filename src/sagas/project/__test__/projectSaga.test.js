/**
 * @file projectsSaga.js
 * @brief Ce fichier contient les tests liés aux fonctions sagas du fichier projectsSaga.js.
 *
 */
import { GetResultsAnalyseMulticriteByProjectId } from "hooks/apis/AnalyseMulticritereApi";
import { getProjetById } from "hooks/apis/ProjetApi";
import { getReportsApi } from "hooks/apis/ReportApi";
import { getResultsSuccess } from "reducers/executionPlan/executionPlanReducer";
import { setIsFinished } from "reducers/multicriteriaAnalysis/multicriteriaAnalysisReducer";
import {
  getProjectSuccess,
  getReportsListSuccess,
  getResultsMultiFetchSuccess,
  setCheckUserIsObservateur,
  setProjectId,
} from "reducers/project/projectReducer";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import {
  fakeDataWorkGetProject,
  fakeDataWorkGetProjectResult,
} from "sagas/fakeDataSagas/fakeDataSagas";

import {
  getLastInterationMultiAnalysis,
  projectSaga,
  userSelect,
  workGetProjectFetch,
  workGetReportsListFetch,
  workGetResultsMulticriteriaFetch,
} from "../projectSaga";

/** @brief Test suite dedicated to examining the overall functionality of the projectSaga. */
describe("test file projectSaga", () => {
  let generator;
  /** @brief Before each test, initialize the saga generator to its default state. */
  beforeEach(() => {
    generator = projectSaga();
  });

  /**
   * @brief Ensure that the saga properly listens to and handles the getResultsSuccess action.
   */
  it("should listen action getResultsSuccess", () => {
    const takeEveryEffect = generator.next().value;
    expect(takeEveryEffect).toEqual(
      takeEvery("projectReducer/getProjectFetch", workGetProjectFetch)
    );
  });

  /** @brief Validate the saga's response to the postNewProjectSuccess action and its subsequent workflow. */
  it("should listen action postNewProjectSuccess", () => {
    generator.next();
    const takeEveryEffect = generator.next().value;
    expect(takeEveryEffect).toEqual(
      takeEvery(
        "projectReducer/getResultsMultiFetch",
        workGetResultsMulticriteriaFetch
      )
    );
  });

  /** @brief Confirm the saga's behavior when it encounters the deleteProjectSuccess action.*/
  it("should listen action deleteProjectSuccess", () => {
    generator.next();
    generator.next();
    const takeEveryEffect = generator.next().value;
    expect(takeEveryEffect).toEqual(
      takeEvery("projectReducer/getReportsListFetch", workGetReportsListFetch)
    );
  });

  /** @brief Examine the interaction of the saga with the API during the getProjectFetch action.*/
  it("should trigger getProjectFetch", () => {
    expectSaga(workGetProjectFetch, fakeDataWorkGetProject)
      .provide([[call(getProjetById, 1), fakeDataWorkGetProjectResult]])
      .run();
  });

  /** @brief Investigate how the getProjectFetch is initiated and verify its triggering conditions. */
  it("should trigger getProjectFetch", () => {
    const am = {
      multiCriteriaAnalysisList: [],
      multiCriteriaAnalysisId: 1,
      isFinished: false,
    };
    expectSaga(workGetProjectFetch, fakeDataWorkGetProject)
      .provide([
        [call(getProjetById, 1), fakeDataWorkGetProjectResult],
        [call(getLastInterationMultiAnalysis), am],
      ])
      .run();
  });
});

/** @brief Comprehensive tests focusing on the behavior and results of the workGetProject function.*/
describe("do test specially on workGetProject function", () => {
  let workGetProjectTest;

  beforeEach(() => {
    workGetProjectTest = expectSaga(workGetProjectFetch).provide([
      [put(getResultsSuccess(null))],
      [(call(getProjetById, 1), [])],
    ]);
  });

  /** @brief Ensure the correct invocation of getProjectFetch within the workGetProject function. */
  it("should trigger getProjectFetch", () => {
    workGetProjectTest.run();
  });

  /**
   * @brief Tests if the getProjectSuccess and setProjectId actions trigger when getProjectFetch is called.
   */
  it("should trigger getProjectFetch", () => {
    workGetProjectTest.put(getProjectSuccess([])).put(setProjectId()).run();
  });

  /**
   * @brief Validates the invocation of getProjectSuccess and setIsFinished(false) actions in response to getProjectFetch.
   */
  it("should trigger getProjectFetch", () => {
    workGetProjectTest
      .put(getProjectSuccess([]))
      .put(setIsFinished(false))
      .run();
  });

  /**
   * @brief Checks the chaining of getProjectSuccess, setIsFinished(false), and userSelect in the getProjectFetch flow.
   */
  it("should trigger getProjectFetch", () => {
    workGetProjectTest
      .put(getProjectSuccess([]))
      .put(setIsFinished(false))
      .select(userSelect)
      .run();
  });

  /**
   * @brief Verifies the sequential execution of getProjectSuccess, setIsFinished(false), userSelect, and setCheckUserIsObservateur actions during the getProjectFetch process.
   */
  it("should trigger getProjectFetch", () => {
    workGetProjectTest
      .put(getProjectSuccess([]))
      .put(setIsFinished(false))
      .select(userSelect)
      .put(setCheckUserIsObservateur([]))
      .run();
  });
});

/** @brief Comprehensive tests focusing on the behavior and results of the workGetResultsMulticriteriaFetch function.*/
describe("do test specially on workGetResultsMulticriteriaFetch function", () => {
  let workGetMultiTest;
  /** @brief Before each test, initialize the saga generator to its default state. */
  beforeEach(() => {
    workGetMultiTest = expectSaga(workGetResultsMulticriteriaFetch).provide([
      [(call(GetResultsAnalyseMulticriteByProjectId), [])],
    ]);
  });

  /**
   * @brief Verifies that getResultsMultiFetch gets triggered correctly.
   */
  it("should trigger getResultsMultiFetch", () => {
    workGetMultiTest.run();
  });

  /**
   * @brief Checks if the getResultsMultiFetchSuccess action is correctly dispatched in the saga.
   */
  it("should trigger getResultsMultiFetch", () => {
    workGetMultiTest.put(getResultsMultiFetchSuccess([])).run();
  });
});

/** @brief Comprehensive tests focusing on the behavior and results of the workGetReportsListFetch function.*/
describe("do test specially on workGetReportsListFetch function", () => {
  let workGetReportTest;
  /** @brief Before each test, initialize the saga generator to its default state. */
  beforeEach(() => {
    workGetReportTest = expectSaga(workGetReportsListFetch).provide([
      [(call(getReportsApi), [])],
    ]);
  });

  /**
   * @brief Verifies that getReportsListSuccess gets triggered correctly.
   */
  it("should trigger getReportsListSuccess", () => {
    workGetReportTest.run();
  });

  /**
   * @brief Checks if the getReportsListSuccess action is correctly dispatched in the saga.
   */
  it("should trigger getReportsListSuccess", () => {
    workGetReportTest.put(getReportsListSuccess([])).run();
  });
});

/** @brief Comprehensive tests focusing on the behavior and results of the workGetReportsListFetch function.*/
describe("getLastInterationMultiAnalysis", () => {

  /**
   * @brief Tests if the function returns null when provided an empty list.
   */
  it("sent null if list empty", () => {
    const emptyList = [];
    const result = getLastInterationMultiAnalysis(emptyList);
    expect(result).toBeNull();
  });

  /**
   * @brief Checks if the function returns the event with the highest multiCriteriaAnalysisIteration value.
   */
  it("send correct event", () => {
    const analysisList = [
      { multiCriteriaAnalysisIteration: 1, otherProperty: "A" },
      { multiCriteriaAnalysisIteration: 3, otherProperty: "B" },
      { multiCriteriaAnalysisIteration: 2, otherProperty: "C" },
    ];
    const result = getLastInterationMultiAnalysis(analysisList);
    /** element with multiCriteriaAnalysisIteration = 3 should be sent*/
    expect(result).toEqual({
      multiCriteriaAnalysisIteration: 3,
      otherProperty: "B",
    });
  });

  /**
   * @brief Validates the function returns the first element when multiple items have equal maximum multiCriteriaAnalysisIteration values.
   */
  it("should sent first element in case of equal itireation max", () => {
    const analysisList = [
      { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
      { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
    ];
    const result = getLastInterationMultiAnalysis(analysisList);
    expect(result).toEqual({
      multiCriteriaAnalysisIteration: 2,
      otherProperty: "A",
    });
  });
});

/**
 * @brief workGetProjectConditions1 First set of tests for different conditions inside workGetProjectFetch saga.
 */
describe("test applied in all if condition for workGetProject", () => {
  const iterator = workGetProjectFetch();
  /**
   * @brief Verifies that the saga yields a select Effect correctly.
   */
  it("should yield an Effect select", () => {
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: "attachment_line",
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
    });
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: [],
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
      isFinished: true,
      multiCriteriaAnalysisId: 1,
    });
    iterator.next();
    const effect = iterator.next().value;
    const expected = select(userSelect);
    expect(effect).toEqual(expected);
  });
});
/**
 * @brief workGetProjectConditions2 Second set of tests for different conditions inside workGetProjectFetch saga.
 */
describe("test applied in all if condition for workGetProject", () => {
  const iterator = workGetProjectFetch();
  /**
   * @brief Validates that the saga processes the expected number of steps and yields an Effect select.
   */
  it("should yield an Effect select", () => {
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: "attachment_line",
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
    });
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: [],
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
      isFinished: true,
      multiCriteriaAnalysisId: 1,
      formSteps: [{ stepNAme: "jhon", escore: 5 }],
      predictibilityAnalysis: null,
    });
    iterator.next();
    iterator.next();
    iterator.next({ sub: "jhon.doe@r.doe" });
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
  });
});
/**
 * @brief workGetProjectConditions3 Third set of tests for different conditions inside workGetProjectFetch saga, using a payload.
 */
describe("test applied in all if condition for workGetProject", () => {
  const iterator = workGetProjectFetch({ payload: 1 });
  /**
   * @brief Ensures that the saga handles a given payload and progresses through the expected steps, yielding an Effect select.
   */
  it("should yield an Effect select", () => {
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: "attachment_line",
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
    });
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: [],
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
      isFinished: true,
      multiCriteriaAnalysisId: 1,
      formSteps: [{ stepNAme: "jhon", escore: 5 }],
      predictibilityAnalysis: {
        isFinished: true,
        predictibilityAnalysisId: 1,
        predictibilityAnalysisIteration: 2,
      },
    });
    iterator.next();
    iterator.next();
    iterator.next({ sub: "jhon.doe@r.doe" });
    for (let i = 0; i < 9; i++) {
      iterator.next();
    }
    iterator.next();
    iterator.next();
    iterator.next();
  });
});

/**
 * @brief Testing all conditions for the function workGetProject with various scenarios.
 */
describe("test applied in all if condition for workGetProject", () => {
  const iterator = workGetProjectFetch();

  /**
   * @brief Ensures that the function yields an Effect select with the given project data.
   */
  it("should yield an Effect select", () => {
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: "attachment_line",
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
    });
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: [],
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
      isFinished: true,
      multiCriteriaAnalysisId: 1,
      formSteps: [{ stepNAme: "jhon", escore: 5 }],
      predictibilityAnalysis: {
        isFinished: true,
        predictibilityAnalysisId: 1,
        predictibilityAnalysisIteration: 2,
        executionPlan: { executionPlanId: 1, isFinished: false },
      },
    });
    iterator.next();
    iterator.next();
    iterator.next({ sub: "jhon.doe@r.doe" });
    for (let i = 0; i < 9; i++) {
      iterator.next();
    }
    iterator.next();
    iterator.next();
    iterator.next();
  });
});

/**
 * @brief Testing all conditions for the function workGetProject with different project states.
 */
describe("test applied in all if condition for workGetProject", () => {
  const iterator = workGetProjectFetch();
  /**
   * @brief Ensures that the function yields an Effect select for a finished execution plan.
   */
  it("should yield an Effect select", () => {
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: "attachment_line",
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
    });
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: [],
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
      isFinished: true,
      multiCriteriaAnalysisId: 1,
      formSteps: [{ stepNAme: "jhon", escore: 5 }],
      predictibilityAnalysis: {
        isFinished: true,
        predictibilityAnalysisId: 1,
        predictibilityAnalysisIteration: 2,
        executionPlan: { executionPlanId: 1, isFinished: true },
      },
    });
    iterator.next();
    iterator.next();
    iterator.next({ sub: "jhon.doe@r.doe" });
    for (let i = 0; i < 9; i++) {
      iterator.next();
    }
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
  });
});
/**
 * @brief Testing all conditions for the function workGetProject with varied project configurations.
 */
describe("test applied in all if condition for workGetProject", () => {
  const iterator = workGetProjectFetch();
  /**
   * @brief Ensures that the function yields an Effect select for the given project setup.
   */
  it("should yield an Effect select", () => {
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: "attachment_line",
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
    });
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: [],
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
      isFinished: true,
      multiCriteriaAnalysisId: 1,
      formSteps: [{ stepNAme: "jhon", escore: 5 }],
      predictibilityAnalysis: {
        isFinished: true,
        predictibilityAnalysisId: 1,
        predictibilityAnalysisIteration: 2,
        executionPlan: { executionPlanId: 1, isFinished: true },
      },
    });
    iterator.next();
    iterator.next();
    iterator.next({ sub: "jhon.doe@r.doe" });
    for (let i = 0; i < 9; i++) {
      iterator.next();
    }
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
  });
});
/**
 * @brief Test scenarios to validate the behavior of workGetProject function.
 * This scenario focuses on the case where `predictibilityAnalysis` does not specify the `isFinished` attribute.
 */
describe("test applied in all if condition for workGetProject", () => {
  const iterator = workGetProjectFetch();
  /**
   * @brief Ensures that the function yields an Effect select with the provided project data.
   */
  it("should yield an Effect select", () => {
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: "attachment_line",
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
    });
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: [],
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
      isFinished: true,
      multiCriteriaAnalysisId: 1,
      formSteps: [{ stepNAme: "jhon", escore: 5 }],
      predictibilityAnalysis: {
        predictibilityAnalysisId: 1,
        predictibilityAnalysisIteration: 2,
        executionPlan: { executionPlanId: 1 },
      },
    });
    iterator.next();
    iterator.next();
    iterator.next({ sub: "jhon.doe@r.doe" });
    for (let i = 0; i < 9; i++) {
      iterator.next();
    }
    iterator.next();
    iterator.next();
  });
});
/**
 * @brief Test scenarios for the workGetProject function.
 * This scenario targets the condition where `predictibilityAnalysis` is set as not finished while the `executionPlan` is marked as finished.
 */
describe("test applied in all if condition for workGetProject", () => {
  const iterator = workGetProjectFetch();
  /**
   * @brief Verifies that the function processes an Effect select for the given project data, especially focusing on `predictibilityAnalysis`.
   */
  it("should yield an Effect select", () => {
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: "attachment_line",
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
    });
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: [],
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
      isFinished: true,
      multiCriteriaAnalysisId: 1,
      formSteps: [{ stepNAme: "jhon", escore: 5 }],
      predictibilityAnalysis: {
        isFinished: false,
        predictibilityAnalysisId: 1,
        predictibilityAnalysisIteration: 2,
        executionPlan: { executionPlanId: 1, isFinished: true },
      },
    });
    iterator.next();
    iterator.next();
    iterator.next({ sub: "jhon.doe@r.doe" });
    for (let i = 0; i < 9; i++) {
      iterator.next();
    }
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
  });
});
/**
 * @brief Test scenarios to validate the behavior of workGetProject function.
 * This test emphasizes the state where both `predictibilityAnalysis` and its `executionPlan` are not marked as finished.
 */
describe("test applied in all if condition for workGetProject", () => {
  const iterator = workGetProjectFetch();
  /**
   * @brief Checks if the function appropriately handles the scenario where both predictibilityAnalysis and its executionPlan are ongoing.
   */
  it("should yield an Effect select", () => {
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: "attachment_line",
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
    });
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: [],
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
      isFinished: true,
      multiCriteriaAnalysisId: 1,
      formSteps: [{ stepNAme: "jhon", escore: 5 }],
      predictibilityAnalysis: {
        isFinished: false,
        predictibilityAnalysisId: 1,
        predictibilityAnalysisIteration: 2,
        executionPlan: { executionPlanId: 1, isFinished: false },
      },
    });
    iterator.next();
    iterator.next();
    iterator.next({ sub: "jhon.doe@r.doe" });
    for (let i = 0; i < 9; i++) {
      iterator.next();
    }
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
  });
});
/**
 * @brief Test scenarios for the workGetProject function.
 * This test focuses on the scenario where `predictibilityAnalysis` has the `isFinished` attribute as `false`, but does not specify an `executionPlan`.
 */
describe("test applied in all if condition for workGetProject", () => {
  const iterator = workGetProjectFetch({ payload: 1 });
  /**
   * @brief Validates that the function processes an Effect select for the given project data, especially focusing on the predictibilityAnalysis absence of executionPlan.
   */
  it("should yield an Effect select", () => {
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: "attachment_line",
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
    });
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: [],
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
      isFinished: true,
      multiCriteriaAnalysisId: 1,
      formSteps: [{ stepNAme: "jhon", escore: 5 }],
      predictibilityAnalysis: {
        isFinished: false,
        predictibilityAnalysisId: 1,
        predictibilityAnalysisIteration: 2,
        executionPlan: false,
      },
    });
    iterator.next();
    iterator.next();
    iterator.next({ sub: "jhon.doe@r.doe" });
    for (let i = 0; i < 9; i++) {
      iterator.next();
    }
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next();
  });
});
/**
 * @brief Test scenarios to validate the behavior of workGetProject function.
 * This scenario checks the condition where both the project and its `predictibilityAnalysis` are not marked as finished, and there's no `executionPlan` provided.
 */
describe("test applied in all if condition for workGetProject", () => {
  const iterator = workGetProjectFetch({ payload: 1 });
  /**
   * @brief Confirms that the function handles the situation where the predictibilityAnalysis and the project are ongoing, and no executionPlan is specified.
   */
  it("should yield an Effect select", () => {
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: "attachment_line",
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
    });
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: [],
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
      isFinished: false,
      multiCriteriaAnalysisId: 1,
      formSteps: [{ stepNAme: "jhon", escore: 5 }],
      predictibilityAnalysis: {
        isFinished: false,
        predictibilityAnalysisId: 1,
        predictibilityAnalysisIteration: 2,
        executionPlan: false,
      },
    });
    iterator.next();
    iterator.next();
    iterator.next({ sub: "jhon.doe@r.doe" });
    for (let i = 0; i < 9; i++) {
      iterator.next();
    }

    iterator.next();
    iterator.next();
  });
});
/**
 * @brief Test scenarios for the workGetProject function.
 * This scenario emphasizes the case where the project is finished, and the `predictibilityAnalysis` attribute is set to `false`.
 */
describe("test applied in all if condition for workGetProject", () => {
  const iterator = workGetProjectFetch();
  /**
   * @brief Checks if the function adequately handles the scenario where the project is completed, but predictibilityAnalysis is set to false without further attributes.
   */
  it("should yield an Effect select", () => {
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: "attachment_line",
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
    });
    iterator.next();
    iterator.next();
    iterator.next();
    iterator.next({
      projectId: 1,
      attachments: [],
      multiCriteriaAnalysisList: [
        { multiCriteriaAnalysisIteration: 2, otherProperty: "A" },
        { multiCriteriaAnalysisIteration: 2, otherProperty: "B" },
      ],
      contributors: [{ email: "jhon.doe@r.doe", role: "Observateur" }],
      isFinished: true,
      multiCriteriaAnalysisId: 1,
      formSteps: [{ stepNAme: "jhon", escore: 5 }],
      predictibilityAnalysis: false,
    });
    iterator.next();
    iterator.next();
    iterator.next({ sub: "jhon.doe@r.doe" });
    for (let i = 0; i < 9; i++) {
      iterator.next();
    }
    iterator.next();
    iterator.next();
  });
});
