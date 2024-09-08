/**
 * @file ListStageIA.js
 * @brief Exports the ListStageIA.js.
 */
import { Col, Row } from "antd"
import TYPES from "common/analyseTypes"
import { useSelector } from "react-redux"
import { t } from "utils/translationUtils";

import StageBase from "./StageBase"
/**
 * @var default
 * @brief default.
 */
export default () => {
    const isFinishedMulticrite = useSelector(
        (state) => state.multicriteriaAnalysisReducer.isFinished
    )
    const isFinished = useSelector(
        (state) => state.previsibilityAnalysisReducer.isFinished
    )
    const isFinishedPlanExe = useSelector(
        (state) => state.executionPlanReducer.isFinished
    )



    return (
        <div style={{ marginTop: "24px" }}>
            <Row gutter={[22, 0]}>
                <Col span={8}>
                    <StageBase
                        title={t('projectDashboard.listStageAI.multicriteria')}
                        type={TYPES.multicriteria}
                        step={1}
                        activated={!isFinishedMulticrite}
                        completed={isFinishedMulticrite}
                    />
                </Col>
                <Col span={8}>
                    <StageBase
                        title={t('projectDashboard.listStageAI.predictibility')}
                        type={TYPES.predictibility}
                        step={2}
                        activated={isFinishedMulticrite}
                        completed={isFinished}
                    />
                </Col>
                <Col span={8}>
                    <StageBase
                        title={t('projectDashboard.listStageAI.execution')}
                        type={TYPES.execution}
                        step={3}
                        activated={isFinished}
                        completed={isFinishedPlanExe}
                    />
                </Col>
            </Row>
        </div>
    )
}
