/**
 * @file Projects.js
 * @brief Ce fichier contient le composant admin de gestion des projets .
 */
import { useEffect } from "react"
import { Flex } from "antd"
import { ButtonNoBackground, NextStepButton } from "components/Button/Button"
// import { StructureGrid } from "components/Grid/Grid"
import { CustomUl } from "components/List/List"
import { ListProjectWrapper } from "components/Project/ListProjectWrapper/ListProjectWrapper"
import { ProjectItemContent } from "components/Project/ProjectItemContent/ProjectItemContent"
import { ProjectItemWrapper } from "components/Project/ProjectItemWrapper/ProjectItemWrapper"
import { ProjectTitle } from "components/Project/ProjectTitle/ProjectTitle"
import { deleteProjectAdminApi, putStateProject } from "hooks/apis/AdminApi"
import { useDispatch, useSelector } from "react-redux"
import { getProjectsAdminFetch } from "reducers/admin/projects/projectsAdminReducer"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"
import { t } from "utils/translationUtils";
import { getOptionalColor, getProjectStatus } from "utils/utils"

/**
 * Projects
 * @brief This component displays the list of projects to the super admin and offers options to validate or delete a project.
 *
 * @returns {JSX.Element} JSX element representing the admin projects management page.
 */
function Projects() {
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.projectsAdminReducer.projects)

    /**
     * Confirms and validates a project by its ID.
     *
     * @param {string} projectId - The ID of the project to validate.
     */
    const onValid = async (projectId) => {
        putStateProject(projectId).then((res) => {
            if (res.error === false) {
                dispatch(getProjectsAdminFetch())
            }
        })
    }

    /**
     * Deletes a project by its ID.
     *
     * @param {string} projectId - The ID of the project to delete.
     * @param {string} projectName - The name of the project to delete, for confirmation purposes.
     */
    const onDeleteProjetAdminById = (projectId, projectName) => {
        SwalWithBootstrapButtons.fire({
            title: t('administration.deleteProject.title'),
            text: `${t('administration.deleteProject.textFirstHalf')} "${projectName}" ? ${t('administration.deleteProject.textSecondHalf')} `,
            showCancelButton: true,
            confirmButtonColor: "#10B581",
            cancelButtonColor: "#C91432",
            confirmButtonText: t('administration.deleteProject.confirmDeleteButton'),
            cancelButtonText: t('administration.deleteProject.cancelDeleteButton'),
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProjectAdminApi(projectId).then((res) => {
                    if (res.status === 200) {
                        dispatch(getProjectsAdminFetch())
                    }
                })
            }
        })
    }

    /** Fetch projects list for super admin  */
    useEffect(() => {
        dispatch(getProjectsAdminFetch())
    }, [dispatch])

    return (
        <ListProjectWrapper>
            <CustomUl>
                {/** map projects list */}
                {projects.map((p) => (
                    /** project item */
                    <Flex
                        key={p.projectId}
                        justify="space-between"
                        className="project-item"
                    >
                        <ProjectItemWrapper>
                            <ProjectItemContent
                                background={
                                    p.isArchived || p.confirmationState === "WAITING"
                                        ? "#F9F9F9"
                                        : "white"
                                }
                            >
                                <Flex
                                    align="middle"
                                >
                                    <Flex justify="start" >
                                        <ProjectTitle>{p.name}</ProjectTitle>
                                    </Flex>
                                    <Flex justify="end" align="middle">
                                        <Flex gap={"small"}>
                                            <ButtonNoBackground
                                                margin="0px 10px 0px 10px"
                                                optionalColor={getOptionalColor(p.isArchived, p.confirmationState)}
                                                fontSize="12px"
                                                padding="6px 8px"
                                            >
                                                {getProjectStatus(p.isArchived, p.confirmationState)}
                                            </ButtonNoBackground>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </ProjectItemContent>
                        </ProjectItemWrapper>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <NextStepButton
                                disabled={p.confirmationState === "CONFIRMED"}
                                onClick={() => onValid(p.projectId)}
                            >
                                {t('administration.project.confirmButton')}
                            </NextStepButton>
                            <ButtonNoBackground
                                onClick={() => onDeleteProjetAdminById(p.projectId, p.name)}
                            >
                                {t('administration.project.deleteButton')}
                            </ButtonNoBackground>
                        </div>
                    </Flex>
                ))}
            </CustomUl>
        </ListProjectWrapper>
    )
}

export default Projects;
