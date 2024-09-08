/**
 * @file methodBarSlice.test.js
 * @brief Ce fichier contient des tests pour le composant MenuTitle.
 */
import methodsBarSlice, { asBase64 } from '../methodsBarSlice';

describe('methodsBarSlice', () => {
    it('should update the base64 property in the state', () => {
        const initialState = {
            base64: ''
        };
        const payload = 'example-base64-string';
        const newState = methodsBarSlice(initialState, asBase64(payload));

        expect(newState.base64).toBe(payload);
    });
});