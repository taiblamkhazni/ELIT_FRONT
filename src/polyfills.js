/**
 * @file polyfills.js
 * @brief Ce fichier contient des définitions polyfill pour certaines fonctionnalités JavaScript qui peuvent ne pas être disponibles dans tous les environnements.
 */

// Vérifie si la méthode 'setImmediate' est disponible dans l'objet window
// La méthode 'setImmediate' est une méthode qui permet d'exécuter une fonction dès que le navigateur est inactif
// Si elle n'est pas disponible, une polyfill est créée en utilisant 'setTimeout'
if (typeof window.setImmediate === "undefined") {
  /**
   * @brief Cette fonction est un polyfill pour 'window.setImmediate'.
   * @param {Function} callback - La fonction à exécuter.
   * @param {...*} args - Les arguments à passer à la fonction callback.
   * @returns {number} - Un identifiant pour l'opération de délai.
   */
  window.setImmediate = (callback, ...args) => {
    return setTimeout(() => {
      callback(...args);
    }, 0);
  };
  /**
   * @brief Cette fonction est un polyfill pour 'window.clearImmediate'.
   * @param {number} handle - L'identifiant de l'opération de délai à annuler.
   * @returns {void}
   */
  window.clearImmediate = (handle) => {
    return clearTimeout(handle);
  };
}
