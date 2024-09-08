/**
 * @file aspectsBarEScoreSlice.js
 * @brief Ce fichier définit le reducer aspectsBarEScore.
 *
 * Ce module crée un slice Redux nommé 'aspectsBarEScore', qui est utilisé pour gérer l'état d'un élément graphique
 * spécifique (comme un graphique en barres) dans une application. Le slice contient un état initial et des réducteurs
 * pour manipuler cet état.
 */
import { createSlice } from "@reduxjs/toolkit"

/**
 * Crée un slice pour la gestion de l'état d'un graphique en barres EScore.
 *
 * Le slice comprend un état initial avec une propriété 'base64' pour stocker une représentation de l'image du graphique,
 * et des réducteurs pour gérer les mises à jour de cet état.
 */
export const aspectsBarEScore = createSlice({
    name: "aspectsBarEScore",
    initialState: {
        base64: ""
    },
    reducers: {
      /**
       * Reducteur pour mettre à jour les données d'image en format base64.
       *
       * @param {object} state - L'état actuel du slice.
       * @param {object} action - L'action dispatchée contenant le payload avec les données en base64.
       *
       * Met à jour l'état 'base64' avec les nouvelles données d'image fournies.
       */
        asBase64: (state, action) => {
            state.base64 = action.payload
        }
    }
})

export const { asBase64 } = aspectsBarEScore.actions
export default aspectsBarEScore.reducer
