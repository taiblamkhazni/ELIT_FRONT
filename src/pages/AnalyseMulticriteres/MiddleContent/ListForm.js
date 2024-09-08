/**
 * @file ListForm.js
 * @brief This module presents a list of questions based on the analysis stage. Users can input answers and rate them.
 *
 * Stages include:
 * - 0: Specificity
 * - 1: Certitude
 * - 2: Manoeurability
 *
 * The component also provides error validation and auto-scrolling functionalities to enhance user experience.
 */
import { useCallback, useEffect } from "react"
import { Flex } from "antd"
import { ErrorAlert } from "components/Alert/Alert"
import { QuestionLabelCustom } from "components/Label/Label"
import { TextareaCustom } from "components/Textarea/Textarea"
import { useStepContext } from "pages/AnalyseMulticriteres/AnalyseMulticriteresPage"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import styled from "styled-components"

import EnhancedRate from "./EnhancedRage"

/**
 * @brief QuestionWrapper : Component
 */
const QuestionWrapper = styled.div`
  margin-bottom: 1.5rem;
  padding: 16px 24px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
`

/**
 * ListForm
 * @brief Component to display a list of questions based on the analysis stage.
 *
 * @param {number} current - Represents the current stage of analysis.
 * @returns {JSX.Element} Rendered list of questions.
 */
const ListForm = ({ current }) => {
    /**
     * @brief editQuestionRef - Reference to the question being edited.
     **/
    const editQuestionRef = useSelector(
        (state) => state.multicriteriaAnalysisReducer.editQuestionRef
    );

    /**
     * @constant getValidationByCurrent - Function to get validation by current stage.
     * @constant getListFormQuestionsByCurrentStep - Function to get list of questions by current stage.
     **/
    const { getValidationByCurrent, getListFormQuestionsByCurrentStep } =
        useStepContext();

    /**
     * @brief listQuestions - List of questions based on the current stage.
     **/
    const listQuestions = getListFormQuestionsByCurrentStep(current)?.sort(
        (a, b) => {
            if (
                parseInt(a.questionRef.split("_").pop()) >
                parseInt(b.questionRef.split("_").pop())
            ) {
                return 1;
            } else {
                return -1;
            }
        }
    );

    /**
     * @brief validation - Validation object based on the current stage.
     **/
    const validation = getValidationByCurrent(current);

    /**
     * @brief errors - Error object based on the current stage.
     **/
    const {
        /** register,*/
        formState: { errors },
    } = validation;

    /**
   * @brief listKeysOfErrors - List of keys of errors based on the current stage.
   **/
    const listKeysOfErrors = Object.keys(errors);

    /**
     * @brief getOffset - Function to get the offset of an element.
     **/
    const getOffset = (el) => {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY,
        };
    };

    /**
     * @brief scrollToElementDom - Function to scroll to a specific element.
     **/
    const scrollToElementDom = useCallback((elementDom) => {
        const x = getOffset(elementDom).left;
        const y = getOffset(elementDom).top - 25;
        window.scrollTo(x, y);
    }, []);

    if (listKeysOfErrors.length > 0) {
        /**
         * @constant reversedErrors - Reversed list of errors based on the current stage.
         * @constant listKeysOfErrorsSortPosition - List of keys of errors sorted by position.
         * @constant element - Reference to the element being scrolled to.
         **/
        listKeysOfErrors.reverse();
        const reversedErrors = listKeysOfErrors;
        reversedErrors?.sort((a, b) => {
            if (parseInt(a.split("_").pop()) > parseInt(b.split("_").pop())) {
                return 1;
            } else return -1;
        });
        const listKeysOfErrorsSortPosition = reversedErrors;
        if (listKeysOfErrorsSortPosition.length) {
            const element = document.getElementById(listKeysOfErrorsSortPosition[0]);
            if (element) {
                scrollToElementDom(element);
            }
        }
    }

    useEffect(() => {
        if (editQuestionRef) {
            const element = document.getElementById(editQuestionRef);
            if (element) {
                element.focus();
                scrollToElementDom(element);
            }
        }
    }, [editQuestionRef,scrollToElementDom]);

    return (
        <>
            {listQuestions?.map((question, index) => {
                const label = question.questionRef;
                return (
                    <QuestionWrapper key={label}>
                        <QuestionLabelCustom
                            htmlFor={label}
                            index={index}
                            questionText={question.questionText}
                        />
                        <TextareaCustom
                            rows="8"
                            placeholder="Votre réponse ici"
                            id={label}
                            defaultValue={question.answerText ? question.answerText : ""}
                            {...validation?.register(`${label}`, {
                                required: "Ce champ est obligatoire !",
                                maxLength: {
                                    value: 400,
                                    message:
                                        "Votre réponse ne doit pas dépasser les 400 caractères",
                                },
                                minLength: {
                                    value: 2,
                                    message: "Votre réponse doit avoir au minimum 2 caractères",
                                },
                                pattern: {
                                    value: /^(?![\s]{2})[a-zA-Z0-9\s.,\t\r\n@_+~éàèçôâùûê'î-]+$/,
                                    message: "La réponse comporte des caractères non acceptés.",
                                },
                            })}
                        />
                        <ErrorAlert>{errors[label]?.message}</ErrorAlert>
                        <p>
                            Consultez et modifiez le poids des critères d'evaluation en haut
                            de la page, puis évaluez la qualité de votre réponse en fonction
                            des critères suivants : 1 rond étant la note la moins
                            satisfaisante et 5 ronds la plus satisfaisante.
                        </p>
                        <Flex horizontal align="center" style={{ padding: "8px", background: "#F7FBFF", fontSize: "16px" }}>
                            {question.criterias
                                .sort((a, b) => {
                                    if (a.criteriaName < b.criteriaName) {
                                        return -1;
                                    }
                                    if (a.criteriaName > b.criteriaName) {
                                        return 1;
                                    }
                                    return 0;
                                })
                                .map((c) => {
                                    return (
                                        <div key={`${question.questionRef}_${c.criteriaName}`}>
                                            <EnhancedRate
                                                title={c.criteriaName}
                                                defaultValue={
                                                    c.criteriaValue ? Number(c.criteriaValue) : 0
                                                }
                                                validation={validation}
                                                groupName={`${question.questionRef}`}
                                                margin="0 48px 0 0"
                                            />
                                        </div>
                                    );
                                })}
                        </Flex>
                    </QuestionWrapper>
                );
            })}
        </>
    );
}

ListForm.propTypes = {
    current: PropTypes.number,
}

export default ListForm
