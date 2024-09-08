/**
 * @file StepWeighsSection.js
 * @brief Ce fichier contient le composant StepWeightsSection.
 */
import { Flex } from "antd"
import CharacterStage1 from "assets/images/characterStage1.png"
import { useStepContext } from "pages/AnalyseMulticriteres/AnalyseMulticriteresPage"
import { useSelector } from "react-redux"

import Information from "./Information"
import ModalWeightsChange from "./ModalWeightsChange"
import StepsWeightChart from "./StepWeightChart"

/**
 * @brief Style personnalisé pour le composant StepWeightsSection.
 */
const customStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    gap: "40px",
    padding: "24px 0px 24px 16px",
    margin: "3rem auto 1.5rem",


    backgroundColor: "#FFFFFF",
    borderRadius: "8px 0px 0px 0px",
};

/**
 * @brief Configurable step weights section
 **/
function StepWeightsSection({phaseName}) {
    const current = useSelector(
        (state) => state.multicriteriaAnalysisReducer.current
    )

    const { getCurrentStepWeights } = useStepContext()
    const listCurrentStepWeights = [...getCurrentStepWeights(current)]
    const canPass = Boolean(listCurrentStepWeights)
    return (
        <>
            {canPass ? (
                <Flex style={customStyle}>
                    <img src={CharacterStage1} alt="illustration-image" />
                    <div>
                        <Information phaseName={phaseName} />
                        <ModalWeightsChange />
                    </div>
                    <StepsWeightChart phaseName={phaseName} listCurrentStepWeights={listCurrentStepWeights} />
                </Flex>
            ) : (
                <></>
            )}
        </>
    );
}

export default StepWeightsSection;
