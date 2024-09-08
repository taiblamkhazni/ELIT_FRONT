/**
 * @file aspectsBarEScoreSlice.test.js
 * @brief Contient les tests unitaires pour le slice aspectsBarEScore.
 */
import aspectsBarEScore, { asBase64 } from '../aspectsBarEScoreSlice';

describe('aspectsBarEScore', () => {
    it('should update the base64 property in the state', () => {
        const initialState = {
            base64: ''
        };
        const payload = 'example-base64-string';
        const newState = aspectsBarEScore(initialState, asBase64(payload));

        expect(newState.base64).toBe(payload);
    });
});