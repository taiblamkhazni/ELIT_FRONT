/**
 * @file ModalProjectCreation.js
 * @brief Ce fichier contient le code pour le composant 'ModalProjectCreation' qui gère la création de projets.
 */
import { Fragment, useCallback, useEffect, useState } from "react";
import { Row } from "antd";
import X from "assets/icons/symbols/x";
import {
  BlockButton,
  ButtonNoBackground,
  NextStepButton,
} from "components/Button/Button";
import { StructureGrid } from "components/Grid/Grid";
import { CustomModal, CustomTitleModalH2 } from "components/Modal/Modal";
import CustomSteps from "components/Steps/Steps";
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getNewPlanExecutionSuccess, setIdPlanExecution } from "reducers/executionPlan/executionPlanReducer";
import { setIsIteration2AP } from "reducers/multicriteriaAnalysis/multicriteriaAnalysisReducer";
import { setIsBrainStorming } from "reducers/previsibilityAnalysis/previsibilityAnalysisReducer";
import { closeProjectCreationModalPlus, postNewProjectFetch } from "reducers/projects/projectsReducer";
import { capitalizeFirstLetter } from "utils/effects/effects";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";
import { t } from "utils/translationUtils";
import {
  projectCreationValidationSchema, projectCreationValidationSchemaDefaultValues
} from "validation/Schema";

import { yupResolver } from "@hookform/resolvers/yup";

import CollaboratorSelect from "../FormProjectCreation/CollaboratorSelect/CollaboratorSelect";
import FileInputForm from "../FormProjectCreation/FileInputForm/FileInputForm";
import GeneralInfoForm from "../FormProjectCreation/GeneralInfoForm/GeneralInfoForm";

import CreateProjectButton from "./CreateProjectButton/CreateProjectButton";

/**
 * @brief Définit les étapes pour la création d'un projet.
 */
const steps = [
  {
    title: t('projectCreation.creationModal.steps.description'),
    position: 1,
    id: "texte_decrire_projet"
  },
  {
    title: t('projectCreation.creationModal.steps.import'),
    position: 2,
    id: "texte_import_fichier"
  },
  {
    title: t('projectCreation.creationModal.steps.addCollaborator'),
    position: 3,
    id: "collaborators-step-title"
  }
];

/**
  * @brief Render project creation modal
  * @returns renderFormBasedOnCurrentStep component.
  **/
