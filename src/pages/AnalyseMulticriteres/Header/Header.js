/**
 * @file Header.js
 * @brief This module defines the Header component and the type of its props.
 *
 * The Header component uses a series of steps to display progress through the multicriteria analysis phase.
 * Depending on the current phase, the component adjusts the display and icon of each step accordingly.
 * Additional components like HeaderDescription and StepWeightsSection provide supplementary information.
 */
import CustomSteps from "components/Steps/Steps";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import StepWeightsSection from "./StepWeightsSection/StepWeightsSection";
import HeaderDescription from "./HeaderDescription";

/**
 * Header
 * @brief This component displays a series of steps to represent the multicriteria analysis phase.
 * The current phase is highlighted, completed phases show a checkmark, and upcoming phases are grayed out.
 *
 * @param {Object} props - Properties passed to the component, especially the phases.
 * @returns {JSX.Element} Rendered Header component.
 */
const Header = ({ phases }) => {
    const current = useSelector(
        (state) => state.multicriteriaAnalysisReducer.current
    );
    return (
        <>
            {current <= phases.length && (
                <CustomSteps current={current - 1} steps={phases} />
            )}
            {current === 1 && (
                <HeaderDescription phasesLength={phases.length} />
            )}

            {current <= phases.length && (
                current === 1 ? (
                    <StepWeightsSection phaseName="Spécificité" />
                ) : current === 2 ? (
                    <StepWeightsSection phaseName="Certitude" />
                ) : (
                    <StepWeightsSection phaseName="Manoeuvrabilité" />
                )
            )}
        </>
    );
};

Header.propTypes = {
    phases: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
                .isRequired,
            position: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default Header;
