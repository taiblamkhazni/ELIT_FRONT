/**
 * @file AnswerModal.js
 * @brief Ce fichier définit le composant AnswerModal.
 */
import { useState } from "react"
import { ButtonNoBackground, NextStepButton } from "components/Button/Button"
import { CustomModalEdit, CustomTitleModalEdit } from "components/Modal/Modal"
import { ModifyQuestionMultiQuery } from "hooks/queries/queries"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { getBrainStormingFetch } from "reducers/brainStormingResume/brainStormingResumeReducer"
import { setIsUpdateQuestion } from "reducers/previsibilityAnalysis/previsibilityAnalysisReducer"
import { useTheme } from "styled-components"
import { setStringToLowAndNormal } from "utils/effects/effects"
import { t } from "utils/translationUtils";

import { EditOutlined } from "@ant-design/icons"

import BrainStormingAnswerForm from "./BrainStormingAnswerForm/BrainStormingAnswerForm"

const AnswerModal = ({ question }) => {
    const projectId = useSelector((state) => state.projectReducer.projectId);
    const theme = useTheme()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const validation = useForm()
    const { mutate: changeAnswer } = ModifyQuestionMultiQuery()
    const idAL = useSelector((state) => state.previsibilityAnalysisReducer.id)
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = validation

    const handleOk = () => setIsModalOpen(true)
    const handleCancel = () => {
        reset()
        setIsModalOpen(false)
    }

    const handleFormSubmit = (data) => {
        const dataPut = {
            questionId: question.questionId,
            questionText: question.questionText,
            answerText: data[question.questionRef],
            questionRef: question.questionRef,
            updateQuestion:true,
            stepId: question.stepId,
            criterias: question.criterias.map((c) => {
                return {
                    criteriaId: c.criteriaId,
                    criteriaValue: parseInt(
                        data[
                        `${setStringToLowAndNormal(
                            c.criteriaName
                        )}_${setStringToLowAndNormal(question.questionRef)}`
                        ]
                    ),
                }
            }),
        }
        changeAnswer([JSON.stringify(dataPut), projectId],
            {
                onSuccess: () => {
                    dispatch(setIsUpdateQuestion(true))
                    dispatch(getBrainStormingFetch({ idAL, projectId }))
                },
            })
        setIsModalOpen(false)
    }

    return (
        <>
            <ButtonNoBackground onClick={handleOk} margin={"0px 0px 0px"} padding={"8px 10px"} >
                <EditOutlined
                    style={{ fontSize: "1.2rem" }}
                    fill={theme.colors.primaires.blue}
                />
                <span style={{ marginLeft: "5px" }}>{t('analysePrevisibilite.brainstorming.answerModal.changeAnswer')}</span>
            </ButtonNoBackground>
            <CustomModalEdit
                title={
                    <CustomTitleModalEdit>{t('analysePrevisibilite.brainstorming.answerModal.changeYourAnswer')}</CustomTitleModalEdit>
                }
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                width={684}
                footer={[
                    <ButtonNoBackground onClick={() => setIsModalOpen(false)} margin="15px">
                        {t('analysePrevisibilite.brainstorming.answerModal.cancel')}
                    </ButtonNoBackground>,
                    <NextStepButton
                        key="submit"
                        type="primary"
                        onClick={handleSubmit((data) => handleFormSubmit(data))}
                    >
                        {t('analysePrevisibilite.brainstorming.answerModal.submit')}
                    </NextStepButton>,
                ]}
            >
                <BrainStormingAnswerForm
                    validation={validation}
                    register={register}
                    errors={errors}
                    question={question}
                />
            </CustomModalEdit>
        </>
    )
}

export default AnswerModal
