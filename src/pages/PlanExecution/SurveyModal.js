/**
 * @file SurveysModal.js
 * @brief Exports the SurveysModal.js.
 */
import { useEffect, useState } from "react"
import { Space } from "antd"
import { ErrorAlert } from "components/Alert/Alert"
import { ButtonNoBackground, NextStepButton } from "components/Button/Button"
import {
    CustomModalEdit,
    CustomTextModalEdit,
    CustomTitleModalEdit,
} from "components/Modal/Modal"
import { TextareaCustom } from "components/Textarea/Textarea"
import {
    getSurveyQuestions,
    postSurveyAnswersByUserId,
} from "hooks/apis/PlanExecutionApi"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import styled from "styled-components"

/**
 * @var typeAnswers
 * @brief typeAnswers.
 */
const typeAnswers = {
    satisfaction: [
        {
            text: "Vraiment très satisfait(e) ",
            note: 1,
        },
        {
            text: "Très satisfait(e) ",
            note: 2,
        },
        {
            text: "Ni satisfait(e) ni satisfait(e) ",
            note: 3,
        },
        {
            text: "Insatisfait (e)",
            note: 4,
        },
        {
            text: "Très insatisfait(e)",
            note: 5,
        },
    ],
    utilité: [
        {
            text: "Très peu utile",
            note: 1,
        },
        {
            text: "Assez peu utile",
            note: 2,
        },
        {
            text: "Pas sûr",
            note: 3,
        },
        {
            text: "Assez utile",
            note: 4,
        },
        {
            text: "Très utile",
            note: 5,
        },
    ],
    probabilité: [
        {
            text: "Très peu probable",
            note: 1,
        },
        {
            text: "Assez peu probable",
            note: 2,
        },
        {
            text: "Ni probable ni improbable",
            note: 3,
        },
        {
            text: "Assez probable",
            note: 4,
        },
        {
            text: "Très probable",
            note: 5,
        },
    ],
    clarté: [
        {
            text: "Très peu clarté",
            note: 1,
        },
        {
            text: "Assez peu clarté",
            note: 2,
        },
        {
            text: "Ni clarté ni inclarté",
            note: 3,
        },
        {
            text: "Assez clarté",
            note: 4,
        },
        {
            text: "Très clarté",
            note: 5,
        },
    ],
    difficuté: [
        {
            text: "Vraiment très facile à utiliser",
            note: 1,
        },
        {
            text: "Facile à utiliser",
            note: 2,
        },
        {
            text: "Ni facile ni difficile à utiliser",
            note: 3,
        },
        {
            text: "Difficile à utiliser",
            note: 4,
        },
        {
            text: "Très difficile à utiliser",
            note: 5,
        },
    ],
    accord: [
        {
            text: "Tout à fait d’accord",
            note: 1,
        },
        {
            text: "D’accord",
            note: 2,
        },
        {
            text: "Ni en accord ni en désaccord ",
            note: 3,
        },
        {
            text: "Pas d’accord",
            note: 4,
        },
        {
            text: "Pas du tout d’accord",
            note: 5,
        },
    ]
}

/**
 * @var default
 * @brief default.
 */
