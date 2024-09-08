/**
 * @file ModalAnalyse.js
 * @brief Ce fichier définit le composant ModalAnalyse.
 */
import { useState } from "react"
import { ButtonNoBackground, NextStepButton } from "components/Button/Button"
import { CustomModalEdit, CustomTitleModalEdit } from "components/Modal/Modal"
import { Text } from "components/Text/Text"
import { useDispatch, useSelector } from "react-redux"
import { setCurrent } from "reducers/previsibilityAnalysis/previsibilityAnalysisReducer"
import styled from "styled-components"

/**
 * @brief NextStepButtonRight : représente le bouton de validation de l'Choix de la méthodologie.
 **/
export const NextStepButtonRight = styled(NextStepButton)`
  float: right;
`

/**
 * @brief ModalAnalyse : représente le composant du modal de l'Choix de la méthodologie.
 */
const ModalAnalyse = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const current = useSelector(state => state.previsibilityAnalysisReducer.current)

    const dispatch = useDispatch()

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
        dispatch(setCurrent(current + 1))
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
      <>
        <NextStepButtonRight margin="0" onClick={showModal}>
          Lancer l'analyse
        </NextStepButtonRight>
        <CustomModalEdit
          title={
            <CustomTitleModalEdit>
              Choix de la méthodologie
            </CustomTitleModalEdit>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <>
              <ButtonNoBackground key="wait" onClick={handleCancel}>
                Non, attendre
              </ButtonNoBackground>
              <NextStepButton key="validate" onClick={handleOk}>
                Oui, lancer l'analyse
              </NextStepButton>
            </>,
          ]}
          width="30%"
        >
          <Text>
            <strong>[Tiffany COSON]</strong> n'a pas encore validé ses réponses,
            êtes-vous sur de vouloir lancer l'analyse?
          </Text>
        </CustomModalEdit>
      </>
    );
}

export default ModalAnalyse
