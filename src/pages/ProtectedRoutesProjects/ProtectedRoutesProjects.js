/**
 * @file ProtectedRoutesProjects.js
 * @brief Protected Route Component for Project Pages.
 *
 * This component serves as a wrapper that checks various conditions
 * before rendering the nested routes for projects.
 */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { getProjectFetch } from "reducers/project/projectReducer"
import { Spinner } from "utils/Spinner"

/**
 * @brief Protects the routes related to projects.
 * It fetches the project data and determines what should be rendered.
 *
 * @returns {JSX.Element} JSX element representing the appropriate view.
 */
const ProtectedRoutesProjects = () => {

  /** @var {string} projectId - The ID of the project obtained from the route params */
    let { projectId } = useParams()
  /** @var {function} dispatch - Dispatch function from Redux */
    const dispatch = useDispatch()
  /** @var {Object} projectData - The project data from Redux store */
    const projectData = useSelector((state) => state.projectReducer.project)
  /** @var {boolean} isLoading - Loading state from Redux store */
    const isLoading = useSelector((state) => state.projectReducer.isLoading)

    useEffect(() => {
        dispatch(getProjectFetch(projectId))
    }, [projectId,dispatch])

  /** @brief Determine what to render based on the conditions */
    let content;
    if (isLoading) {
        content = <Spinner size={"large"} message="" />;
    } else if (!projectData) {
        content = <strong>Ce projet n'existe pas.</strong>;
    } else if (projectData.confirmationState === "CONFIRMED") {
        content = <Outlet />;
    } else {
        content = (
          <>
            <strong>{projectData.name}</strong> n'est pas encore validé par
            l'administrateur.
          </>
        );
    }

    return <>{content}</>;
};

export default ProtectedRoutesProjects
