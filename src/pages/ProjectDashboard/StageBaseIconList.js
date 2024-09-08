/**
 * @file StageBaseIconList.js
 * @brief Exports the StageBaseIconList.js.
 */
import { Steps } from "antd"
import { Step1, Step2, Step3 } from "assets/icons"
import styled from "styled-components"

/**
 * @var StepIconList
 * @brief StepIconList.
 */
const StepIconList = styled(Steps)`
  &
    .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    height: 2px;

  }

  .ant-steps-item:not(.ant-steps-item-active) .ant-steps-item-title {
    color: ${({ theme }) => theme.colors.secondaires.gris}!important;
  }

  // For active step title
  .ant-steps-item.ant-steps-item-active .ant-steps-item-title {
    color: ${({ theme }) => theme.colors.secondaires.blueDark}!important;
  }

  &
    .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title:after {
    height: 2px;
  }

  &
    .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title:after {
    background-color: #248bc0;
    height: 2px;
  }

  & .ant-steps-item-icon {
    margin: 0px;
  }

  & {
    padding: ${(props) =>
    props.padding ? props.padding : "0px 80px 0px 110px"};
  }
`
/**
 * @var Step
 * @brief Step.
 */
const { Step } = Steps
/**
 * @var default
 * @brief default.
 */
export default ({ currentStage }) => {
  return (
    <div style={{ margin: "42px 0 25px 0" }}>
      <StepIconList padding="0px 14%" current={currentStage}>
        <Step
          icon={currentStage >= 1 ? <Step1 validated={true} /> : <Step1 />}
        />
        <Step
          icon={currentStage >= 2 ? <Step2 validated={true} /> : <Step2 />}
        />
        <Step
          icon={currentStage >= 3 ? <Step3 validated={true} /> : <Step3 />}
        />
      </StepIconList>
    </div>
  )
}
