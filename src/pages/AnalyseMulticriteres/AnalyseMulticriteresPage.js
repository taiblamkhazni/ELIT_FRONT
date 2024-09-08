/* eslint-disable react-hooks/exhaustive-deps */
/**
 * @file AnalyseMulticriteresPage.js
 * @brief This file contains the AnalyseMulticriteresPage component and the definition of its styled component.
 *
 * AnalyseMulticriteresPage is responsible for managing and displaying the steps of a multicriteria analysis
 * for a specific project. It fetches relevant data and provides it to child components via a context.
 */
import { createContext, memo, useContext, useEffect, useMemo, useState } from "react"
import { Spin } from "antd"
import { Loading } from "assets/icons"
import { StepPageTitle } from "components/Title/Title"
import { GetAnalyseMulticriteByProjectId } from "hooks/apis/AnalyseMulticritereApi"
import BreadCrumbDetailComponent from "pages/ProjectDetail/BreadCrumbDetailComponent"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { setCurrent, setEditQuestionRef } from "reducers/multicriteriaAnalysis/multicriteriaAnalysisReducer"
import styled from "styled-components"
import { Spinner } from "utils/Spinner"

import Steps from "./Steps"

import "./style.css"

export const StepsContext = createContext({})

/**
 * @brief Custom styled component for the Spin component from antd.
 **/
const CustomSpin = styled(Spin)`
  & .ant-spin-nested-loading > div > .ant-spin {
    max-height: 900px !important;
  }
`

/**
 * @brief A custom hook to use the StepsContext.
 * @returns The context object containing shared values for all steps in the multicriteria analysis.
 */
export const useStepContext = () => {
    return useContext(StepsContext)
}

/**
 * @brief AnalyseMulticriteresPage component.
 *
 * @details This component manages and displays the steps of a multicriteria analysis for a given project.
 * It fetches data related to the steps and provides them via context to child components.
 *
 * @param {Object} props The properties passed to the component.
 * @param {number} props.projectId The ID of the project under analysis.
 * @param {boolean} props.isFinished Flag indicating if the analysis is finished.
 *
 * @returns {JSX.Element} JSX representation of the multicriteria analysis steps and their content.
 */
