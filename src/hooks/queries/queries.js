/**
 * @file queries.js
 * @brief Exports the querys.
 */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  GetAnalyseMulticriteByProjectId,
  IncreaseAnalyseMulticrite,
  UpdateAnalyseMulticrite,
} from "hooks/apis/AnalyseMulticritereApi";
import {
  createAnalysePrevisibilite,
  getAllVotesByAnalysePrevisibilityId,
  getResultPrevisibilite,
  updateVoteById,
} from "hooks/apis/AnalysePrevisibiliteApi";
import {
  AddCommentBrainstorming,
  DeleteCommentByCommentId,
  GetBrainStormingByIdAL,
  GetBrainStormingResumeByIdAL,
  ModifQuestionMulticritere,
  ModifyCommentBrainstorming,
  ValidateCommentBrainstorming,
} from "hooks/apis/Brainstorming";
import {
  addFilesToProjectById,
  deleteFileApi,
  renommerNameFileApi,
} from "hooks/apis/FileApi";
import {
  getMethodesPlanExecution,
  getQuestionsPlanExecution,
  postVotePlanExecution,
} from "hooks/apis/PlanExecutionApi";
import {
  deleteColabProjectApi,
  deleteProjectApi,
  getProjectsNewApi,
  getProjetById,
  postProjectApi,
  validationProjectApi,
} from "hooks/apis/ProjetApi";
import { getReportsApi } from "hooks/apis/ReportApi";
import { getUsersApi, getUsersByKeywordApi } from "hooks/apis/UserApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  SwalSnackBarSuccessProject,
  SwalWithBootstrapButtons,
} from "utils/Swal/SwalComponents";

/**
 * BEGIN -- project APIs
 */
/**
 * @var addNewProject
 * @brief addNewProject.
 */
export const addNewProject = () => {
  const queryClient = useQueryClient();

  return useMutation(postProjectApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(["projectsNewApi"]);

      SwalWithBootstrapButtons.fire({
        confirmButtonColor: "#3085d6",
        text: "Votre projet a été enregistré avec succès !",
      });
    },
  });
};
/**
 * @var deleteProject
 * @brief deleteProject.
 */
export const deleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProjectApi, {
    onSuccess: () => {
      SwalWithBootstrapButtons.fire(
        "Projet supprimé!",
        "Votre projet a été supprimé."
        // "success"
      ).then(() => {
        queryClient.invalidateQueries(["projectsNewApi"]);
      });
    },
  });
};
/**
 * @var validateProject
 * @brief validateProject.
 */
export const validateProject = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ([projectId, status]) => {
      validationProjectApi(projectId, status);
    },
    {
      onSuccess: () => {
        SwalWithBootstrapButtons.fire(
          "Projet confirmé",
          "Le projet a été confirmé avec succès."
          // "success"
        ).then(() => {
          queryClient.invalidateQueries(["projects"]);
        });
      },
    }
  );
};
/**
 * @var deleteColabProjectApiQuery
 * @brief deleteColabProjectApiQuery.
 */
export const deleteColabProjectApiQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ([projectId, collabId]) => {
      deleteColabProjectApi(projectId, collabId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getMethodesPlanExecution"]);
      },
    }
  );
};
/**
 * END -- project APIs
 */

/**
 * BEGIN -- users APIs
 */
/**
 * @var getUsers
 * @brief getUsers.
 */
export const getUsers = () =>
  useQuery("users", getUsersApi, {
    staleTime: 100000,
  });
/**
 * @var getUsersByKeyword
 * @brief getUsersByKeyword.
 */
export const getUsersByKeyword = (keyword) =>
  useQuery(["usersbykey", keyword], () => getUsersByKeywordApi(keyword));
/**
 * END -- users APIs
 */

/**
 * BEGIN -- Analyse multicrite APIs
 */
/**
 * @var getAnalyeMulticriteByProjectId
 * @brief getAnalyeMulticriteByProjectId.
 */
export const getAnalyeMulticriteByProjectId = (projectId) =>
  useQuery(["analyseMulticriteByProjectId", projectId], () =>
    GetAnalyseMulticriteByProjectId(projectId)
  );
