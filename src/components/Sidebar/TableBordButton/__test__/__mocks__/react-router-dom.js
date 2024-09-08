/**
 * @file react-router-dom.js
 * @brief Fichier qui réexporte les modules de "react-router-dom" et simule la fonction "useNavigate" pour les tests.
 */
export * from "react-router-dom";

/**
 * Fonction jest qui simule "useNavigate" de "react-router-dom" pour les tests.
 *
 * @function useNavigate
 * @returns {function} Une fonction jest mockée.
 */
export const useNavigate = jest.fn();
