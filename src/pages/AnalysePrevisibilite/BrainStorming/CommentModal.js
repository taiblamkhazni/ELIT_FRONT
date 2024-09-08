/**
 * @file CommentModal.js
 * @brief Ce fichier définit le composant CommentModal.
 */
import { useState } from "react"
import { Plus } from "assets/icons"
import { NextStepButton } from "components/Button/Button"
import { CustomModalEdit, CustomTitleModalEdit } from "components/Modal/Modal"
import { AddComment, ModifyComment } from "hooks/queries/queries"
import { AddSection } from "pages/ProjectDashboard/FilesTable"
import { useForm } from "react-hook-form"
import {  useSelector } from "react-redux"
import { useTheme } from "styled-components"
import { t } from "utils/translationUtils";
import { BrainStormingSchema } from "validation/Schema"

import { yupResolver } from "@hookform/resolvers/yup"

import BrainstormingCommentForm from "./BrainStormingCommentForm/BrainStormingCommentForm"

const CommentModal = ({ predictibilityAnalysisId, question, user }) => {
    const theme = useTheme()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { mutate: sendComment } = AddComment()
    const { mutate: modifyCurrentComment } = ModifyComment()
    const projectId = useSelector((state) => state.projectReducer.projectId)

    const modifiedBrainstorming = question.brainstormings.find(
        (brainstorming) => brainstorming.firstName === user.firstname
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(BrainStormingSchema),
    })

    const handleVisibility = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleFormSubmit = (data) => {
        handleVisibility()
        if (!modifiedBrainstorming) {
            data["questionId"] = question.questionId
            data["predictibilityAnalysisId"] = predictibilityAnalysisId
            sendComment([JSON.stringify(data),projectId])
            
        } else {
            data["brainstormingId"] = modifiedBrainstorming.brainstormingId
            modifyCurrentComment([JSON.stringify(data),projectId])
        }
    }

    return (
        <>
            <AddSection onClick={handleVisibility}>
                {modifiedBrainstorming ? (
                    <>
                        <Plus fill={theme.colors.primaires.blue} />
                        <span style={{ marginLeft: "5px" }}>{t('analysePrevisibilite.brainstorming.commentModal.modify')}</span>
                    </>
                ) : (
                    <>
                        <Plus fill={theme.colors.primaires.blue} />
                        <span style={{ marginLeft: "5px" }}>{t('analysePrevisibilite.brainstorming.commentModal.add')}</span>
                    </>
                )}
            </AddSection>
            <CustomModalEdit
                title={
                    <CustomTitleModalEdit>{question.questionText}</CustomTitleModalEdit>
                }
                open={isModalOpen}
                onCancel={handleVisibility}
                onOk={handleVisibility}
                footer={[
                    <NextStepButton
                        key="submit"
                        type="primary"
                        onClick={handleSubmit((data) => handleFormSubmit(data))}
                    >
                        {t('analysePrevisibilite.brainstorming.commentModal.confirm')}
                    </NextStepButton>,
                ]}
            >
                <BrainstormingCommentForm
                    register={register}
                    errors={errors}
                    content={
                        modifiedBrainstorming ? modifiedBrainstorming.brainstormingText : ""
                    }
                />
            </CustomModalEdit>
        </>
    )
}

export default CommentModal
