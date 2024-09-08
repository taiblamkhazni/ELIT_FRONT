/**
 * @file ListStage.js
 * @brief Exports the ListStage.js.
 */
import { Flex } from "antd";
import TYPES from "common/analyseTypes";
import { useSelector } from "react-redux";
import { t } from "utils/translationUtils";

import StageBase from "./StageBase";
/**
 * @var default
 * @brief default.
 */
export default () => {
  // const checkObservateur = useSelector(
  //     (state) => state.projectReducer.checkUserIsObservateur
  // )

    const isFinishedMulticrite = useSelector(
        (state) => state.multicriteriaAnalysisReducer.isFinished
    )

    const isFinishedPrevisibility = useSelector(
        (state) => state.previsibilityAnalysisReducer.isFinished
    )

    const isFinishedPlanExe = useSelector(
        (state) => state.executionPlanReducer.isFinished
    )
    return (
      <div style={{ marginTop: "24px", height: "40rem" }}>
        <Flex horizontal justify="space-between">
          <StageBase
            title={t('projectDashboard.listStage.multicriteria')}
            type={TYPES.multicriteria}
            step={1}
            activated={!isFinishedMulticrite}
            completed={isFinishedMulticrite}
          />
          <StageBase
            title={t('projectDashboard.listStage.predictibility')}
            type={TYPES.predictibility}
            step={2}
            activated={isFinishedMulticrite}
            completed={isFinishedPrevisibility}
          />
          <StageBase
            title={t('projectDashboard.listStage.execution')}
            type={TYPES.execution}
            step={3}
            activated={isFinishedPrevisibility}
            completed={isFinishedPlanExe}
          />
        </Flex>
      </div>
    );
}
