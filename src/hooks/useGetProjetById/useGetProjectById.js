/**
 * @file useGetProjectById.js
 * @brief Module for the hook use get project by Id.
 */
import { getProjetByIdQuery } from "hooks/queries/queries"

/**
 * @var useGetProjetById
 * @brief useGetProjetById.
 */
const useGetProjetById = (projectId) => {
    const { data: projectData, isLoading } = getProjetByIdQuery(projectId)
    return { projectData, isLoading }
}

export default useGetProjetById
