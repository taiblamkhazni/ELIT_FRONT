/**
 * @file EditQuestion.js
 * @brief Renders an individual question for editing within the multicriteria analysis context.
 */
import { LinkButton } from "components/Button/Button"
import { StructureGrid } from "components/Grid/Grid"
import { LabelCustom } from "components/Label/Label"
import { useStepContext } from "pages/AnalyseMulticriteres/AnalyseMulticriteresPage"
import Rate from "pages/AnalyseMulticriteres/MiddleContent/Rate"
import PropTypes from "prop-types"
import styled from "styled-components"

const QuestionWrapper = styled.div`
  margin-bottom: 1rem;
  padding: 8px;

  border: 1px solid #e8e8e8;
  border-radius: 4px;
`

const QuestionLabel = styled(LabelCustom)`
  padding-left: 1rem;
  line-height: 25px;
`

const AnswerText = styled.p`
  margin: 8px 1rem 20px 1rem;
`

const EditButton = styled(LinkButton)`
  margin: 0.3rem 0;
  float: right;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const RatingWrapper = styled.div`
  padding: 0.7rem 1rem;
  background: #f7fbff;
  display: flex;
  justify-content: space-between;
`

/**
 * EditQuestion
 * @param {number} currentStep - The current step of the question within the process.
 * @param {object} question - The question object containing details like text, answer, and criteria.
 * @param {string} questionnumber - The formatted string showing the question's number.
 *
 * @description Renders an individual question with an edit button and associated criteria ratings.
 * @returns {JSX.Element} Rendered question component
 */
const EditQuestion = ({ currentStep, question, questionnumber }) => {
    const { setEditQuestion } = useStepContext()
    return (
        <QuestionWrapper key={question.questionRef}>
            <StructureGrid
                spanLeft={21}
                leftChild={
                    <QuestionLabel>
                        <strong style={{ marginRight: "10px" }}>
                            Question {questionnumber}
                        </strong>
                        {question.questionText}
                    </QuestionLabel>
                }
                spanRight={3}
                rightChild={
                    <EditButton
                        onClick={() => setEditQuestion(currentStep, question.questionRef)}
                    >
                        Éditer
                    </EditButton>
                }
            />
            <AnswerText>{question.answerText}</AnswerText>
            <RatingWrapper>
                {question.criterias.map((c) => (
                    <Rate
                        key={`${question.questionRef}_${c.criteriaId}`}
                        title={c.criteriaName}
                        defaultValue={parseInt(c.criteriaValue)}
                        editable={false}
                    />
                ))}
            </RatingWrapper>
        </QuestionWrapper>
    )
}

EditQuestion.propTypes = {
    currentStep: PropTypes.number.isRequired,
    question: PropTypes.object.isRequired,
    questionnumber: PropTypes.string.isRequired,
}

export default EditQuestion
