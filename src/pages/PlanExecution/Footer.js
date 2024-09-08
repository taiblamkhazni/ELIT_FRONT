/**
 * @file Footer.js
 * @brief Exports the Footer.js.
 */
import { useCallback, useEffect, useState } from "react";
import { Flex } from "antd";
import { ButtonNoBackground, NextStepButton } from "components/Button/Button";
import { putAnswersPlanExecution } from "hooks/apis/PlanExecutionApi";
import { isEmpty } from "pages/Profil/ProfilPage";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrent, setInputForm } from "reducers/executionPlan/executionPlanReducer";
import ROUTES from "routes/routes";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";


/**
 * @function Footer
 * @description Renders the footer section of the analysis which includes navigation and action buttons.
 * @param {Object} props - The component's properties
 * @param {number} props.phasesLength - The total number of phases in the analysis
 * @returns {JSX.Element} Rendered component
 */
export const Footer = ({
  phasesLength,
  idPlanExecution,
  validation,
  isAdmin,
  onLancer,
  onSubmitVote,
}) => {
  const current = useSelector((state) => state.executionPlanReducer.current);
  const currentUser = useSelector((state) => state.projectReducer.currentUser);
  const [stepTwo, setStepTwo] = useState(false);
  const projectId = useSelector((state) => state.projectReducer.projectId);
  const methods = useSelector(
    (state) => state.executionPlanReducer.methodologiesArray
  );
  const listQuestions = useSelector(
    (state) => state.executionPlanReducer.listQuestions
  );
  const inputForm = useSelector(
    (state) => state.executionPlanReducer.inputForm
  );
  // const isLoadingReport = useSelector(
  //     (state) => state.multicriteriaAnalysisReducer.isLoadingReport
  // );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitVote, setIsSubmitVote] = useState(false);

  const prev = () => {
    dispatch(setCurrent(current - 1));
    window.scrollTo(0, 0);
  };

  const next = () => {
    dispatch(setCurrent(current + 1));
    window.scrollTo(0, 0);
  };

  const onEnregistrerUnePartie = () => {
    if (isEmpty(validation.formState.errors)) {
      const payload = Object.keys(validation?.getValues()).map((idQuestion) => {
        dispatch(setInputForm(validation?.getValues()[idQuestion]));
        return {
          executionPlanQuestionId: idQuestion,
          answer: validation?.getValues()[idQuestion],
        };
      });
      putAnswersPlanExecution(payload, idPlanExecution, projectId).then(
        (res) => {
          if (res.status === 200) {
            setStepTwo(true);
            SwalWithBootstrapButtons.fire({
              confirmButtonColor: "#3085d6",
              text: "Vos saisies a été enregistré avec succès !",
            });
          }
        }
      );
    } else {
      SwalWithBootstrapButtons.fire({
        confirmButtonColor: "#3085d6",
        text: "Vos saisies ne sont pas validés à cause de caractères vulnérables !",
      });
    }
  };

  const handleClick = useCallback(() => {
    navigate(ROUTES.projets + "/" + projectId);
  }, [navigate, projectId]);

  useEffect(() => {
    const hasUserVote = methods?.some((data) => {
      return data.votes.some((vote) => {
        return vote.userId === currentUser.contributerId;
      });
    });

    if (isAdmin) {
      const hasUserAnswer = listQuestions?.every((data) => data.answer && data.answer.trim() !== '');
      setStepTwo(hasUserAnswer);
      setIsDisabled(hasUserAnswer);
    }
    if (current === phasesLength) {
      setIsDisabled(hasUserVote);
      setIsSubmitVote(hasUserVote);
    }
  }, [methods, currentUser.contributerId, listQuestions, isAdmin, phasesLength, current, isDisabled, isSubmitVote]);

  return (
    <>
      {isAdmin ? (
        <Flex justify="flex-end">
          <Flex justify="space-between" style={{ width: "100%" }}>
            <div>
              {current === 1 && (
                <ButtonNoBackground onClick={handleClick} margin="0">
                  Précédente
                </ButtonNoBackground>
              )}
              {current === phasesLength && (
                <ButtonNoBackground onClick={() => prev()} margin="0 0 8px 0">
                  Précédente
                </ButtonNoBackground>
              )}
            </div>
            <div style={{ gap: "1rem" }}>
              {current === phasesLength + 1 && (
                <ButtonNoBackground onClick={handleClick} margin="0 1rem">
                  Retour au tableau de bord
                </ButtonNoBackground>
              )}
              {current <= phasesLength && (
                <>
                  {current === phasesLength ? (
                    <ButtonNoBackground
                      margin="0 24px 0 0"
                      onClick={() => {
                        onSubmitVote();
                        setIsSubmitVote(true);
                      }}
                      disabled={isDisabled}
                    >
                      Enregistrer
                    </ButtonNoBackground>
                  ) : (
                    <ButtonNoBackground
                      margin="0 24px 0 0"
                      onClick={() => {
                        onEnregistrerUnePartie();
                      }}
                      //disabled={isDisabled}
                    >
                      Enregistrer
                    </ButtonNoBackground>
                  )}

                  <NextStepButton
                    margin="0"
                    onClick={validation?.handleSubmit((data) => {
                      if (data) {
                        if (current === phasesLength) {
                          if (!isDisabled && !isSubmitVote) { onSubmitVote(); }
                          onLancer();
                        } else {
                          if (!stepTwo) {
                            onEnregistrerUnePartie();
                            setStepTwo(false);
                          }
                          next();
                        }
                      } else {
                        // TODO: Handle error
                        SwalWithBootstrapButtons.fire({
                          // icon: "error",
                          title: "Oops...",
                          text: "Une erreur est survenue lors de la validation des données.",
                        });
                      }
                    })}
                  >
                    {current === phasesLength ? "Lancer l'analyse" : "Continuer"}

                  </NextStepButton>
                </>
              )}
            </div>
          </Flex>
        </Flex>
      ) : (
        <Flex justify="flex-end">
          <Flex justify="space-between" style={{ marginTop: "10px", width: "100%" }}>
            {current <= phasesLength && (
              <>
                <ButtonNoBackground onClick={handleClick} margin="0 1rem">
                  Retour au tableau de bord
                </ButtonNoBackground>
                <ButtonNoBackground
                  margin="0 24px 0 0"
                  onClick={onSubmitVote}
                  disabled={isDisabled}
                >
                  Enregistrer
                </ButtonNoBackground>
              </>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
};

Footer.propTypes = {
  phasesLength: PropTypes.number.isRequired,
  idPlanExecution: PropTypes.number.isRequired,
  validation: PropTypes.object.isRequired,
  onLancer: PropTypes.func,
  onSubmitVote: PropTypes.func,
};
