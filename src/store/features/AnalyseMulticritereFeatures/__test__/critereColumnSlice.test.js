/**
 * @file critereColumnSlice.test.js
 * @brief Contient les tests unitaires pour le slice critereColumnReducer.
 */
import critereColumnReducer, { asBase64, initiateAllState } from '../critereColumnSlice';

describe('critereColumnSlice', () => {
    describe('asBase64', () => {
        it('should update the corresponding column base64 property in the state', () => {
            const initialState = {
                specificite: {
                    base64: ''
                },
                certitude: {
                    base64: ''
                },
                manoeuvrabilite: {
                    base64: ''
                }
            };
            const payload1 = {
                name: 'Spécificité',
                value: 'example-base64-string1'
            };
            const payload2 = {
                name: 'Certitude',
                value: 'example-base64-string2'
            };
            const payload3 = {
                name: 'Manoeuvrabilité',
                value: 'example-base64-stringc3'
            };

            const newState1 = critereColumnReducer(initialState, asBase64(payload1));
            expect(newState1.specificite.base64).toEqual(payload1.value);

            const newState2 = critereColumnReducer(initialState, asBase64(payload2));
            expect(newState2.certitude.base64).toEqual(payload2.value);

            const newState3 = critereColumnReducer(initialState, asBase64(payload3));
            expect(newState3.manoeuvrabilite.base64).toEqual(payload3.value);
        });
    });

    describe('initiateAllState', () => {
        it('should reset all column base64 properties to an empty string', () => {
            const initialState = {
                specificite: {
                    base64: 'existing-value'
                },
                certitude: {
                    base64: 'existing-value'
                },
                manoeuvrabilite: {
                    base64: 'existing-value'
                }
            };

            const newState = critereColumnReducer(initialState, initiateAllState());

            expect(newState.specificite.base64).toBe('');
            expect(newState.certitude.base64).toBe('');
            expect(newState.manoeuvrabilite.base64).toBe('');
        });
    });
});
