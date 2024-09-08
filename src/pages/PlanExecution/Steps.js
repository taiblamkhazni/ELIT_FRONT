/**
 * @file Steps.js
 * @brief Exports the Steps.js.
 */
import { useEffect, useState } from "react";
import { InfoWrapper } from "components/Info/Info";
import CustomSteps from "components/Steps/Steps";
import {
  getSurveyAnswersByUserId,
  postVotePlanExecution,
  updateStatusPlanExecution,
} from "hooks/apis/PlanExecutionApi";
import PropTypes from "prop-types"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getListQuestionsFetch,
  getMethodologiesArrayFetch,
  getResultsFetch,
  setCurrent,
  setIsFinishedPlanExecu,
  setIsLoadingReport,
} from "reducers/executionPlan/executionPlanReducer";
import ROUTES from "routes/routes";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";

import HeaderDescription from "./Header/HeaderDescription";
import ConstraintsQuestions from "./ConstraintsQuestions";
import { Footer } from "./Footer";
import MethodologiesPresentation from "./MethodologiesPresentation";
import { choosenMethodologyFunction } from "./Resultat";


/**
 * @var reports
 * @brief reports.
 */
const reports = [
  {
    step: "Analyse multicritère",
    type: "multicriteria_report",
  },
  {
    step: "Choix de la méthodologie",
    type: "predictibility_report",
  },
];
/**
 * @constant phases - Array of objects representing the phases of the steps.
 * Each object contains a title and a position.
 **/
const phases = [
  {
    title: <InfoWrapper>Contraintes projet</InfoWrapper>,
    position: 1,
  },
  {
    title: <InfoWrapper>Vote</InfoWrapper>,
    position: 2,
  },
];


/**
 * @var default
 * @brief default.
 */
