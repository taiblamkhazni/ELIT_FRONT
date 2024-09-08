/**
 * @file Profil.test.js
 * @brief This file contains tests for the Profil component.
 */

import { isEmpty } from "../ProfilPage";

/**
 * @brief Mock for the Redux store.
 */
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

console.error = jest.fn()


/**
 * @brief Tests for the isEmpty function.
 */
describe('isEmpty', () => {
  /**
   * @brief Test if isEmpty returns true for an empty object.
   */
  it('returns true for an empty object', () => {
    const emptyObject = {};
    expect(isEmpty(emptyObject)).toBe(true);
  });

  /**
   * @brief Test if isEmpty returns false for an object with properties.
   */
  it('returns false for an object with properties', () => {
    const nonEmptyObject = { prop1: 'value1', prop2: 'value2' };
    expect(isEmpty(nonEmptyObject)).toBe(false);
  });

  /**
   * @brief Test if isEmpty returns true for an empty array.
   */
  it('returns true for an empty array', () => {
    const emptyArray = [];
    expect(isEmpty(emptyArray)).toBe(true);
  });

  /**
   * @brief Test if isEmpty returns false for an array with elements.
   */
  it('returns false for an array with elements', () => {
    const nonEmptyArray = [1, 2, 3];
    expect(isEmpty(nonEmptyArray)).toBe(false);
  });
});
