/**
 * @file rootSaga.test.js
 * @brief unit test root saga
 */
import { testSaga } from 'redux-saga-test-plan';

import rootSaga from '../rootSaga'

/**
 * @brief unit test rootSaga
 */
test('rootSaga', () => {
    const saga = testSaga(rootSaga);
    saga.next();
    saga.next();
    saga.next();
    saga.next();
    saga.next();
    saga.next();
});
