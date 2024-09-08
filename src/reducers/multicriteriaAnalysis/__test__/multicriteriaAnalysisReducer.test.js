/**
 * @file multicriteriaAnalysisReducer.test.js
 * @brief Ce fichier contient des tests pour le reducer de  multicriteria analysis.
 */
import multicriteriaAnalysisReducer, {
    getResultsMultiByProjectIdSuccess, setCurrent, setEditQuestionRef,
    setId, setIsFinished, setIsIteration2AP, setIsLoadingFullPage, setIsLoadingReport, setListStepweights
}
    from "../multicriteriaAnalysisReducer"


describe("multicriteriaAnalysisReducer", () => {
    const initialState = {
        isFinished: false,
        multiCriteriaAnalysisId: null,
        current: 1,
        editQuestionRef: null,
        isLoadingFullPage: false,
        isIteration2AP: false,
        isLoadingReport: false,
        analyseMulticriteresResult: null,
        listStepweights: null,
    }

    it("should return the initial state", () => {
        expect(multicriteriaAnalysisReducer(undefined, {})).toEqual(initialState)
    })

    it("should handle setId", () => {
        const newState = multicriteriaAnalysisReducer(initialState, setId(2))
        expect(newState.multiCriteriaAnalysisId).toEqual(2)
    })

    it("should handle setIsFinished", () => {
        const newState = multicriteriaAnalysisReducer(initialState, setIsFinished(true))
        expect(newState.isFinished).toEqual(true)
    })

    it("should handle setCurrent", () => {
        const newState = multicriteriaAnalysisReducer(initialState, setCurrent(2))
        expect(newState.current).toEqual(2)
    })

    it("should handle setEditQuestionRef", () => {
        const newState = multicriteriaAnalysisReducer(initialState, setEditQuestionRef("test"))
        expect(newState.editQuestionRef).toEqual("test")
    })

    it("should handle setIsLoadingFullPage", () => {
        const newState = multicriteriaAnalysisReducer(initialState, setIsLoadingFullPage(false))
        expect(newState.isLoadingFullPage).toEqual(false)
    })

    it("should handle setIsIteration2AP", () => {
        const newState = multicriteriaAnalysisReducer(initialState, setIsIteration2AP(false))
        expect(newState.isIteration2AP).toEqual(false)
    })

    it("should handle setIsLoadingReport", () => {
        const newState = multicriteriaAnalysisReducer(initialState, setIsLoadingReport(false))
        expect(newState.isLoadingReport).toEqual(false)
    })

    it("should handle getResultsMultiByProjectIdSuccess", () => {
        const newState = multicriteriaAnalysisReducer(initialState, getResultsMultiByProjectIdSuccess("test"))
        expect(newState.analyseMulticriteresResult).toEqual("test")
    })

    it("should handle setListStepweights", () => {
        const newState = multicriteriaAnalysisReducer(initialState, setListStepweights("test"))
        expect(newState.listStepweights).toEqual("test")
    })
})