function AnalyseMulticriteresPage() {
    const dispatch = useDispatch()
    const multiCriteriaAnalysisId = useSelector(state => state.multicriteriaAnalysisReducer.multiCriteriaAnalysisId)
    const isLoadingFullPage = useSelector(state => state.multicriteriaAnalysisReducer.isLoadingFullPage)

    const projectId = useSelector(state=>state.projectReducer.projectId)
    const isFinished = useSelector(state=>state.multicriteriaAnalysisReducer.isFinished)

    const [formSteps, setFormSteps] = useState([])
    const [listStepWeights, setListStepweights] = useState([])
    const [listFormQuestions, setListFormQuestions] = useState([])
    const formValidations = [
        { current: 1, validation: useForm({ mode: "onChange" }) },
        { current: 2, validation: useForm({ mode: "onChange" }) },
        { current: 3, validation: useForm({ mode: "onChange" }) },
    ]

    useEffect(() => {
        if (isFinished) {
            dispatch(setCurrent(4))
        } else {
            dispatch(setCurrent(1))
        }
    }, [])

    useEffect(() => {
        /** Fetch to get multicriteria analysis data by its project ID */
        GetAnalyseMulticriteByProjectId(projectId).then((data) => {
            if (data) {
                const formStepsClone = [...data.formSteps]
                /** Save data of each step in the analysis */
                setFormSteps(formStepsClone)
                /** Save step weights data of each step in the analysis */
                setListStepweights(
                    formStepsClone.reduce((acc, step) => {
                        acc = [
                            ...acc,
                            { currentStep: step.stepRef, stepWeights: step.stepWeights },
                        ]
                        return acc
                    }, [])
                )
                /** Save questions list of each step in the analysis */
                setListFormQuestions(
                    formStepsClone.reduce((acc, step) => {
                        acc = [
                            ...acc,
                            {
                                currentStep: step.stepRef,
                                formQuestions: step.formQuestions,
                            },
                        ]
                        return acc
                    }, [])
                )
            }
        })
    }, [isFinished, projectId])

    /**
     * @brief Sets the editing question and updates the current step in the state.
     * @param currentStep The current step of the form.
     * @param questionRef Reference to the question being edited.
     */
    const setEditQuestion = (currentStep, questionRef) => {
        dispatch(setCurrent(currentStep))
        dispatch(setEditQuestionRef(questionRef))
    }

    /**
     * @brief Retrieves validation rules based on the current step.
     * @param current The current step of the form.
     * @return Validation rule if current step is 3 or below, otherwise null.
     */
    const getValidationByCurrent = (current) => {
        if (current) {
            if (current <= 3) {
                return formValidations.find((v) => v.current === current).validation
            }
        }

        return null
    }

    /**
     * @brief Gets list of form questions based on the current step.
     * @param current The current step of the form.
     * @return Array of questions if current step is 3 or below, otherwise null.
     */
    const getListFormQuestionsByCurrentStep = (current) => {
        if (current) {
            if (current <= 3) {
                return listFormQuestions.find((e) => e.currentStep === current)
                    .formQuestions
            }
        }

        return null
    }

    /**
     * @brief Retrieves the data for the current step from form steps.
     * @param current The current step of the form.
     * @return Step data if current step is 3 or below, otherwise null.
     */
    const getCurrentStepDataFromFormsStep = (current) => {
        if (current) {
            if (current <= 3) {
                return formSteps.find((s) => s.stepRef === current)
            }
        }

        return null
    }

    /**
     * @brief Gets the weight of the current step from the list of step weights.
     * @param current The current step of the form.
     * @return Weight of the step if current step is 3 or below, otherwise null.
     */
    const getCurrentStepWeightsFromListStepsWeights = (current) => {
        if (current) {
            if (current <= 3) {
                return listStepWeights.find((w) => w.currentStep === current)
            }
        }
        return null
    }

    /**
     * @brief Retrieves the weights for the current step.
     * @param current The current step of the form.
     * @return Step weights if current step is 3 or below, otherwise null.
     */
    const getCurrentStepWeights = (current) => {
        if (current) {
            if (current <= 3) {
                return listStepWeights.find((w) => w.currentStep === current)
                    .stepWeights
            }
        }
        return null
    }
    /**
     * @brief Gets the name of the step by its identifier.
     * @param current The identifier for the current step.
     * @return Step name if current step is 3 or below, otherwise null.
     */
    const getStepNameById = (current) => {
        if (current) {
            if (current <= 3) {
                return formSteps.find((w) => w.stepRef === current).stepName
            }
        }

        return null
    }

    // DEfine context in here cuz here is stable and statistic.
    // Context in page rerender this means this context recreate and change so all child component change
    // after that regarding this context

    const canPass = [
        formSteps.length,
        multiCriteriaAnalysisId,
        listStepWeights.length,
        listFormQuestions.length,
    ].every(Boolean)

    const contextValue = useMemo(() => ({
        listStepWeights,
        listFormQuestions,
        getListFormQuestionsByCurrentStep,
        getCurrentStepDataFromFormsStep,
        getCurrentStepWeights,
        getCurrentStepWeightsFromListStepsWeights,
        getStepNameById,
        getValidationByCurrent,
        setEditQuestion,
        setListStepweights,
        setListFormQuestions,
    }), [listStepWeights, listFormQuestions, getListFormQuestionsByCurrentStep, getCurrentStepDataFromFormsStep, getCurrentStepWeights, getCurrentStepWeightsFromListStepsWeights, getStepNameById, getValidationByCurrent, setEditQuestion]);

    return (
        <>
            <BreadCrumbDetailComponent analyseType="manual" />
            {canPass ? (
                <StepsContext.Provider value={contextValue}>
                    {isLoadingFullPage ? (
                        <>
                            <CustomSpin
                                tip="L’analyse des données prendra quelques secondes, veuillez patienter..."
                                indicator={<Loading className="spin" />}
                                wrapperClassName="wrapperFullLoading"
                            >
                                <StepPageTitle
                                    StepNumber={"Etape 1"}
                                    StepName={"Analyse Multicritère"}
                                />
                                <Steps />
                            </CustomSpin>
                        </>
                    ) : (
                        <>
                            <StepPageTitle
                                StepNumber={"Etape 1"}
                                StepName={"Analyse Multicritère"}
                            />
                            <Steps />
                        </>
                    )}
                </StepsContext.Provider>
            ) : (
                <Spinner size="large" message="" />
            )}
        </>
    );
}

export default memo(AnalyseMulticriteresPage);
