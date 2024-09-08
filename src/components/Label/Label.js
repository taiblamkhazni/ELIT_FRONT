/**
 * @file Label.js
 * @brief This module exports Label component
 */
import { Typography } from "antd";
import styled from "styled-components"

/**
 * @brief LabelCustom : The custom label component
 */
export const LabelCustom = styled(Typography.Text)`
  display: flex;

  padding-bottom: 0.5em;

  line-height: 1em;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 700;

  color: ${({ theme,isBlack }) => isBlack ? theme.colors.primaires.blueDark : theme.colors.primaires.blue};
`

/**
* @brief CustomTitleStyle : Component
**/
const QuestionLabelCustomStyle = styled.span`
line-height: 28px;
font-size: 16px;
font-weight: ${props=> props.fontWeight ? props.fontWeight : 400};;
color: ${props=> props.color ? props.color : "#1F1A28"};
`
/**
* @brief QuestionLabelCustom : Component
**/
export const QuestionLabelCustom = ({index, questionText }) => {
  return (
    <label>
      <QuestionLabelCustomStyle color="#116E9C" fontWeight="700">Question {index + 1}. </QuestionLabelCustomStyle>
      <QuestionLabelCustomStyle>{questionText} *</QuestionLabelCustomStyle>
    </label>
  );
}

/**
 * @brief ProjectLabelCustom : The custom project label component
 */
export const ProjectLabelCustom = styled(Typography.Text)`
  display: flex;

  padding-bottom: 0.5em;

  line-height: 1em;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 700;

  color: ${({ theme }) => theme.colors.primaires.blueDark};
`
/**
 * @brief FormLabelCustom : The custom form label component
 */
export const FormLabelCustom = styled.label`
  display: flex;

  padding-bottom: 0.5em;

  line-height: 1em;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 700;

  color: ${({ theme }) => theme.colors.primaires.blue};
`
