/* eslint-disable react-hooks/exhaustive-deps */
/**
 * @file ProjectCreationProvider.js
 * @brief Fornisseur de la création du projet pour l'application
 */
import { createContext, useMemo, useState } from "react";
import {
  addColabByIdForProjectId,
  deleteColabProjectApi,
} from "hooks/apis/ProjetApi";
import { getUsers } from "hooks/queries/queries";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { addContributor, deleteContributor } from "reducers/project/projectReducer";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "validation/Schema";

/** Project Creation Contexte */
export const ProjectCreationContext = createContext({});

export default ({ children }) => {
  const projectId = useSelector((state) => state.projectReducer.projectId);
  const dispatch = useDispatch()

  const queryClient = useQueryClient();
  const [countNumberProjects, setCountNumberProjects] = useState(0);
  const [projectSearchText, setProjectSearchText] = useState("");
  const [sortProjectsByDate, setSortProjectsByDate] = useState(false);
  const [sortProjectsByStatus, setSortProjectsByStatus] = useState(false);
  const [projectsFilter, setProjectsFilter] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [listSelected, setListSelected] = useState({
    role: "",
    colabs: [],
    func: "",
  });
  const [invitedColabs, setInvitedColabs] = useState([]);
  const { data: colabList } = getUsers();
  const [stageStatus, setStageStatus] = useState({
    step1: {
      isActivated: true,
      isFinished: true,
    },
    step2: {
      isActivated: true,
      isFinished: true,
    },
    step3: {
      isActivated: false,
      isFinished: false,
    },
  });
  const user = useSelector((state) => state.authentificationReducer.user);

  const handleSelectColab = (value) => {
    setListSelected({
      ...listSelected,
      colabs: [...listSelected.colabs, value],
    });
  };

  const handleDeselectedColab = (value) => {
    setListSelected({
      ...listSelected,
      colabs: listSelected.colabs.filter((i) => i !== value),
    });
  };

  const onChangeRoleColab = (value) => {
    setListSelected({ ...listSelected, role: value });
  };

  const onChangeFunctionColab = (value) => {
    setListSelected({ ...listSelected, func: value });
  };

  const deleteColabById = (id) => {
    SwalWithBootstrapButtons.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible. Ce collaborateur sera supprimé.",
      showCancelButton: true,
      confirmButtonColor: "#10B581",
      cancelButtonColor: "#C91432",
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setInvitedColabs((prevColabs) => prevColabs.filter((colab) => colab.contributerId !== id));
        if (projectId) {
          deleteColabProjectApi(projectId, id)
            .then((res) => {
              if (res && res.status === 200) {
                queryClient.invalidateQueries(["getMethodesPlanExecution"]);
                dispatch(deleteContributor(id))
              } else {
                console.error("Failed to delete collaborator:", res);
              }
            })
            .catch((error) => {
              console.error("Error deleting collaborator:", error);
            });
        }
      }
    });
  };



  const handleInviterColabs = (listSelected, role, func, modeCreation = false) => {
    const checkSimilar = invitedColabs.reduce(
      (acc, co) => {
        if (listSelected.includes(co.contributerId)) {
          acc["count"]++;
        }
        return acc;
      },
      { count: 0 }
    );

    if (checkSimilar.count > 0) {
      SwalWithBootstrapButtons.fire({
        title: "Oups...",
        text: "Vous avez déjà invité ce(s) collaborateur(s)!",
      });
    } else {
      SwalWithBootstrapButtons.fire({
        title: "Êtes-vous sûr ?",
        text: `Cette action est irréversible. Ce${listSelected.length > 1 ? "s" : ""
          } collaborateur${listSelected.length > 1 ? "s" : ""} ${listSelected.length > 1 ? "seront" : "sera"
          } ajouté${listSelected.length > 1 ? "s" : ""}.`,
        showCancelButton: true,
        confirmButtonColor: "#10B581",
        cancelButtonColor: "#C91432",
        confirmButtonText: "Ajouter",
        cancelButtonText: "Annuler",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const getColabsData = listSelected.map((selectedItemId) => {
            const itemData = colabList.filter(
              (colab) => colab.userId === selectedItemId
            )[0];
            return {
              contributerId: itemData.userId,
              firstName: itemData.userFirstName,
              lastName: itemData.userLastName,
              email: itemData.userEmail,
              job: itemData.userJob,
              isAdmin: itemData.isAdmin,
              role: role,
              func: func,
            };
          });

          setInvitedColabs([...invitedColabs, ...getColabsData]);
          if (projectId) {
            getColabsData.forEach((element) => {
              let formData = new FormData();
              formData.append("contributerId", element.contributerId);
              formData.append("role", element.role);
              formData.append("func", element.func);
              if (!modeCreation) {
                addColabByIdForProjectId(formData, projectId).then((res) => {
                  if (res.status === 200) {
                    queryClient.invalidateQueries(["getMethodesPlanExecution"]);
                    dispatch(addContributor(element))
                  }
                });
              }
            });
          }
        }
      });
    }

    setListSelected(prev => ({ ...prev, colabs: [], role: '', func: '' }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deleteFile = (nameFile) => {
    SwalWithBootstrapButtons.fire({
      title: "Confirmer la suppression du fichier",
      html: `Êtes-vous sûr de vouloir supprimer le fichier <b>${nameFile}</b> ? <br> Cette action est irréversible. `,
      showCancelButton: true,
      confirmButtonColor: "#10B581",
      cancelButtonColor: "#C91432",
      confirmButtonText: "Supprimer",
      confirmButtonAttributes: {
        id: "txt-note",
         innerText: "Supprimer"
      },
      cancelButtonText: "Annuler",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setUploadedFiles(
          uploadedFiles.filter((file) => file.name !== nameFile)
        );
      }
    });
  };

  const onChangeFileUpload = (acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      SwalWithBootstrapButtons.fire({
        title: "Oops...",
        text: "Le type de votre fichier est invalide !",
        confirmButtonColor: "#10B581",
      });

      return;
    }
    const uploadedFile = acceptedFiles[0];
    const existingFileNames = uploadedFiles.map((file) => file.name);

    if (existingFileNames.includes(uploadedFile.name)) {
      SwalWithBootstrapButtons.fire({
        title: "Oops...",
        text: "Vous avez déjà téléchargé ce fichier!",
        confirmButtonColor: "#10B581",
      });
      return 1;
    } else {
      if (
        ALLOWED_FILE_TYPES.includes(uploadedFile.type) &&
        MAX_FILE_SIZE >= uploadedFile.size
      ) {
        setUploadedFiles([...uploadedFiles, uploadedFile]);
        return 1;
      }
      SwalWithBootstrapButtons.fire({
        title: "Oops...",
        text: "La taille ou le type de votre fichier est invalide !",
        confirmButtonColor: "#10B581",
      });
    }
  };

  const canPass = [colabList].every(Boolean);

  const value = useMemo(
    () => ({
      countNumberProjects,
      setCountNumberProjects,
      projectSearchText,
      setProjectSearchText,
      sortProjectsByDate,
      setSortProjectsByDate,
      sortProjectsByStatus,
      setSortProjectsByStatus,
      projectsFilter,
      setProjectsFilter,
      invitedColabs,
      uploadedFiles,
      listSelected,
      setUploadedFiles,
      setInvitedColabs,
      setListSelected,
      deleteColabById,
      handleSelectColab,
      handleDeselectedColab,
      onChangeRoleColab,
      onChangeFunctionColab,
      deleteFile,
      colabList,
      handleInviterColabs,
      onChangeFileUpload,
      stageStatus,
      projectId,
      setStageStatus,
      user,
    }),
    [
      countNumberProjects,
      setCountNumberProjects,
      projectSearchText,
      setProjectSearchText,
      sortProjectsByDate,
      setSortProjectsByDate,
      sortProjectsByStatus,
      setSortProjectsByStatus,
      projectsFilter,
      setProjectsFilter,
      invitedColabs,
      uploadedFiles,
      listSelected,
      setUploadedFiles,
      setInvitedColabs,
      setListSelected,
      deleteColabById,
      handleSelectColab,
      handleDeselectedColab,
      onChangeRoleColab,
      onChangeFunctionColab,
      deleteFile,
      colabList,
      handleInviterColabs,
      onChangeFileUpload,
      stageStatus,
      projectId,
      setStageStatus,
      user,
    ]
  );

  return (
    <>
      {canPass && (
        <ProjectCreationContext.Provider value={value}>
          {children}
        </ProjectCreationContext.Provider>
      )}
    </>
  );
};
