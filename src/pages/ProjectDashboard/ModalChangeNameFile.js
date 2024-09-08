/**
 * @file ModalChangeNameFile.js
 * @brief Exports the ModalChangeNameFile.js.
 */
import { useEffect, useRef } from "react"
import { ButtonNoBackground, NextStepButton } from "components/Button/Button"
import { StructureGrid } from "components/Grid/Grid"
import { InputCustom } from "components/Input/Input"
import { LabelCustom } from "components/Label/Label"
import {
    CustomModalEdit,
    CustomTextModalEdit,
    CustomTitleModalEdit,
} from "components/Modal/Modal"
import { renommerNameFileQuery } from "hooks/queries/queries"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"
import { t } from "utils/translationUtils";

/**
 * @var ModalChangeNameFile
 * @brief ModalChangeNameFile.
 */
const ModalChangeNameFile = ({
    isModalOpen,
    setIsModalOpen,
    attachementId,
    fileName,
}) => {
    const fileNameSplit = fileName.split(".")
    const nameBase = fileNameSplit[0]
    const extentionDeFichier = fileNameSplit[1]
    const refInputName = useRef(null)
    const { mutate: onRenommerNomFichier } = renommerNameFileQuery()

    const handleOk = () => {
        SwalWithBootstrapButtons.fire({
            title: t('projectDashboard.changeFileNameModal.confirm.title'),
            text: t('projectDashboard.changeFileNameModal.confirm.text'),
            showCancelButton: true,
            cancelButtonColor: "#C91432",
            confirmButtonColor: "#10B581",
            confirmButtonText: t('projectDashboard.changeFileNameModal.confirm.confirmButton'),
            cancelButtonText: t('projectDashboard.changeFileNameModal.confirm.cancelButton'),
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                onRenommerNomFichier([
                    attachementId,
                    JSON.stringify({
                        newAttachmentName: `${refInputName.current.value}.${extentionDeFichier}`,
                    }),
                ])
                setIsModalOpen(false)
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        if (refInputName && refInputName.current) {
            refInputName.current.value = nameBase
        }
    })

    return (
        <>
            <CustomModalEdit
                title={
                    <CustomTitleModalEdit>
                        {t('projectDashboard.changeFileNameModal.title')}
                    </CustomTitleModalEdit>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width="40%"
                footer={[
                    <ButtonNoBackground key="nextStep" onClick={handleCancel}>
                        {t('projectDashboard.changeFileNameModal.cancelButton')}
                    </ButtonNoBackground>,
                    <NextStepButton key="validate" onClick={handleOk}>
                        {t('projectDashboard.changeFileNameModal.confirmButton')}
                    </NextStepButton>,
                ]}
            >
                <LabelCustom htmlFor="name">
                    <CustomTextModalEdit>{t('projectDashboard.changeFileNameModal.fileNameLabel')}</CustomTextModalEdit>
                </LabelCustom>
                <StructureGrid
                    gutter={[16, 12]}
                    spanLeft={16}
                    leftChild={
                        <InputCustom
                            id="name"
                            type="text"
                            placeholder={t('projectDashboard.changeFileNameModal.fileNamePlaceholder')}
                            defaultValue={nameBase}
                            ref={refInputName}
                        />
                    }
                    spanRight={8}
                    rightChild={
                        <InputCustom
                            id="extention"
                            type="text"
                            defaultValue={`.${extentionDeFichier}`}
                            disabled
                        />
                    }
                />
            </CustomModalEdit>
        </>
    )
}

export default ModalChangeNameFile
