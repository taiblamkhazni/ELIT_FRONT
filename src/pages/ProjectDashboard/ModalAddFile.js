/**
 * @file ModalAddFile.js
 * @brief Exports the ModalAddFile.js.
 */
import { useState } from "react";
import { Plus } from "assets/icons";
import { BlockButton, NextStepButton } from "components/Button/Button";
import { CustomModalEdit, CustomTitleModalEdit } from "components/Modal/Modal";
import { getProjetById } from "hooks/apis/ProjetApi";
import { addFilesToProjectByIdQuery } from "hooks/queries/queries";
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext";
import FileInputForm from "pages/ProjectCreation/FormProjectCreation/FileInputForm/FileInputForm";
import { useDispatch, useSelector } from "react-redux";
import { getAttachementsProjectById } from "reducers/project/projectReducer";
import { base } from "theme/base";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";
import { t } from "utils/translationUtils";

import { AddSection } from "./FilesTable";

/**
 * @var ModalAddFile
 * @brief ModalAddFile.
 */
const ModalAddFile = ({ chefId }) => {
  /**
   * @brief Select the current user from the authentication reducer in the Redux store.
   */
  const curentUser = useSelector(
    (state) => state.authentificationReducer?.user
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { uploadedFiles, onChangeFileUpload, setUploadedFiles, projectId } =
    useProjectCreationContext();

  const { mutateAsync: addFiles } = addFilesToProjectByIdQuery();
  const dispatch = useDispatch();
  const handleOk = async () => {
    const result = await SwalWithBootstrapButtons.fire({
      title: t("projectDashboard.addFileModal.confirm.title"),
      text: t("projectDashboard.addFileModal.confirm.text"),
      showCancelButton: true,
      cancelButtonColor: "#C91432",
      confirmButtonColor: "#10B581",
      confirmButtonText: t(
        "projectDashboard.addFileModal.confirm.confirmButton"
      ),
      cancelButtonText: t("projectDashboard.addFileModal.confirm.cancelButton"),
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const projectData = await getProjetById(projectId);

      if (projectData && projectData.attachments) {
        const existingFileNames = projectData.attachments.map(
          (file) => file.fileName
        );
        const newFileNames = uploadedFiles.map((file) => file.name);

        const duplicates = newFileNames.filter((name) =>
          existingFileNames.includes(name)
        );

        if (duplicates.length > 0) {
          await SwalWithBootstrapButtons.fire({
            title: t("projectDashboard.addFileModal.error.title"),
            text: t("projectDashboard.addFileModal.error.text"),
            confirmButtonColor: "#10B581",
          });
          return;
        }
      }

      let data = new FormData();
      uploadedFiles.forEach((file) => data.append("files", file));

      const resultUpload = await addFiles([projectId, data]);
      setUploadedFiles([]);
      setIsModalOpen(false);
      if (resultUpload?.status === 200)
        dispatch(getAttachementsProjectById(projectId));
    }
  };

  const handleCancel = () => {
    setUploadedFiles([]);

    setIsModalOpen(false);
  };
  return (
    <>
      <CustomModalEdit
        title={
          <CustomTitleModalEdit>
            {t("projectDashboard.addFileModal.text")}
          </CustomTitleModalEdit>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={[
          uploadedFiles.length > 0 ? (
            <NextStepButton key="validate" onClick={handleOk}>
              {t("projectDashboard.addFileModal.saveButton")}
            </NextStepButton>
          ) : (
            <BlockButton key="validate">
              {t("projectDashboard.addFileModal.saveButton")}
            </BlockButton>
          ),
        ]}
        styles={{ overflowY: "scroll" }}
        width="50%"
      >
        {/* {uploadedFiles && uploadedFiles.length && ( */}
        <FileInputForm
          onChangeFileUpload={onChangeFileUpload}
          uploadedFiles={uploadedFiles}
          projectCreation={false}
        />
        {/* )} */}
      </CustomModalEdit>
      {curentUser?.id == chefId ? (
        <AddSection onClick={() => setIsModalOpen(true)}>
          <Plus
            id="plus-ajout-fichier"
            height="18px"
            width="18px"
            fill={base.colors.primaires.blue}
            style={{ margin: "5px 0px 5px 5px" }}
          />
          <span
            id="analyse-ajout-fichier"
            style={{
              fontSize: base.fontSizes.Deci,
              color: base.colors.primaires.blue,
              margin: "5px 5px 5px 0px",
            }}
          >
            {t("projectDashboard.addFileModal.addFile")}
          </span>
        </AddSection>
      ) : (
        ""
      )}
    </>
  );
};

export default ModalAddFile;