export default ({
  hideButton = false,
  isVisibleFromExternalButton,
  setIsVisibleFromExternalButton,
}) => {

  /**
   * @brief Initialisation des variables d'état
   */
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generalFormData, setGeneralFormData] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);
  const {
    invitedColabs,
    uploadedFiles,
    setUploadedFiles,
    setInvitedColabs,
    colabList,
    listSelected,
    deleteColabById,
    handleInviterColabs,
    onChangeFileUpload,
  } = useProjectCreationContext();
  const user = useSelector((state) => state.authentificationReducer.user);
  const showMessageCreationModalPlus = useSelector(state => state.projectsReducer.showMessageCreationModalPlus);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(projectCreationValidationSchema),
    defaultValues: projectCreationValidationSchemaDefaultValues,
    mode: "onChange",
  });
  /**
 * @brief Function to show modal
 **/
  const showModal = useCallback(() => {
    dispatch(setIsBrainStorming(false));
    dispatch(setIsIteration2AP(false));
    setIsModalOpen(true);
  }, [dispatch]);

  /**
   * @brief Function to close modal
   */
  const handleOk = useCallback(() => {
    setIsModalOpen(false);
    dispatch(closeProjectCreationModalPlus());
    dispatch(setIsBrainStorming(false));
    dispatch(setIsIteration2AP(false));
  }, [dispatch]);

  /**
   * @brief Function to cancel project creation
   */
  const handleCancel = () => {
    SwalWithBootstrapButtons.fire({
      title: t('projectCreation.creationModal.handleCancel.title'),
      text: t('projectCreation.creationModal.handleCancel.text'),
      showCancelButton: true,
      confirmButtonColor: "#10B581",
      cancelButtonColor: "#C91432",
      confirmButtonText: t('projectCreation.creationModal.handleCancel.confirmButton'),
      cancelButtonText: t('projectCreation.creationModal.handleCancel.cancelButton'),
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setCurrent(0);
        setIsModalOpen(false);
        setUploadedFiles([]);
        setInvitedColabs([]);
        reset();
        if (hideButton) {
          setIsVisibleFromExternalButton(false);
        }
        dispatch(closeProjectCreationModalPlus());
      }
    });
  };
  /**
   * @brief Effect to handle the visibility of the modal from an external button
   **/
  useEffect(() => {
    if (hideButton) {
      setIsModalOpen(isVisibleFromExternalButton);
    }
  }, [hideButton, isVisibleFromExternalButton]);


  useEffect(() => {
    // Appeler showModal si isPlus est true
    if (showMessageCreationModalPlus) {
      showModal();
    } else {
      handleOk();
    }
  }, [handleOk, showMessageCreationModalPlus, showModal]);


  /**
   * @brief Function to handle next step
   */
  const handleNextStep = () => {
    setCurrent(current + 1);
  };

  /**
   * @brief Function to handle back step
   **/
  const handleBackStep = () => {
    setCurrent(current - 1);
  };

  /**
   * @brief Function to replace nested ternary operation for the ButtonNoBackground component in Row element.
   */
  const renderPreviousButton = (currentStep) => {
    if (currentStep === 1 || currentStep === 2) {
      return (
        <ButtonNoBackground id="import-files-precedent-btn" key="back" onClick={() => handleBackStep()}>
          {t('projectCreation.creationModal.previousStep')}
        </ButtonNoBackground>
      );
    }
    return <></>;
  };

  /**
   * @brief Function to replace nested ternary operation for the NextButton component in Row element
   **/
  const renderNextButton = () => {
    if (Object.keys(errors).length !== 0) {
      return (
        <BlockButton id="next-step" key="submit" type="primary" disabled>
          {t('projectCreation.creationModal.nextStep')}
        </BlockButton>
      );
    } else {
      if (current === 0) {
        return (
          <NextStepButton
            id="next-step"
            key="submit"
            type="primary"
            onClick={handleSubmit((data) => {
              if (data) {
                setGeneralFormData(data);
                handleNextStep();
              }
            })}
            disabled={!isValid}
          >
            {t('projectCreation.creationModal.nextStep')}
          </NextStepButton>
        );
      }
      if (current === 1) {
        return uploadedFiles.length > 0 ? (
          <NextStepButton id='import-files-suivant-btn-valid' key="submit" type="primary" onClick={handleNextStep}>
            {t('projectCreation.creationModal.nextStep')}
          </NextStepButton>
        ) : (
          <BlockButton id='import-files-suivant-btn' key="submit" type="primary" disabled>
            {t('projectCreation.creationModal.nextStep')}
          </BlockButton>
        );
      }

      if (current === 2) {
        return (
          <NextStepButton
            id='projet-confirmation-creation'
            key="submit"
            type="primary"
            onClick={() => {
              let formData = new FormData();
              formData.append("name", generalFormData.name);
              formData.append("description", generalFormData.description);

              invitedColabs.forEach((colab, index) => {
                formData.append(
                  `contributers[${index}].contributerId`,
                  colab.contributerId
                );
                formData.append(
                  `contributers[${index}].role`,
                  capitalizeFirstLetter(colab.role)
                );
                formData.append(
                  `contributers[${index}].func`,
                  capitalizeFirstLetter(colab.func)
                );
              });

              uploadedFiles.forEach((file, index) => {
                let fileDescriptionLabel = `file_${index}`;
                formData.append("files", file);
                formData.append(
                  "filesDescription",
                  generalFormData[fileDescriptionLabel] || " "
                );
              });
              dispatch(postNewProjectFetch(formData));
              dispatch(setIdPlanExecution(null))
              dispatch(getNewPlanExecutionSuccess(null))
              setCurrent(0);
              setIsModalOpen(false);
              setUploadedFiles([]);
              setInvitedColabs([]);
              dispatch(closeProjectCreationModalPlus());
              reset();
            }}
          >
            {t('projectCreation.creationModal.createProject')}
          </NextStepButton>
        );
      }
    }

    return null;
  };

  /**
   * @brief Render form based on the current step
   **/
  const renderFormBasedOnCurrentStep = (current) => {
    if (current === 0) {
      return (
        <GeneralInfoForm
          control={control}
          errors={errors}
          acceptTerms={acceptTerms}
          setAcceptTerms={setAcceptTerms}
        />
      );
    } else if (current === 1) {
      return (
        <FileInputForm
          onChangeFileUpload={onChangeFileUpload}
          uploadedFiles={uploadedFiles}
        />
      );
    } else if (current === 2) {
      return (
        <CollaboratorSelect
          invitedColabs={invitedColabs}
          colabList={colabList}
          handleInviterColabs={handleInviterColabs}
          listSelected={listSelected.colabs}
          role={listSelected.role}
          func={listSelected.func}
          deleteColabById={deleteColabById}
          isCDP={{ check: true }}
          modeCreation={true}
          functionCollab={listSelected.role}
        />
      );
    }
    return <></>;
  };
  return (
    <Fragment>
      <CustomModal
        title={
          <>
            <CustomTitleModalH2 id="modal-title">
              {t('projectCreation.creationModal.title')}
            </CustomTitleModalH2>
          </>
        }
        maskClosable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={<X id="close-modal-project" fill="#000" />}
        width={684}
        footer={
          <StructureGrid
            spanLeft={12}
            leftChild={
              <Row justify="start">{renderPreviousButton(current)}</Row>
            }
            spanRight={12}
            rightChild={<Row justify="end">{renderNextButton()}</Row>}
          />

        }
      >
        <>
          <CustomSteps current={current} steps={steps} />
        </>
        {renderFormBasedOnCurrentStep(current)}
      </CustomModal>
      {!hideButton && user?.roles?.find((role) => role === "USER") && !showMessageCreationModalPlus && (
        <CreateProjectButton type="primary" onClick={showModal}>
          {t('projectCreation.creationModal.startCreation')}
        </CreateProjectButton>
      )}
    </Fragment>
  );
};
