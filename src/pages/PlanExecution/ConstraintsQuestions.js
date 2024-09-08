/**
 * @file ConstrainsQuestions.js
 * @brief Exports the ConstrainsQuestions.js.
 */
import TextareaQuestions from "shared/TextareaQuestions/QuestionWrapper"

/**
 * @var default
 * @brief default.
 */
export default ({ validation }) => {
    return (
        <TextareaQuestions validation={validation} />
    )
}
