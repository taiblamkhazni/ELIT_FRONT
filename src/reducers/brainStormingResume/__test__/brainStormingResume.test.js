/**
 * @file brainStormingResume.test.js
 * @brief Ce fichier contient des tests pour les composants brainStormingResumeReducer, getBrainStormingResumeFetch et getBrainStormingResumeSuccess.
 */
import brainStormingResumeReducer, {
    getBrainStormingFetch,
    getBrainStormingResumeFetch,
    getBrainStormingResumeSuccess,
    getBrainStormingSuccess
} from '../brainStormingResumeReducer'

describe('brainStormingResumeReducer', () => {
    const initialState = {
        isLoading: false,
        brainStormingResume: [],
        isLoadingBrainstorming: false,
        brainStorming: []
    }

    it('should return the initial state', () => {
        expect(brainStormingResumeReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle getBrainStormingResumeFetch', () => {
        const newState = brainStormingResumeReducer(initialState, getBrainStormingResumeFetch())
        expect(newState.isLoading).toBe(true)
    })

    it('should handle getBrainStormingResumeSuccess', () => {
        const brainStormingResume = [{ id: 1, title: 'Idea 1' }, { id: 2, title: 'Idea 2' },]
        const newState = brainStormingResumeReducer(initialState, getBrainStormingResumeSuccess(brainStormingResume))
        expect(newState.isLoading).toBe(false)
        expect(newState.brainStormingResume).toEqual(brainStormingResume)
    })

    it('should handle getBrainStormingFetch', () => {
        const newState = brainStormingResumeReducer(initialState, getBrainStormingFetch())
        expect(newState.isLoadingBrainstorming).toBe(true)
    })

    it('should handle getBrainStormingSuccess', () => {
        const brainStormingResume = [{ id: 1, title: 'Idea 1' }, { id: 2, title: 'Idea 2' },]
        const newState = brainStormingResumeReducer(initialState, getBrainStormingSuccess(brainStormingResume))
        expect(newState.isLoadingBrainstorming).toBe(false)
        expect(newState.brainStorming).toEqual(brainStormingResume)
    })
})
