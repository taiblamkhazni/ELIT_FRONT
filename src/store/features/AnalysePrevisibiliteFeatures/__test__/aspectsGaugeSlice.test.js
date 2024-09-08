/**
 * @file aspectsGaugeSlice.test.js
 * @brief Contient les tests unitaires pour le slice aspectsGauge.
 */
import aspectsGauge, { asBase64 } from '../aspectsGaugeSlice';

describe('aspectsGauge', () => {
    it('should update the base64 property in the state', () => {
        const initialState = {
            base64: ''
        };
        const payload = 'example-base64-string';
        const newState = aspectsGauge(initialState, asBase64(payload));

        expect(newState.base64).toBe(payload);
    });
});