/**
 * @file CollaboratorsModal.js
 * @brief This module exports the CollaboratorsModal component, which manages the display and interaction with the collaborators in a project.
 *
 * The CollaboratorsModal component is responsible for displaying the list of collaborators associated with a project. It allows users to view, add, or remove collaborators. The component uses a modal interface to display the list of collaborators and leverages the useProjectCreationContext for managing the state and actions related to collaborators.
 */
import { useEffect, useState } from "react"
import { AddCircle } from "assets/icons"
import avatarDefault from "assets/images/avatarDefault.jpg"
import AvatarCustomUrl from "components/AvatarCustomUrl/AvatarCustomUrl"
import { WrapperAvatar } from "components/Head/Head"
import { CustomModalEdit, CustomTitleModalEdit } from "components/Modal/Modal"
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext"
import CollaboratorSelect from "pages/ProjectCreation/FormProjectCreation/CollaboratorSelect/CollaboratorSelect"
import { useSelector } from "react-redux"
import styled from "styled-components"

/**
 * @brief CollaborateursWrapper Styled Component
 */
const CollaborateursWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: end;
`

/**
 * @brief CollaboratorsModal : Component
 * @param {Object} props - Props for CollaboratorsModal component.
 * @param {Array} props.collaborateurs - Array of collaborator objects.
 * @param {number} props.chefId - The ID of the project leader.
 * @returns {React.Component} - The CollaboratorsModal component.
 */
export default ({ collaborateurs, chefId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const {
        setInvitedColabs,
        invitedColabs,
        colabList,
        handleInviterColabs,
        listSelected,
        deleteColabById,
    } = useProjectCreationContext()

    useEffect(() => {
        if (collaborateurs && collaborateurs.length) {
            setInvitedColabs(collaborateurs)
        }
    }, [collaborateurs, setInvitedColabs])

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const user = useSelector((state) => state.authentificationReducer.user)

    const checkUserIsCDP = (invitedColabs) => {
        const a = invitedColabs?.reduce(
            (acc, colab) => {
                if (colab.email === user.sub) {
                    if (colab.role === "CDP") {
                        acc.check = true
                        acc.user = colab
                    }
                }
                return acc
            },
            { check: false }
        )
        return a
    }

    return (
        <CollaborateursWrapper>
            <CustomModalEdit
                title={<CustomTitleModalEdit>Collaborateurs</CustomTitleModalEdit>}
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                footer={
                    [
                        // <ButtonNoBackground key="nextStep" onClick={handleCancel}>
                        //   Annuler
                        // </ButtonNoBackground>,
                        // <NextStepButton key="validate" onClick={handleOk}>
                        //   Sauvegarder
                        // </NextStepButton>,
                    ]
                }
                styles={{ overflowY: "scroll" }}
                width="50%"
            >
                {colabList && colabList.length ? (
                    <CollaboratorSelect
                        invitedColabs={invitedColabs}
                        colabList={colabList}
                        handleInviterColabs={handleInviterColabs}
                        listSelected={listSelected.colabs}
                        role={listSelected.role}
                        func={listSelected.func}
                        deleteColabById={deleteColabById}
                        isCDP={checkUserIsCDP(invitedColabs)}
                        chefId={chefId}
                        modeCreation={false}
                    />
                ) : (
                    <></>
                )}
            </CustomModalEdit>
            <AddCircle
                data-testid="button"
                height="2rem"
                width="2rem"
                style={{ cursor: "pointer" }}
                onClick={() => setIsModalOpen(true)}
            />
            {invitedColabs.map((collaborateur) => {
                if (collaborateur.hasAvatar) {
                    return <AvatarCustomUrl colab={collaborateur} key={collaborateur?.id} margin="0" />
                } else {
                    return (
                        <WrapperAvatar
                            key={collaborateur?.id}
                            height="2rem"
                            width="2rem"
                            resetMargin={true}
                            src={avatarDefault}
                            title={`${collaborateur?.firstName} ${collaborateur?.lastName}`}
                        />
                    )
                }
            })}
        </CollaborateursWrapper>
    )
}
