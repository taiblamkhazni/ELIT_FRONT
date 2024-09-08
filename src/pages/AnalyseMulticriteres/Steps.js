/**
 * @file Steps.js
 * @brief Ce fichier contient le composant Steps
 */
import { InfoWrapper } from "components/Info/Info"

import Footer from "./Footer/Footer"
import Header from "./Header/Header"
import MiddleContent from "./MiddleContent/MiddleContent"

/**
 * @brief Steps
 * @description This component renders a structured view to display a series of steps or phases.
 * The steps are represented with a title wrapped in an InfoWrapper and a position number.
 *
 * @returns {JSX.Element} JSX element representing the steps view with a header, middle content, and footer.
 */
const Steps = () => {
    /**
     * @constant phases - Array of objects representing the phases of the steps.
     * Each object contains a title and a position.
     **/
    const phases = [
        {
            title: <InfoWrapper>Spécificité</InfoWrapper>,
            position: 1,
        },
        {
            title: <InfoWrapper>Certitude</InfoWrapper>,
            position: 2,
        },
        {
            title: <InfoWrapper>Manoeuvrabilité</InfoWrapper>,
            position: 3,
        },
    ];

    /**
     * @returns The structured view of the steps with a header, middle content, and footer.
     */
    return (
        <>
            <Header phases={phases} />
            <MiddleContent />
            <Footer phasesLength={phases.length} />
        </>
    );
}

export default Steps