/**
 * @var updateAnalyseMulticriteQuery
 * @brief updateAnalyseMulticriteQuery.
 */
export const updateAnalyseMulticriteQuery = () => {
  return useMutation(UpdateAnalyseMulticrite);
};
/**
 * @var IncreaseAnalyseMulticriteQuery
 * @brief IncreaseAnalyseMulticriteQuery.
 */
export const IncreaseAnalyseMulticriteQuery = () => {
  return useMutation(IncreaseAnalyseMulticrite);
};

/**
 * END -- Analyse multicrite APIs
 */

/**
 * BEGIN -- File APIs
 */
/**
 * @var deleteFileById
 * @brief deleteFileById.
 */
export const deleteFileById = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ([attachementId, projectId]) => {
      const response = await deleteFileApi(attachementId, projectId);
      if (response?.status === 200) {
        return response;
      }
    },
    {
      onSuccess: () => {
        SwalWithBootstrapButtons.fire(
            'Fichier supprimé!',
            'Ce fichier a été supprimé.'
        ).then(() => {
            queryClient.invalidateQueries(['projectsById']);
        });
    },
    }
  );
};


/**
 * @var renommerNameFileQuery
 * @brief renommerNameFileQuery.
 */
export const renommerNameFileQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ([id, data]) => {
      renommerNameFileApi(id, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projectsById"]);
        SwalWithBootstrapButtons.fire({
          text: "Ce fichier a été renommé avec succès.",
        });
      },
    }
  );
};
/**
 * @var addFilesToProjectByIdQuery
 * @brief addFilesToProjectByIdQuery.
 */
export const addFilesToProjectByIdQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ([projetId, formData]) =>
      await addFilesToProjectById(projetId, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projectsById"]);
        SwalWithBootstrapButtons.fire({
          text: "Ces fichiers ont été ajoutés avec succès.",
        });
      },
    }
  );
};

/**
 * END -- file APIs
 */

/**
 * BEGIN -- Analyse prévisibilité APIs
 */
/**
 * @var createAnalysePrevisibiliteQuery
 * @brief createAnalysePrevisibiliteQuery.
 */
export const createAnalysePrevisibiliteQuery = () => {
  return useMutation(createAnalysePrevisibilite);
};
/**
 * @var getResultPrevisibiliteQuery
 * @brief getResultPrevisibiliteQuery.
 */
export const getResultPrevisibiliteQuery = (analyseId, projectId) =>
  useQuery(["projectsById", projectId, "analyseById", analyseId], () =>
    getResultPrevisibilite(analyseId, projectId)
  );

/**
 * END -- Analyse prévisibilité APIs
 */

/**
 * BEGIN -- Projet new APIs
 */
/**
 * @var getProjetByIdQuery
 * @brief getProjetByIdQuery.
 */
export const getProjetByIdQuery = (projectId) =>
  useQuery(["projectsById", projectId], () => getProjetById(projectId));
/**
 * @var getProjetsNewApiQuery
 * @brief getProjetsNewApiQuery.
 */
export const getProjetsNewApiQuery = () =>
  useQuery("projectsNewApi", getProjectsNewApi, {
    refetchInterval: 1 * 60 * 1000,
  });

/**
 * END -- Analyse prévisibilité APIs
 */

/**
 * BEGIN -- Vote APIs
 */
/**
 * @var getAllVotesByAnalysePrevisibilityIdQuery
 * @brief getAllVotesByAnalysePrevisibilityIdQuery.
 */
export const getAllVotesByAnalysePrevisibilityIdQuery = (id, projectId) =>
  useQuery(["allVotes", id, "projectById", projectId], () =>
    getAllVotesByAnalysePrevisibilityId(id, projectId)
  );
/**
 * @var updateVoteByIdQuery
 * @brief updateVoteByIdQuery.
 */
