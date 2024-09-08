/**
 * @file BrainStormingAnswerForm.js
 * @brief Ce fichier contient le composant BrainStromingAnswerForm.
 */

import { Col, Row } from "antd"
import { ErrorAlert } from "components/Alert/Alert"
import { LabelCustom } from "components/Label/Label"
import { TextareaCustom } from "components/Textarea/Textarea"
import EnhancedRate from "pages/AnalyseMulticriteres/MiddleContent/EnhancedRage"
import PropTypes from "prop-types"
import styled from "styled-components"
import { t } from "utils/translationUtils";

const Wrapper = styled.div`
  font-size: 14px;
`
/** Input Section Wrapper Component*/
const InputSectionWrapper = styled.div`
  margin-bottom: 22px;
`

const BrainStormingAnswerForm = ({ validation, errors, question }) => {
    const label = question.questionRef
    return (
        <Wrapper>
            {/* <TitleSection>Ajouter une note</TitleSection> */}
            <form>
                <InputSectionWrapper>
                    <LabelCustom htmlFor={label}>
                        {question.questionText}
                    </LabelCustom>
                    <TextareaCustom
                        rows="8"
                        placeholder="Placeholder"
                        id={label}
                        defaultValue={question.answerText ? question.answerText : ""}
                        {...validation?.register(`${label}`, {
                            required: t('analysePrevisibilite.brainstorming.answerForm.inputRequired'),
                            maxLength: {
                                value: 400,
                                message:
                                    t('analysePrevisibilite.brainstorming.answerForm.answerWordLimit'),
                            },
                            pattern: {
                                value:/^(?![\s]{2})[a-zA-Z0-9\s.,\t\r\n@_+~éàèçôâùûê'î-]+$/,
                                message: t('analysePrevisibilite.brainstorming.answerForm.invalidInput'),
                            },

                        })}
                    />
                    <ErrorAlert>{errors[label]?.message}</ErrorAlert>
                    <Row>
                        {question.criterias.slice()
                            .sort((a, b) => {
                                if (a.criteriaName < b.criteriaName) {
                                    return -1
                                }
                                if (a.criteriaName > b.criteriaName) {
                                    return 1
                                }
                                return 0
                            })
                            .map((c) => {
                                return (
                                    <Col key={`${question.questionRef}_${c.criteriaName}`}>
                                        <EnhancedRate
                                            title={c.criteriaName}
                                            defaultValue={
                                                c.criteriaValue ? Number(c.criteriaValue) : 0
                                            }
                                            validation={validation}
                                            groupName={`${question.questionRef}`}
                                            margin="0 32px 0 0"
                                        />
                                    </Col>
                                )
                            })}
                    </Row>
                </InputSectionWrapper>
            </form>
        </Wrapper>
    )
}

BrainStormingAnswerForm.propTypes = {
    validation: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
}

export default BrainStormingAnswerForm
