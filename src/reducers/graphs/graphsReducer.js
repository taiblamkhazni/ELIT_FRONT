/**
 * @file graphsReducer.js
 * @brief Ce fichier définit le composant graphsReducer.
 */
import critereBar from "store/features/AnalyseMulticritereFeatures/critereBarSlice"
import critereColumn from "store/features/AnalyseMulticritereFeatures/critereColumnSlice"
import weightPie from "store/features/AnalyseMulticritereFeatures/weightPieSlice"
import aspectsBarEScore from "store/features/AnalysePrevisibiliteFeatures/aspectsBarEScoreSlice"
import aspectsBarMethod from "store/features/AnalysePrevisibiliteFeatures/aspectsBarMethodSlice"
import aspectsGauge from "store/features/AnalysePrevisibiliteFeatures/aspectsGaugeSlice"
import methodsBar from "store/features/PlanExecution/methodsBarSlice.js"
import methodsPie from "store/features/PlanExecution/methodsPieSlice"

const graphsReducer = {
    critereBar,
    critereColumn,
    aspectsBarEScore,
    aspectsBarMethod,
    aspectsGauge,
    methodsBar,
    methodsPie,
    weightPie
}

export default graphsReducer