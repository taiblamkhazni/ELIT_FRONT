/**
 * @file effect.js
 * @brief String Utility Functions
 *
 * This module provides utility functions for string manipulation, including
 * converting strings to lowercase, normalizing, and capitalizing the first letter.
 */

/**
 * Converts a string to lowercase and removes diacritics.
 *
 * @param {string} string - The string to be processed.
 * @returns {string} The processed string in lowercase without diacritics.
 */
export const setStringToLowAndNormal = (string) => {
  return string
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}
/**
 * Composes multiple functions into a single function.
 *
 * @param {function[]} fns - An array of functions to be composed.
 * @returns {function} A function that is the composition of the input functions.
 */
export const pipe =
  (...fns) =>
    (val) =>
      fns.reduce((prev, func) => func(prev), val)
/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} input - The string to be processed.
 * @returns {string} The string with its first letter capitalized.
 */
export const capitalizeFirstLetter = (input) => {
  const string = typeof input === 'string' ? input : String(input);
  return string.charAt(0).toUpperCase() + string.slice(1);
};
