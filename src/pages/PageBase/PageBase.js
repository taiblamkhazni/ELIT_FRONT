/**
 * @file PageBase.js
 * @brief Base Page Layout Module
 *
 * This module exports a function that renders the base layout for authenticated users.
 * It checks if the user is logged in and accordingly either renders the content wrapped
 * in a Wrapper component or navigates to the sign-in page.
 */

import { useCallback, useEffect } from "react"
import { CustomModal, CustomTitleModalH2 } from "components/Modal/Modal";
import Wrapper from "components/Wrapper/Wrapper"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { getNewPlanExecutionSuccess, setIdPlanExecution } from "reducers/executionPlan/executionPlanReducer";
import { setIsIteration2AP } from "reducers/multicriteriaAnalysis/multicriteriaAnalysisReducer"
import { setIsBrainStorming } from "reducers/previsibilityAnalysis/previsibilityAnalysisReducer"
import { getProjectFetch } from "reducers/project/projectReducer"
import { closeProjectCreationModal } from "reducers/projects/projectsReducer"
import ROUTES from "routes/routes"
import styled from "styled-components"

const WrapperContent = styled.div`
  margin: 0 auto;
`

const isLogin = true

/**
 * @function PageBase
 * @brief Renders the base layout for authenticated users or redirects to sign-in.
 *
 * Renders child components within a styled wrapper if the user is logged in. If not,
 * redirects the user to the sign-in page.
 *
 * @param {JSX.Element[]} children - Child components to be wrapped in the base layout.
 * @returns {JSX.Element} JSX element representing the base layout or a navigation to sign-in.
 */
const PageBase = ({ children }) => {

  const projectId = useSelector(state => state.projectReducer.projectId);
  const showMessageCreationModal = useSelector(state => state.projectsReducer.showMessageCreationModal);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    // Optionnel: Dispatcher une action pour réinitialiser l'état du modal dans le reducer
    dispatch(getProjectFetch(projectId));
    dispatch(setIsBrainStorming(false));
    dispatch(setIsIteration2AP(false));
    dispatch(closeProjectCreationModal());
    navigate(ROUTES.projets + "/" + projectId);
  }, [dispatch, projectId, navigate]);

  /**
* @brief Function to replace nested ternary operation for the NextButton component in Row element
**/
  const showProjectCreationMessageModal = () => {
    return (
      <CustomModal
        title={<CustomTitleModalH2 id="message-confirm-projet-creation">
          Félicitations, votre projet a été créé sur ELIT
        </CustomTitleModalH2>}
        style={{ alignContent: "center", textAlign: "center" }}
        open={showMessageCreationModal}
        onCancel={handleClose}
        footer={null}
      >
      </CustomModal>
    );
  }


  useEffect(() => {
      // Ne définir le temporisateur que si showMessageCreationModal est vrai
      if (showMessageCreationModal) {
        dispatch(setIdPlanExecution(null))
        dispatch(getNewPlanExecutionSuccess(null))
        const timer = setTimeout(() => {
          handleClose(); // Appelle la fonction de fermeture
        }, 3000); // Ferme le modal après 3 secondes

        return () => clearTimeout(timer); // Nettoie le temporisateur si le composant est démonté
    }
  }, [showMessageCreationModal, handleClose,dispatch]);



  return isLogin ? (
    <Wrapper>
      {showProjectCreationMessageModal()}
      <WrapperContent>{children}</WrapperContent>
    </Wrapper>
  ) : (
    <Navigate to="/sign-in" replace />
  )
}

export default PageBase
