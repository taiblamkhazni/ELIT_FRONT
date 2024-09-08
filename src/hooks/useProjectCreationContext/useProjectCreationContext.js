/**
 * @file useProjectCreationContext.js
 * @brief Module for the hook creation context of project.
 */
import { useContext } from "react"
import { ProjectCreationContext } from "context/ProjectCreationProvider"

/**
 * @var useProjectCreationContext
 * @brief useProjectCreationContext.
 */
const useProjectCreationContext = () => {
    return useContext(ProjectCreationContext)
}

export default useProjectCreationContext