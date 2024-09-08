/** 
 * @file store.js 
 * @brief Ce fichier configure le store de Redux pour l'application.
 * Il utilise Redux Toolkit pour la configuration du store.
 * Redux Saga est utilisé comme middleware pour gérer les effets secondaires.
 */
import rootReducers from "reducers/rootReducers"
import createSagaMiddleWare from "redux-saga"
import rootSaga from "sagas/rootSaga"

import { configureStore } from "@reduxjs/toolkit"

const sagaMiddleware = createSagaMiddleWare()

export default configureStore({
    reducer: rootReducers,
    middleware: () => [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)
