/**
 * @file ModalAddContributor.js
 * @brief Exports the ModalAddContributor.js.
 */
import { useEffect, useState } from "react";
import { Plus } from "assets/icons";
import { CustomModalEdit, CustomTitleModalEdit } from "components/Modal/Modal";
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext";
import CollaboratorSelect from "pages/ProjectCreation/FormProjectCreation/CollaboratorSelect/CollaboratorSelect";
import { useSelector } from "react-redux";
import { base } from "theme/base";
import { t } from "utils/translationUtils";

import { AddSection } from "./FilesTable";

/**
 * @var ModalAddContributor
 * @brief ModalAddContributor.
 */
export default ({ collaborateurs, chefId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  /**
   * @brief Select the current user from the authentication reducer in the Redux store.
   */
  const curentUser = useSelector(
    (state) => state.authentificationReducer?.user
  );

  const {
    setInvitedColabs,
    invitedColabs,
    colabList,
    handleInviterColabs,
    listSelected,
    deleteColabById,
  } = useProjectCreationContext();

  useEffect(() => {
    if (collaborateurs && collaborateurs.length) {
      setInvitedColabs(collaborateurs);
    }
  }, [collaborateurs, setInvitedColabs]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const user = useSelector((state) => state.authentificationReducer.user);

  const checkUserIsCDP = (invitedColabs) => {
    const a = invitedColabs?.reduce(
      (acc, colab) => {
        if (colab.email === user.sub) {
          if (colab.role === "CDP") {
            acc.check = true;
            acc.user = colab;
          }
        }
        return acc;
      },
      { check: false }
    );
    return a;
  };

  return (
    <>
      <CustomModalEdit
        title={
          <CustomTitleModalEdit>
            {t("projectDashboard.addContributorModal.contributors")}
          </CustomTitleModalEdit>
        }
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
      {curentUser.id === chefId ? (
        <AddSection onClick={() => setIsModalOpen(true)}>
          <Plus
            id="plus-ajout-collaborateur"
            height="18px"
            width="18px"
            fill={base.colors.primaires.blue}
            style={{ margin: "5px 0px 5px 5px" }}
          />
          <span
            id="projet-ajout-collaborateur"
            style={{
              fontSize: base.fontSizes.Deci,
              color: base.colors.primaires.blue,
              margin: "5px 5px 5px 0px",
            }}
          >
            {t("projectDashboard.addContributorModal.addContributors")}
          </span>
        </AddSection>
      ) : (
        ""
      )}
    </>
  );
};
