/**
 * @file setupTests.ts
 * @brief Jest test configuration file.
 *
 * This file contains configurations and mocks necessary for running Jest tests
 * in a React environment. It includes polyfills and mocks for various browser
 * APIs not available in the Jest environment.
 */

// Désactive l'avertissement de linter pour l'exportation par défaut anonyme
// eslint-disable-next-line import/no-anonymous-default-export

import '@testing-library/jest-dom';
import "./polyfills"

/**
 * @brief Define a no-operation function for replacing methods during tests.
 */
const noop = () => {
    // Cette fonction est vide intentionnellement car elle est utilisée pour remplacer certaines méthodes pendant les tests.
};

/**
 * @brief Remplace l'objet window.XMLHttpRequest pour contrôler ses méthodes lors des tests.
 */

URL.createObjectURL = jest.fn().mockImplementation((blob) => `mocked-url-for-${blob}`);
global.Worker = jest.fn().mockImplementation(() => {
    return {
        postMessage: jest.fn(),
        terminate: jest.fn()
    };
});
global.TextEncoder = jest.fn().mockImplementation(() => {
    return {
        encode: jest.fn()
    };
});

global.TextDecoder = jest.fn().mockImplementation(() => {
    return {
        decode: jest.fn()
    };
});


/**
 * @brief Mock global objects and APIs for Jest tests.
 */
Object.defineProperty(window, 'XMLHttpRequest', {
  value: function() {
    this.send = noop;
    this.open = noop;
    this.setRequestHeader = noop;
    this.addEventListener = noop;
    this.overrideMimeType = noop;
  },
});
/**
 * @brief Ajoute un polyfill pour window.matchMedia si elle n'existe pas déjà.
 * @returns Un objet qui imite l'interface de matchMedia.
 */
if (!window.matchMedia) {
  (window as any).matchMedia = function() {
      return {
          matches: false,
          addListener: function() {},
          removeListener: function() {}
      };
  };
}


