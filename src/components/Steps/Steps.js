/**
 * @file Steps.js
 * @brief Ce fichier définit le composant CustomSteps.
 */
import { ConfigProvider, Steps } from "antd"
import Checked from "assets/icons/symbols/checked"
import InProgressStep from "assets/icons/symbols/InProgressStep"
import Oval from "assets/icons/symbols/oval"
import styled from "styled-components"

export const { Step } = Steps

/**
 * @brief Création d'un composant 'Steps' personnalisé avec des styles spécifiques.
 */
const CustomStepStyle = styled(Steps)`
  & .ant-steps-item-tail {
    margin-top: 1px;
    left: -1px;
    padding: 0 !important;
  }

  & .ant-steps-item-tail::after {
    height: 3px;
  }

  & .ant-steps-item-icon {
    margin: 0px;
  }

  & .ant-steps-item-content {
    width: 100%;
    margin-top: 0px !important;
  }

  & .ant-steps-item-title {
    margin-left: -15px;
    font-size: 14px;
    line-height: 18px;
  }

  & {
    width: 90%;
    margin: 27px auto 40px auto;
  }
`;

/**
 * CustomSteps
 * @brief This component displays a series of steps to represent step based form.
 * @param {number} current - Current position of step form
 * @param {array} steps - Array of all the steps of the form
 * @returns {JSX.Element} Rendered Header component.
 **/
const CustomSteps = ({current, steps}) => {

/**
 * getStepIcon
 * @brief This function display the good Icon regarding it's step.
 * @param {number} current - Current position of step form
 * @param {number} itemPosition - Position of the different steps
 * @returns {JSX.Element} Rendered Icon component.
 **/
  const getStepIcon = (current, itemPosition) => {
    // To match with the current step, we retreive data from the database. The current step of antd stepper is 0-based, so we need to subtract 1.
    if (current === itemPosition -1) {
      return <InProgressStep data-testid="in-progress-step" />;
    } else if (current > itemPosition -1) {
      return <Checked data-testid="checked-step"/>;
    }
    return <Oval fill="#CCCCCC" data-testid="oval"/>;
  };

return (
  <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#248bc0",
        },
      }}
    >
      <CustomStepStyle
        labelPlacement="vertical"
        className="steps-custom"
        current={current}
      >
        {steps.map((item) => {
          return (
            <Step
              id={item.id}
              key={item.title}
              title={item.title}
              icon={getStepIcon(current, item.position)}
            />
          );
        })}
      </CustomStepStyle>
    </ConfigProvider>
  </>
);
}

export default CustomSteps
