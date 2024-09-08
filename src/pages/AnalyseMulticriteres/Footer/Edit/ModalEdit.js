/**
 * @file ModalEdit.js
 * @brief Defines the ModalEdit component.
 */
import { useState } from "react"
import { ButtonNoBackground, NextStepButton } from "components/Button/Button"
import { CustomModalEdit } from "components/Modal/Modal"
import { StepPageTitle, TitleSection } from "components/Title/Title"
import { useStepContext } from "pages/AnalyseMulticriteres/AnalyseMulticriteresPage"
import { VerticalSpace } from "pages/ProjectDashboard/StageBase"

import EditQuestion from "./EditQuestion"

/**
 * ModalEdit
 * @description Renders a modal to check and edit questions within the multicriteria analysis stage.
 * @returns {JSX.Element} Rendered component
 */
const ModalEdit = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {
        listFormQuestions,
        getStepNameById,
    } = useStepContext()

    /**
     * showModal
     * @brief Opens the modal by setting its visibility to true.
     */
    const showModal = () => {
        setIsModalOpen(true)
    }

    /**
     * handleOk
     * @brief closes the modal by setting its visibility to false.
     */
    const handleOk = () => {
        setIsModalOpen(false)
    }

    /**
     * handleCancel
     * @brief cancels the modal by setting its visibility to false.
     */
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <ButtonNoBackground onClick={showModal}>
                Vérifier la saisie
            </ButtonNoBackground>
            <CustomModalEdit
                title={
                    <StepPageTitle
                        StepNumber="Étape 1"
                        StepName="Analyse multicritère - Récapitulatif de votre saisie"
                    />
                }
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                footer={[
                    <NextStepButton key="validate" onClick={handleOk}>
                        Valider
                    </NextStepButton>,
                ]}
                style={{ height: "calc(100vh - 200px)" }}
                styles={{ overflowY: "scroll" }}
                width="50%"
            >
                {listFormQuestions.map((f, index) => {
                    const uniqueKeyForDiv = `div-${f.currentStep}`; // Using a combination of the string "div-" and the currentStep
                    return (
                        <div key={uniqueKeyForDiv}>
                            <TitleSection>{`${index + 1}. ${getStepNameById(
                                f.currentStep
                            )}`}</TitleSection>
                            <>
                                {f.formQuestions.map((q, index) => (
                                    <EditQuestion
                                        currentStep={Number(f.currentStep)}
                                        question={q}
                                        key={q.questionRef}
                                        questionnumber={`${f.currentStep}.${index + 1}`}
                                    />
                                ))}
                            </>
                            <VerticalSpace size="30px" />
                        </div>
                    );
                })}
            </CustomModalEdit>
        </>
    );
}

export default ModalEdit