export const updateVoteByIdQuery = (role) => {
  const queryClient = useQueryClient();
  return useMutation(
    ([voteId, payload, projectId]) => {
      updateVoteById(voteId, payload, projectId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["allVotes"]);
        if (role === "Chef de projet") {
          SwalSnackBarSuccessProject.fire({
            text: "Vos réponses ont été enregistrées, vous pouvez lancer l'analyse si vous le souhaitez",
          });
        } else {
          SwalSnackBarSuccessProject.fire({
            text: "Vos réponses ont été enregistrées",
          });
        }
      },
    }
  );
};

/**
 * END -- Vote APIs
 */

/**
 * BEGIN -- Brainstorming APIs
 */
/**
 * @var GetBrainStormingByIdALQuery
 * @brief GetBrainStormingByIdALQuery.
 */
export const GetBrainStormingByIdALQuery = (idAL, projectId) =>
  useQuery(["getBrainstorming", idAL, "projectById", projectId], () =>
    GetBrainStormingByIdAL(idAL, projectId)
  );
/**
 * @var DeleteCommentByCommentIdQuery
 * @brief DeleteCommentByCommentIdQuery.
 */
export const DeleteCommentByCommentIdQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ([payload, projectId]) => {
      DeleteCommentByCommentId(payload, projectId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getBrainstorming"]);
        SwalWithBootstrapButtons.fire({
          text: "Votre commentaire a été supprimé.",
        });
      },
    }
  );
};
/**
 * @var AddComment
 * @brief AddComment.
 */
export const AddComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ([payload, projectId]) => {
      AddCommentBrainstorming(payload, projectId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getBrainstorming"]);
      },
    }
  );
};
/**
 * @var ModifyComment
 * @brief ModifyComment.
 */
export const ModifyComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ([payload, projectId]) => {
      ModifyCommentBrainstorming(payload, projectId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getBrainstorming"]);
      },
    }
  );
};
/**
 * @var ValidateCommentQuery
 * @brief ValidateCommentQuery.
 */
export const ValidateCommentQuery = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ([brainstormingId, payload, projectId]) => {
      ValidateCommentBrainstorming(brainstormingId, payload, projectId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getBrainstorming"]);
      },
    }
  );
};
/**
 * @var ModifyQuestionMultiQuery
 * @brief ModifyQuestionMultiQuery.
 */
export const ModifyQuestionMultiQuery = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ([payload, projectId]) => {
      ModifQuestionMulticritere(payload, projectId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getBrainstorming"]);
        SwalWithBootstrapButtons.fire({
          title: "Mise à jour",
          text: "Votre question a été modifié.",
        });
      },
    }
  );
};

/**
 * END -- Brainstorming APIs
 */

/**
 * BEGIN -- Plan d'execution APIs
 */
/**
 * @var GetBrainStormingResumeByPrevIdQuery
 * @brief GetBrainStormingResumeByPrevIdQuery.
 */
export const GetBrainStormingResumeByPrevIdQuery = (prevId, projectId) =>
  useQuery(["getBrainstormingResume", prevId, "projectById", projectId], () =>
    GetBrainStormingResumeByIdAL(prevId, projectId)
  );
/**
 * @var getQuestionsPlanExecutionQuery
 * @brief getQuestionsPlanExecutionQuery.
 */
export const getQuestionsPlanExecutionQuery = (idPE, projectId) =>
  useQuery(["getQuestionPlanExecution", idPE, "projectById", projectId], () =>
    getQuestionsPlanExecution(idPE, projectId)
  );
/**
 * @var getMethodesPlanExecutionQuery
 * @brief getMethodesPlanExecutionQuery.
 */
export const getMethodesPlanExecutionQuery = (idPE, projectId) =>
  useQuery(["getMethodesPlanExecution", idPE, "projectById", projectId], () =>
    getMethodesPlanExecution(idPE, projectId)
  );
/**
 * @var postVotePlanExecutionQuery
 * @brief postVotePlanExecutionQuery.
 */
export const postVotePlanExecutionQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(postVotePlanExecution, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getMethodesPlanExecution"]);
    },
  });
};

/**
/**
 * @var getReportsByProjectId
 * @brief getReportsByProjectId.
 */
export const getReportsByProjectId = (projectId) =>
  useQuery(["reportsByProjectId", projectId], () => getReportsApi(projectId));

/**
 * END -- Reports APIs
 */
