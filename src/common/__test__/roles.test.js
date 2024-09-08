/**
 * @file roles.test.js
 * @brief Ce fichier contient des tests pour le l'objet ROLES.
 */
import ROLES from '../roles';
/**
 * @brief test unitaire pour l'objet ROLES.
 */
describe('ROLES', () => {
  it('should have the correct properties', () => {
    expect(ROLES).toEqual({
        user: "USER",
        admin: "ADMIN",
    });
  });
});
