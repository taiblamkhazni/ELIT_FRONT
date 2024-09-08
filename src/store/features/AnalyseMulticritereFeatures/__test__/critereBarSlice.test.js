/**
 * @file critereBarSlice.test.js
 * @brief Contient les tests unitaires pour le slice critereBarReducer.
 */
import critereBarReducer, { asBase64 } from '../critereBarSlice';

describe('critereBarSlice', () => {
    it('should update the base64 property in the state', () => {
        const initialState = {
            base64: ''
        };
        const payload = 'example-base64-string';
        const newState = critereBarReducer(initialState, asBase64(payload));

        expect(newState.base64).toBe(payload);
    });
});