/**
 * @file Footer.js
 * @brief Defines the Footer component for the analysis section.
 */
import { useCallback } from "react";
import { Flex } from "antd";
import {  ButtonNoBackground, NextStepButton, } from "components/Button/Button";
import { UpdateAnalyseMulticrite } from "hooks/apis/AnalyseMulticritereApi";
import { useStepContext } from "pages/AnalyseMulticriteres/AnalyseMulticriteresPage";
import { isEmpty } from "pages/Profil/ProfilPage";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    setCurrent,
    setIsFinished,
    setIsLoadingFullPage,
    setIsLoadingReport,
} from "reducers/multicriteriaAnalysis/multicriteriaAnalysisReducer";
import {
    getProjectFetch,
    getResultsMultiFetch,
} from "reducers/project/projectReducer";
import ROUTES from "routes/routes";
import { setStringToLowAndNormal } from "utils/effects/effects";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";


/**
 * @function Footer
 * @description Renders the footer section of the analysis which includes navigation and action buttons.
 * @param {Object} props - The component's properties
 * @param {number} props.phasesLength - The total number of phases in the analysis
 * @returns {JSX.Element} Rendered component
 */
const Footer = ({ phasesLength }) => {
    const current = useSelector(
        (state) => state.multicriteriaAnalysisReducer.current
    );
    const projectId = useSelector((state) => state.projectReducer.projectId);
    const isIteration2AP = useSelector(
        (state) => state.multicriteriaAnalysisReducer.isIteration2AP
    );

    const isLoadingReport = useSelector(
        (state) => state.multicriteriaAnalysisReducer.isLoadingReport
    );

    const dispatch = useDispatch();
    const {
        getValidationByCurrent,
        getListFormQuestionsByCurrentStep,
        listFormQuestions,
        setListFormQuestions,
        getCurrentStepDataFromFormsStep,
        getCurrentStepWeights,
    } = useStepContext();

    const navigate = useNavigate();
    const validation = current <= 3 ? getValidationByCurrent(current) : null;

    const prev = (setdata = false) => {
        if (setdata) {
            setUpUpdatedData(validation?.getValues());
        }
        dispatch(setCurrent(current - 1));
        window.scrollTo(0, 0);
    };

    const next = () => {
        dispatch(setCurrent(current + 1));
        window.scrollTo(0, 0);
    };

    const setUpUpdatedData = (data) => {
        const cloneDefaultsList = [...getListFormQuestionsByCurrentStep(current)];
        cloneDefaultsList.forEach((question) => {
            const inputAnswer = data[question.questionRef]
                ? data[question.questionRef]
                : null;
            if (inputAnswer) {
                question.answerText = inputAnswer;
            }
            question.criterias?.forEach((c) => {
                const value = data[
                    `${setStringToLowAndNormal(c.criteriaName)}_${setStringToLowAndNormal(
                        question.questionRef
                    )}`
                ]
                    ? data[
                    `${setStringToLowAndNormal(
                        c.criteriaName
                    )}_${setStringToLowAndNormal(question.questionRef)}`
                    ]
                    : null;
                if (value) {
                    c.criteriaValue = value;
                }
            });
        });

        const notCurrentStepsFormQuestions = [
            ...listFormQuestions.filter((l) => l.currentStep !== current),
        ];
        const updatedListFormQuestions = [
            ...notCurrentStepsFormQuestions,
            { currentStep: current, formQuestions: cloneDefaultsList },
        ];

        setListFormQuestions(updatedListFormQuestions);
        const currentStepDataFromFormsStep = {
            ...getCurrentStepDataFromFormsStep(current),
        };
        currentStepDataFromFormsStep["formQuestions"] = cloneDefaultsList;
        currentStepDataFromFormsStep["stepWeights"] =
            getCurrentStepWeights(current);
        return currentStepDataFromFormsStep;
    };

    const onEnregistrerUnePartie = () => {
        if (isEmpty(validation.formState.errors)) {
            UpdateAnalyseMulticrite(
                projectId,
                setUpUpdatedData(validation?.getValues())
            ).then((res) => {
                if (res.status === 200) {
                    SwalWithBootstrapButtons.fire({
                        confirmButtonColor: "#3085d6",
                        text: "Vos saisies a été enregistré avec succès !",
                    }).then(() => navigate("/"));
                }
            });
        } else {
            SwalWithBootstrapButtons.fire({
                confirmButtonColor: "#3085d6",
                text: "Vos saisies ne sont pas validés à cause de caractères vulnérables !",
            });
        }
    };

    const onSubmitAnalyseMulticriteByStep = (data, action = null) => {
        setUpUpdatedData(data);
        UpdateAnalyseMulticrite(projectId, setUpUpdatedData(data));
        if (action !== null) {
            action();
        }
    };

    const onPassToNextStep = useCallback(() => {
        SwalWithBootstrapButtons.fire({
            confirmButtonColor: "#3085d6",
            title: "Étape 1 : Analyse multicritères",
            text: "Vous êtes arrivés à la dernière étape de ce premier parcours. Si vos réponses vous semblent correctes, vous pouvez cliquer sur le bouton afin de lancer l'analyse multicritères. Cette étape peut prendre quelques secondes le temps du calcul.",
            showCancelButton: true,
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setIsLoadingReport(true));
                dispatch(setIsLoadingFullPage(true));
                dispatch(getResultsMultiFetch(projectId));

                dispatch(setIsLoadingFullPage(false));
                dispatch(setCurrent(4));
                dispatch(setIsLoadingReport(false));

            }
        });
    }, [dispatch, projectId]);

    const handleClick = useCallback(() => {
        dispatch(setIsFinished(true));
        navigate(ROUTES.projets + "/" + projectId);
    }, [dispatch, navigate, projectId]);

    const handleNavigate = useCallback(() => {
        navigate(`/projets/${projectId}/etape2/iteration2`);
    }, [ navigate, projectId]);

    const handleDispatch = useCallback(() => {
        dispatch(setIsFinished(true));
        dispatch(getProjectFetch(projectId));
        navigate(`/projets/${projectId}/etape2`);
    }, [dispatch, navigate, projectId]);


    return (
        <Flex justify="flex-end">
            <Flex justify="space-between" style={{ width: "100%" }}>
                <div>
                    {current > 1 && current < phasesLength && (
                        <ButtonNoBackground onClick={() => prev(true)} margin="0">
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
                    {current === phasesLength + 1 && !isIteration2AP && (
                        <ButtonNoBackground onClick={handleClick} margin="0 1rem">
                            Retour au tableau de bord
                        </ButtonNoBackground>
                    )}
                    {current <= phasesLength && (
                        <>
                            <ButtonNoBackground
                                margin="0 24px 0 0"
                                onClick={onEnregistrerUnePartie}
                            >
                                Enregistrer
                            </ButtonNoBackground>
                            <NextStepButton
                                margin="0"
                                onClick={validation?.handleSubmit((data) => {
                                    if (data) {

                                        if (current === phasesLength) {
                                            onSubmitAnalyseMulticriteByStep(data, null);
                                            onPassToNextStep();
                                        } else {
                                            onSubmitAnalyseMulticriteByStep(data, () => next());
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
                                Continuer
                            </NextStepButton>
                        </>
                    )}

                    {current === phasesLength + 1 && isIteration2AP && !isLoadingReport && (
                        <NextStepButton margin="0" onClick={handleNavigate}>
                            Passer à l'étape suivante
                        </NextStepButton>
                    )}
                    {current === phasesLength + 1 && !isIteration2AP && !isLoadingReport && (
                        <NextStepButton margin="0" onClick={handleDispatch}>
                            Passer à l'étape suivante
                        </NextStepButton>
                    )}
                    {/* {isLoadingReport && (
                        <BlockButton>Passer à l'étape suivante</BlockButton>
                    )} */}
                </div>
            </Flex>
        </Flex>
    );
};

Footer.propTypes = {
    phasesLength: PropTypes.number.isRequired,
};

export default Footer;
