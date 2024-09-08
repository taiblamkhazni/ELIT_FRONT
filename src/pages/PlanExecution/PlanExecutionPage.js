/**
 * @file PlanExecution.js
 * @brief This module exports PlanExecution component
 */
import { useEffect } from "react"
import { StepPageTitle } from "components/Title/Title"
import BreadCrumbDetailComponent from "pages/ProjectDetail/BreadCrumbDetailComponent"
import { useDispatch, useSelector } from "react-redux"
import { setCurrent } from "reducers/executionPlan/executionPlanReducer"
import { Spinner } from "utils/Spinner"

import Resultat from "./Resultat"
import {Steps} from "./Steps"

/** Plan execution Component */
const PlanExecution = () => {
    const dispatch = useDispatch()
    const projectData = useSelector((state) => state.projectReducer.project);
    const currentUser = useSelector((state) => state.projectReducer.currentUser);
    const checkChefDeProjet = currentUser.contributerId === projectData.chefId;
    const isFinished = useSelector(
        (state) => state.executionPlanReducer.isFinished
    )
    const idPlanExecution = useSelector(
        (state) => state.executionPlanReducer.idPlanExecution
    )
    const resultatPlanExecution = useSelector(
        (state) => state.executionPlanReducer.results
    )
    useEffect(() => {
        if (idPlanExecution) {
            if (!isFinished) {
                if (!checkChefDeProjet) {
                    dispatch(setCurrent(2))
                }else{
                    dispatch(setCurrent(1))
                }       
            }
        }
  
    }, [isFinished, checkChefDeProjet, dispatch,idPlanExecution])
    return (
        <>
            {idPlanExecution ? (
                <>
                    <BreadCrumbDetailComponent analyseType="manual" />
                    <StepPageTitle
                        StepNumber={"Étape 3"}
                        StepName={"Choix de la méthode"}
                    />
                    {!isFinished ? (
                        <Steps projectData={projectData} currentUser={currentUser} checkChefDeProjet={checkChefDeProjet} />
                    ) : (
                        <> {resultatPlanExecution && <Resultat resultatPlanExecution={resultatPlanExecution} />}</>
                    )}
                </>
            ) : (
                <Spinner size="medium" message="" />
            )}
        </>
    )
}

export default PlanExecution;

