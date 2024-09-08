/**
 * @file ModalMethodologie.js
 * @brief This module exports MenuTitle component
 */
import { NextStepButton } from "components/Button/Button"
import { CustomModal, CustomTitleModal } from "components/Modal/Modal"
import { TextBold } from "components/Text/Text"
import { methodsHelp } from "pages/AnalysePrevisibilite/Vote"

export default ({ isModalOpen, setIsModalOpen, methodologie }) => {
    const handleOk = () => {
        setIsModalOpen(false)
    }
    let description
    let advantages
    let inconveniences

    if (methodologie === "Classique") {
        description = methodsHelp["CLASSIC"].description
        advantages = methodsHelp["CLASSIC"].advantages
        inconveniences = methodsHelp["CLASSIC"].inconveniences
    } else {
        description = methodsHelp["AGILE"].description
        advantages = methodsHelp["AGILE"].advantages
        inconveniences = methodsHelp["AGILE"].inconveniences
    }

    return (
        <CustomModal
            title={
                <CustomTitleModal>
                    Caractéristiques de la méthodologie {methodologie}
                </CustomTitleModal>
            }
            open={isModalOpen}
            onCancel={handleOk}
            onOk={handleOk}
            footer={[
                <NextStepButton key="validate" onClick={handleOk}>
                    Fermer
                </NextStepButton>
            ]}
            width="40%"
        >
            <p>{description}</p>
            <TextBold color="#248BC0">Avantages</TextBold>
            <p>{advantages}</p>
            <TextBold color="#248BC0">Inconvénients </TextBold>
            <p>{inconveniences}</p>
        </CustomModal>
    )
}
