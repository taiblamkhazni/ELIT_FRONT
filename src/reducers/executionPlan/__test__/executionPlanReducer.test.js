/**
 * @file executionPlanReducer.test.js
 * @brief Ce fichier contient des tests pour le composant executionPlanReducer .
 */
import executionPlanReducer, {
    getListQuestionsFailure, getListQuestionsFetch, getListQuestionsSuccess,
    getMethodologiesArrayFailure, getMethodologiesArrayFetch, getMethodologiesArraySuccess,
    getResultsFailure,
    getResultsFetch, getResultsSuccess, setCurrent, setIdPlanExecution, setInputForm, setIsFinishedPlanExecu, setIsLoadingReport, setMethodology, setReportDownload, setVote2MethodsHyBrid,
    setVoteMethod
} from "../executionPlanReducer"


describe("executionPlanReducer", () => {
    const initialState= {
        idPlanExecution: null,
        current: 1,
        listQuestions: [],
        voteMethod: [],
        methodologiesArray: null,
        choosenMethodology: null,
        votes: null,
        results: null,
        isFinished: false,
        isLoading: true,
        reportDownload: false,
        isLoadingReport: false,
        inputForm: [],
        vote2MethodsHyBrid: [],
    }

    it("should return the initial state", () => {
        expect(executionPlanReducer(undefined, {})).toEqual(initialState)
    })

    it("should handle setCurrent", () => {
        const newState = executionPlanReducer(initialState, setCurrent(2))
        expect(newState.current).toEqual(2)
    })

    it("should handle getListQuestionsFetch", () => {
        const newState = executionPlanReducer(initialState, getListQuestionsFetch())
        expect(newState.isLoading).toEqual(true)
    })

    it("should handle getListQuestionsSuccess", () => {
        const list = ["test1", "test2"]
        const newState = executionPlanReducer(initialState, getListQuestionsSuccess(list))
        expect(newState.isLoading).toEqual(false)
        expect(newState.listQuestions).toEqual(list)
    })

    it("should handle getListQuestionsFailure", () => {
        const newState = executionPlanReducer(initialState, getListQuestionsFailure())
        expect(newState.isLoading).toEqual(false)
    })

    it("should handle setVoteMethod", () => {
        const newState = executionPlanReducer(initialState, setVoteMethod("method test"))
        expect(newState.voteMethod).toEqual("method test")
    })

    it("should handle getMethodologiesArrayFetch", () => {
        const newState = executionPlanReducer(initialState, getMethodologiesArrayFetch())
        expect(newState.isLoading).toEqual(true)
    })

    it("should handle getMethodologiesArraySuccess", () => {
        const list = ["test1", "test2"]
        const newState = executionPlanReducer(initialState, getMethodologiesArraySuccess(list))
        expect(newState.isLoading).toEqual(false)
        expect(newState.methodologiesArray).toEqual(list)
    })

    it("should handle getMethodologiesArrayFailure", () => {
        const newState = executionPlanReducer(initialState, getMethodologiesArrayFailure())
        expect(newState.isLoading).toEqual(false)
    })

    it("should handle setMethodology", () => {
        const newState = executionPlanReducer(initialState, setMethodology("test"))
        expect(newState.choosenMethodology).toEqual("test")
    })

    it("should handle setMethodology", () => {
        const newState = executionPlanReducer(initialState, getResultsFetch())
        expect(newState.isLoading).toEqual(true)
    })

    it("should handle getResultsSuccess", () => {
        const newState = executionPlanReducer(initialState, getResultsSuccess("tests"))
        expect(newState.isLoading).toEqual(false)
        expect(newState.isFinished).toEqual(true)
        expect(newState.results).toEqual("tests")
    })

    it("should handle getResultsFailure", () => {
        const newState = executionPlanReducer(initialState, getResultsFailure())
        expect(newState.isLoading).toEqual(false)
    })

    it("should handle setReportDownload", () => {
        const newState = executionPlanReducer(initialState, setReportDownload("test"))
        expect(newState.reportDownload).toEqual("test")
    })

    it("should handle setIdPlanExecution", () => {
        const newState = executionPlanReducer(initialState, setIdPlanExecution(2))
        expect(newState.idPlanExecution).toEqual(2)
    })

    it("should handle setIsFinishedPlanExecu", () => {
        const newState = executionPlanReducer(initialState, setIsFinishedPlanExecu(true))
        expect(newState.isFinished).toEqual(true)
    })

    it("should handle setIsLoadingReport", () => {
        const newState = executionPlanReducer(initialState, setIsLoadingReport(true))
        expect(newState.isLoadingReport).toEqual(true)
    })

    it("should handle setInputForm", () => {
        const newState = executionPlanReducer(initialState, setInputForm("input"))
        expect(newState.inputForm).toEqual(["input"])
    })

    it("should handle setVote2MethodsHyBrid", () => {
        const newState = executionPlanReducer(initialState, setVote2MethodsHyBrid("vote"))
        expect(newState.vote2MethodsHyBrid).toEqual("vote")
    })
})
