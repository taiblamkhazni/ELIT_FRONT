/**
 * @file previsibilityAnalysis.test.js
 * @brief Ce fichier contient des tests pour le reducer de  previsibility analysis.
 */
import previsibilityAnalysisReducer, {
    getElementalEscoresSuccess,
    getIdPreviAnalysisFetch,
    getIdPreviAnalysisSuccess,
    getIteration,
    getMethodologiesSuccess,
    getPercentageSuccess,
    getVotesSuccess,
    inscreaseIterationSuccess,
    setCurrent,
    setFinished,
    setIsBrainStorming,    
    setIsHavingComments,
    setIsLoadingApResult,
    setIsLoadingReport,
    setIsUpdateQuestion} from "../previsibilityAnalysisReducer"

describe("previsibilityAnalysisReducer", () => {
    let initialState = {
        id: null,
        iteration: null,
        votes: [],
        isLoading: false,
        current: 0,
        percentages: 0,
        methodologies: null,
        elementalEscores: null,
        isFinished: false,
        isLoadingReport: false,
        isHavingComments: false,
        isLoadingApResult: false,
        isUpdateQuestion:false,
        isBrainStorming: false
    }

    it("should return the initial state", () => {
        expect(previsibilityAnalysisReducer(undefined, {})).toEqual(initialState)
    })

    it("should handle getIdPreviAnalysisSuccess", () => {
        const newState = previsibilityAnalysisReducer(initialState, getIdPreviAnalysisSuccess(2))
        expect(newState.isLoading).toEqual(true)
        expect(newState.id).toEqual(2)
    })

    it("should handle getIdPreviAnalysisFetch", () => {
        const newState = previsibilityAnalysisReducer(initialState, getIdPreviAnalysisFetch())
        expect(newState.isLoading).toEqual(false)
    })

    it("should handle getIteration", () => {
        const newState = previsibilityAnalysisReducer(initialState, getIteration("test"))
        expect(newState.iteration).toEqual("test")
    })

    it("should handle inscreaseIterationSuccess", () => {
        const initialState = { iteration: 1 }
        const newState = previsibilityAnalysisReducer(initialState, inscreaseIterationSuccess())
        expect(newState.iteration).toEqual(2)
    })

    it("should handle getVotesSuccess", () => {
        const newState = previsibilityAnalysisReducer(initialState, getVotesSuccess("test"))
        expect(newState.votes).toEqual("test")
    })

    it("should handle setCurrent", () => {
        const newState = previsibilityAnalysisReducer(initialState, setCurrent("test"))
        expect(newState.current).toEqual("test")
    })

    it("should handle getPercentageSuccess", () => {
        const newState = previsibilityAnalysisReducer(initialState, getPercentageSuccess("test"))
        expect(newState.percentages).toEqual("test")
    })

    it("should handle getPercentageSuccess", () => {
        const newState = previsibilityAnalysisReducer(initialState, getPercentageSuccess("test"))
        expect(newState.percentages).toEqual("test")
    })

    it("should handle getMethodologiesSuccess", () => {
        const newState = previsibilityAnalysisReducer(initialState, getMethodologiesSuccess("test"))
        expect(newState.methodologies).toEqual("test")
    })

    it("should handle getElementalEscoresSuccess", () => {
        const newState = previsibilityAnalysisReducer(initialState, getElementalEscoresSuccess("test"))
        expect(newState.elementalEscores).toEqual("test")
    })

    it("should handle setFinished", () => {
        const newState = previsibilityAnalysisReducer(initialState, setFinished(false))
        expect(newState.isFinished).toEqual(false)
    })
    it("should handle setIsBrainStorming", () => {
        const newState = previsibilityAnalysisReducer(initialState, setIsBrainStorming(false))
        expect(newState.isBrainStorming).toEqual(false)
    })
    it("should handle setIsLoadingReport", () => {
        const newState = previsibilityAnalysisReducer(initialState, setIsLoadingReport(false))
        expect(newState.isLoadingReport).toEqual(false)
    })

    it("should handle setIsHavingComments", () => {
        const newState = previsibilityAnalysisReducer(initialState, setIsHavingComments(false))
        expect(newState.isHavingComments).toEqual(false)
    })

    it("should handle setIsLoadingApResult", () => {
        const newState = previsibilityAnalysisReducer(initialState, setIsLoadingApResult(false))
        expect(newState.isLoadingApResult).toEqual(false)
    })

    it("should handle setIsUpdateQuestion", () => {
        const newState = previsibilityAnalysisReducer(initialState, setIsUpdateQuestion(false))
        expect(newState.isUpdateQuestion).toEqual(false)
    })
})