export default ({ isModalOpen, setIsModalOpen, handlePasseSurVey }) => {
    const QuestionModal = styled.div`
      display: flex;
      margin: 0.5rem 0;
    `
    const user = useSelector((state) => state.authentificationReducer.user)
    const [questions, setQuestions] = useState([])
    const [checkedAnswers, setCheckedAnswers] = useState([])

    const handleOkModal = () => {
        setIsModalOpen(false)
    }

    const handleCancelModal = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        getSurveyQuestions().then((res) => {
            if (res) {
                setQuestions(res)
            }
        })
    }, [])

    const onRepondre = (questionId, note) => {
        setCheckedAnswers([
            ...checkedAnswers.filter((a) => a.questionId !== questionId),
            { questionId, note },
        ])
    }

    const validation = useForm()

    const checkOpenedQuestionType = (questionId) => {
        return questions.filter((q) => q.id === parseInt(questionId))[0].type ===
            "amélioration"
            ? true
            : false
    }

    const handleSoumettre = (inputs) => {
        if (inputs) {
            const payload = Object.keys(inputs).map((i) => {
                const questionId = i.split("_")[1]
                return {
                    answerValue: inputs[i],
                    questionId: questionId,
                    userId: user.id,
                    answerType: checkOpenedQuestionType(questionId)
                        ? "FREE_ANSWER"
                        : "SELECTED_ANSWER",
                }
            })
            postSurveyAnswersByUserId(payload).then((res) => {
                if (res) {
                    handlePasseSurVey()
                    setIsModalOpen(false)
                }
            })
        }
    }

    return (
        <CustomModalEdit
            title={
                <CustomTitleModalEdit>
                    Questionnaire de satisfaction (optionnel)
                </CustomTitleModalEdit>
            }
            open={isModalOpen}
            onOk={handleOkModal}
            onCancel={handleCancelModal}
            footer={[
                <ButtonNoBackground key="nextStep" onClick={handlePasseSurVey}>
                    Passer cette étape
                </ButtonNoBackground>,
                <NextStepButton
                    key="validate"
                    onClick={validation.handleSubmit((inputs) => handleSoumettre(inputs))}
                >
                    Soumettre
                </NextStepButton>,
            ]}
            style={{ height: "calc(100vh - 200px)" }}
            styles={{ overflowY: "scroll" }}
            width="50%"
        >
            <p>
                Pendant que nous produisons les résultats de votre analyse, aimeriez-vous nous aider à nous améliorer en répondant à ce questionnaire de satisfaction ?
            </p>
            {questions &&
                questions.map((element, index) => {
                    return (
                        <div key={element.id} style={{ marginBottom: "5px" }}>
                            <QuestionModal>
                                <CustomTextModalEdit>{index + 1}.*</CustomTextModalEdit>
                                {element.question}
                            </QuestionModal>
                            {element.type !== "amélioration" ? (
                                <fieldset>
                                    {typeAnswers[element.type]?.map((a, indexA) => {
                                        return (
                                            <div
                                                key={`${element.id}_${a.note}`}
                                                style={{ margin: "0 0 5px 2rem" }}
                                                onChange={(e) => onRepondre(element.id, e.target.value)}
                                                {...validation.register(`answer_${element.id}`, {
                                                    required: "Ce champ est obligatoire !",
                                                })}
                                            >
                                                <Space>
                                                    <input
                                                        type={"radio"}
                                                        style={{ cursor: "pointer" }}
                                                        name={"answer_" + element.id}
                                                        id={"answer_" + element.id + "_" + indexA}
                                                        value={a.note}
                                                    />
                                                    <label
                                                        htmlFor={"answer_" + element.id + "_" + indexA}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {a.text}
                                                    </label>
                                                </Space>
                                            </div>
                                        )
                                    })}{" "}
                                    <ErrorAlert>
                                        {
                                            validation.formState.errors[`answer_${element.id}`]
                                                ?.message
                                        }
                                    </ErrorAlert>
                                </fieldset>
                            ) : (
                                <>
                                    <TextareaCustom
                                        rows="8"
                                        placeholder="Placeholder"
                                        id={"answer_" + index + "_"}
                                        {...validation.register(`answer_${element.id}`, {
                                            required: "Ce champ est obligatoire !",
                                            maxLength: {
                                                value: 400,
                                                message:
                                                    "Votre réponse ne doit pas dépasser les 400 caractères",
                                            },
                                            pattern: {
                                                value: /^[A-Za-z0-9.,\t\r\n()@[\]_+~éàèçôâ]+$/,
                                                message:
                                                    "Votre réponse contient des caractères non acceptés.",
                                            },
                                        })}
                                    />{" "}
                                    <ErrorAlert>
                                        {
                                            validation.formState.errors[`answer_${element.id}`]
                                                ?.message
                                        }
                                    </ErrorAlert>
                                </>
                            )}
                        </div>
                    )
                })}
        </CustomModalEdit>
    )
}
