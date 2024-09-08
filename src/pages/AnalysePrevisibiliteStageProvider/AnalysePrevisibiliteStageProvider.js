/**
 * @file AnalysePrevisibiliteStageProvider.js
 * @brief Provides stage handling for Analyse Previsibilite feature using React Router Outlet
 *
 * This module exports a function that returns a React Router Outlet component.
 * It serves as a stage provider for the Analyse Previsibilite feature.
 */

import { Outlet } from "react-router-dom"


/**
 * @function AnalysePrevisibiliteStageProvider
 * @brief Renders a React Router Outlet for handling various stages in Analyse Previsibilite feature.
 *
 * @returns {JSX.Element} A React Router Outlet for managing child routes in the Analyse Previsibilite feature.
 */
const AnalysePrevisibiliteStageProvider = () => {
    return <Outlet />
}

export default AnalysePrevisibiliteStageProvider
