/**
 * @file methodsPieSlice.test.js
 * @brief Ce fichier contient des tests pour le composant MenuTitle.
 */
import methodsPieSlice, { asBase64 } from '../methodsPieSlice';

describe('methodsPieSlice', () => {
    it('should update the base64 property in the state', () => {
        const initialState = {
            base64: ''
        };
        const payload = 'example-base64-string';
        const newState = methodsPieSlice(initialState, asBase64(payload));

        expect(newState.base64).toBe(payload);
    });
});