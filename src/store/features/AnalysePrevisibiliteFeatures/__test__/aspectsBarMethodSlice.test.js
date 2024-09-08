/**
 * @file aspectsBarMethodSlice.test.js
 * @brief Contient les tests unitaires pour le slice aspectsBarMethod.
 */
import aspectsBarMethod, { asBase64 } from '../aspectsBarMethodSlice';

describe('aspectsBarMethod', () => {
    it('should update the base64 property in the state', () => {
        const initialState = {
            base64: ''
        };
        const payload = 'example-base64-string';
        const newState = aspectsBarMethod(initialState, asBase64(payload));

        expect(newState.base64).toBe(payload);
    });
});