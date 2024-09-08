/**
 * @file BrainStormingPage.js
 * @brief Delegates rendering to the BrainStorming component in the AnalysePrevisibiliteFeatures feature.
 *
 * This module exports a function that returns the BrainStorming component,
 * forwarding the 'iteration2' prop to it.
 */
import BrainStorming from "pages/AnalysePrevisibilite/BrainStorming/BrainStorming"

/**
 * @function BrainStormingPage
 * @brief Renders the BrainStorming component and passes the 'iteration2' prop to it.
 *
 * @param {boolean} iteration2 - Flag to indicate whether it's the second iteration or not.
 * @returns {JSX.Element} The BrainStorming component with the 'iteration2' prop set.
 */
export default ({ iteration2 }) => {
    return <BrainStorming iteration2={iteration2} />
}