export const Steps = ({ checkChefDeProjet, projectData, currentUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projectId = useSelector((state) => state.projectReducer.projectId);
  const current = useSelector((state) => state.executionPlanReducer.current);
  const methodologies = useSelector(
    (state) => state.executionPlanReducer.methodologiesArray
  );

  const methodologiesPreviAna = useSelector(
    (state) => state.previsibilityAnalysisReducer.methodologies
  );

  const methodologieChoosed = choosenMethodologyFunction(methodologiesPreviAna)
    ?.elementHavingMax.name;

  const voteMethod = useSelector(
    (state) => state.executionPlanReducer.voteMethod
  );

  const { contributors } = projectData;

  const idPlanExecution = useSelector(
    (state) => state.executionPlanReducer.idPlanExecution
  );

  const vote2MethodsHyBrid = useSelector(
    (state) => state.executionPlanReducer.vote2MethodsHyBrid
  );
  const [isVoted, setIsVoted] = useState(false);
  const formValidations = [
    { current: 1, validation: useForm({ mode: "onChange" }) },
    { current: 2, validation: useForm({ mode: "onChange" }) },
  ];

  const contributorsWithoutObservator = contributors.filter(
    (c) => c.role !== "Observateur"
  );
  useEffect(() => {
    if (idPlanExecution) {
      dispatch(getListQuestionsFetch({ idPE: idPlanExecution, projectId }));
      dispatch(
        getMethodologiesArrayFetch({ idPE: idPlanExecution, projectId })
      );
    }
  }, [idPlanExecution, projectId, dispatch]);

  useEffect(() => {
    if (methodologies) {
      methodologies.forEach((data) => {
        const adminChecked = data.votes?.filter(
          (e) => e.userId === currentUser.contributerId
        )[0];
        if (adminChecked) {
          setIsVoted(true);
        }
      });

    }
  }, [methodologies, idPlanExecution, currentUser.contributerId]);
  /**
   * @brief Retrieves validation rules based on the current step.
   * @param current The current step of the form.
   * @return Validation rule if current step is 3 or below, otherwise null.
   */
  const getValidationByCurrent = (current) => {
    if (current) {
      if (current <= 3) {
        return formValidations.find((v) => v.current === current).validation;
      }
    }

    return null;
  };


  const validation = current <= 2 ? getValidationByCurrent(current) : null;
  const onSubmitVote = () => {
    if (methodologieChoosed !== "HYBRID") {
      if (voteMethod.length > 0) {
        SwalWithBootstrapButtons.fire({
          title: "Êtes-vous sûr?",
          text: "Cette action est irréversible ! Votre votre sera validé définitivement",
          showCancelButton: true,
          cancelButtonColor: "#C91432",
          confirmButtonColor: "#10B581",
          confirmButtonText: "Valider",
          cancelButtonText: "Annuler",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            setIsVoted(true);
            const payload = {
              executionPlanId: idPlanExecution,
              methodId: parseInt(voteMethod[0]),
            };

            postVotePlanExecution(payload, projectId).then(
              (res) => {
                if (res && res.status === 200) {
                  dispatch(
                    getMethodologiesArrayFetch({
                      idPE: idPlanExecution,
                      projectId,
                    })
                  );
                }
              }
            );
          }
        });
      } else {
        SwalWithBootstrapButtons.fire({
          title: "Vous ne choissiez pas encore votre votre?",
          text: "Il faut choisir la méthode avant de voter?",
          confirmButtonColor: "#10B581",
          confirmButtonText: "D'accord",
          reverseButtons: true,
        });
      }
    } else {
      if (vote2MethodsHyBrid.length > 0) {
        if (vote2MethodsHyBrid.length === 2) {
          SwalWithBootstrapButtons.fire({
            title: "Êtes-vous sûr?",
            text: "Cette action est irréversible ! Votre votre sera validé définitivement",
            showCancelButton: true,
            cancelButtonColor: "#C91432",
            confirmButtonColor: "#10B581",
            confirmButtonText: "Valider",
            cancelButtonText: "Annuler",
            reverseButtons: true,
          }).then((result) => {
            if (result.isConfirmed) {
              setIsVoted(true);
              const payload = {
                executionPlanId: idPlanExecution,
                methodId: parseInt(vote2MethodsHyBrid[0]),
                methodId2ForHybrid: parseInt(vote2MethodsHyBrid[1]),
              };

              postVotePlanExecution(payload, projectId).then(
                (res) => {
                  if (res && res.status === 200) {
                    dispatch(
                      getMethodologiesArrayFetch({
                        idPE: idPlanExecution,
                        projectId,
                      })
                    );
                  }
                }
              );
            }
          });
        } else {
          SwalWithBootstrapButtons.fire({
            title: "Votes invalidés",
            text: "Il faut avoir 2 votes",
            confirmButtonColor: "#10B581",
            confirmButtonText: "D'accord",
            reverseButtons: true,
          });
        }
      } else {
        SwalWithBootstrapButtons.fire({
          title: "Vous ne choissiez pas encore votre vote?",
          text: "Il faut choisir la méthode avant de vote?",
          confirmButtonColor: "#10B581",
          confirmButtonText: "D'accord",
          reverseButtons: true,
        });
      }
    }

  };
  const getCollaboratorsWithoutVotes = (methodologies, contributors) => {
    const votedUserIds = methodologies.flatMap((m) => m.votes.map((v) => v.userId));
    return contributors.filter((c) => c.role !== "Observateur" && !votedUserIds.includes(c.contributerId));
  };

  const onLancer = () => {
    const collaboratorsWithoutVotes = getCollaboratorsWithoutVotes(methodologies, contributorsWithoutObservator);
    if (collaboratorsWithoutVotes.length > 0) {
      const names = collaboratorsWithoutVotes.map(c => `<strong>[${c.lastName.toUpperCase()} ${c.firstName}]</strong>`).join(", ");
      SwalWithBootstrapButtons.fire({
        title: "Collaborateurs non votants",
        html: `${names} ${collaboratorsWithoutVotes.length > 1 ? 
            "n'ont pas encore renseigné leurs réponses" : 
            "n'a pas encore renseigné ses réponses"}. Voulez-vous tout de même lancer l'analyse ?`,
        showCancelButton: true,
        cancelButtonColor: "#C91432",
        confirmButtonColor: "#10B581",
        confirmButtonText: "Valider",
        cancelButtonText: "Annuler",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          proceedWithAnalysis();
        }
      });
    } else {
        SwalWithBootstrapButtons.fire({
                    title: "Choix de la méthode",
                    html: "Etes-vous sur? Voulez-vous lancer l'analyse de cette étape?",
                    showCancelButton: true,
                    cancelButtonColor: "#C91432",
                    confirmButtonColor: "#10B581",
                    confirmButtonText: "Oui, lancer l'analyse",
                    cancelButtonText: " Non, attendre",
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                        proceedWithAnalysis();
                    }
                  });
      
    }
  };

  const proceedWithAnalysis = () => {
    const numberVotesChecked =
      methodologieChoosed !== "HYBRID"
        ? contributorsWithoutObservator.length
        : contributorsWithoutObservator.length * 2;
    const onCheckAllVoting =
      numberVotesChecked ===
      methodologies.reduce((acc, e) => {
        acc += e.votes.length;
        return acc;
      }, 0);


    dispatch(getResultsFetch({ idPE: idPlanExecution, projectId }));
    updateStatusPlanExecution(idPlanExecution, projectId);
    dispatch(setCurrent(1));
    dispatch(setIsFinishedPlanExecu(true));
    dispatch(setIsLoadingReport(true));

  };

  return (
    <>
      {current === 1 ? (
        <>
          {current <= phases.length && (
            <CustomSteps current={current - 1} steps={phases} />
          )}
          <HeaderDescription step={current} phasesLength={phases.length} />
          <ConstraintsQuestions validation={validation} />
          <Footer
            phasesLength={phases.length}
            idPlanExecution={idPlanExecution}
            validation={validation}
            isAdmin={checkChefDeProjet}
            onLancer={onLancer}
            onSubmitVote={onSubmitVote}
          />
        </>
      ) : (
        current <= phases.length && (
          <>
            <CustomSteps current={current - 1} steps={phases} />
            <HeaderDescription step={current} phasesLength={phases.length} />
            <MethodologiesPresentation
              isAdmin={checkChefDeProjet}
              methods={methodologies}
              setIsVoted={setIsVoted}
              methodologieChoosed={methodologieChoosed}
            />
            <Footer
              phasesLength={phases.length}
              idPlanExecution={idPlanExecution}
              validation={validation}
              isAdmin={checkChefDeProjet}
              onLancer={onLancer}
              onSubmitVote={onSubmitVote}
            />
          </>
        )
      )}
    </>
  );
};

Steps.propTypes = {
  checkChefDeProjet: PropTypes.bool.isRequired,
  projectData: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
};