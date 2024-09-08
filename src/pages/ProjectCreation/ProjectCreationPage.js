/**
 * @file ProjectCreationPage.js
 * @brief Project Creation Page Module
 *
 * This module exports a function that renders a series of components related to project creation,
 * all wrapped inside a ProjectCreationProvider component and PageBase component. It is responsible for
 * displaying the project search wrapper, a list of projects, and wrapper buttons.
 */
import ProjectCreationProvider from "context/ProjectCreationProvider"
import PageBase from "pages/PageBase/PageBase"
import ListProjects from "pages/ProjectCreation/ListProjects/ListProjects"
import WrapperButtons from "pages/ProjectCreation/WrapperButtons/WrapperButtons"
import WrapperProjectSearch from "pages/ProjectCreation/WrapperProjectSearch/WrapperProjectSearch"

const ProjectCreationPage = () => {
    return (
        <PageBase>
            <ProjectCreationProvider>
                <div style={{padding: "20px 40px"}}>
                <WrapperProjectSearch />
                <WrapperButtons />
                <ListProjects />
                </div>
            </ProjectCreationProvider>
        </PageBase>
    )
}

export default ProjectCreationPage
