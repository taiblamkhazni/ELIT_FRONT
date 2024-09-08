/**
 * @file analyseTypes.test.js
 * @brief Ce fichier contient des tests pour le l'objet TYPES.
 */
import TYPES from '../analyseTypes';
/**
 * @brief test unitaire pour l'objet TYPES.
 */
describe('TYPES', () => {
  it('should have the correct values', () => {
    expect(TYPES).toEqual({
      multicriteria: 'multicriteria_report',
      predictibility: 'predictibility_report',
      execution: 'execution_report',
    });
  });
});
