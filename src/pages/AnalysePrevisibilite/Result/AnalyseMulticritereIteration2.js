/**
 * @file AnalyseMulticritereIteration2.js
 * @brief Ce fichier contient le composant du résultat de l'analyse multicritère itération 2.
 */
import { memo, useEffect } from "react"
import Steps from "pages/AnalyseMulticriteres/Steps"
import { TitlePage } from "pages/ProjectCreation/WrapperProjectSearch/WrapperProjectSearch"
import { useDispatch, useSelector } from "react-redux"
import {
    setCurrent,
    setIsLoadingFullPage,
} from "reducers/multicriteriaAnalysis/multicriteriaAnalysisReducer"
import { getResultsMultiFetch } from "reducers/project/projectReducer"
import { Spinner } from "utils/Spinner"

export default memo(() => {
    const current = useSelector(
        (state) => state.multicriteriaAnalysisReducer.current
    )
    const projectId = useSelector((state) => state.projectReducer.projectId)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setIsLoadingFullPage(true))
        dispatch(setCurrent(4))
        dispatch(getResultsMultiFetch(projectId))
        dispatch(setIsLoadingFullPage(false))
    }, [dispatch, projectId])

    return (
        <>
            <TitlePage>[Étape 1 : Analyse multicritère] Itération 2</TitlePage>
            {current === 4 ? <Steps /> : <Spinner size="small" />}
        </>
    )
})
