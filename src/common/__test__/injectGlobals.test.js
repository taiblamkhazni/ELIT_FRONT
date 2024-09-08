/**
 * @file injectGlobals.test.js
 * @brief Ce fichier contient des tests pour le la fonction getApplicationEnvVar.
 */
import {
  getApplicationEnvVar,
} from '../injectGlobals';

/**
 * @brief test unitaire pour l'objet injectGlobals.
 */
describe('Constants', () => {

  describe('getApplicationEnvVar', () => {
    beforeEach(() => {
      // Mock the process.env object
      process.env.REACT_APP_BACKEND_API = 'https://example.com';
      process.env.REACT_APP_NUMBER_ITERATION_MAXIMUM = '5';
    });

    it('should return the correct environment variable value', () => {
      expect(getApplicationEnvVar('BACKEND_API')).toBe('https://example.com');
      expect(getApplicationEnvVar('NUMBER_ITERATION_MAXIMUM')).toBe('5');
    });

    it('should return an empty string if environment variable is not set', () => {
      expect(getApplicationEnvVar('NON_EXISTENT_VAR')).toBe('');
    });
  });
});
