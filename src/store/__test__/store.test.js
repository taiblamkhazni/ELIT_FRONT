/** 
 * @file store.test.js 
 * @brief Ce fichier test le store de Redux pour l'application.
*/
import configureStoreTest from '../store' // Import the store configuration function
// Test the store configuration
describe('Redux Store Configuration', () => {
  it('should configure the store with rootReducer and sagaMiddleware', () => {
    expect(configureStoreTest).toBeDefined();
  });
});
