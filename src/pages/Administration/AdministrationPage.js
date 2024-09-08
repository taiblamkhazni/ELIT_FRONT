/**
 * @file AdministrationPage.js
 * @brief Administration Module
 *
 * This module exports a function that renders an Administration component
 * wrapped in a PageBase component.
 */
import Projects from "pages/Administration/Projects"
import PageBase from "pages/PageBase/PageBase"
import { TitlePage } from "pages/ProjectCreation/WrapperProjectSearch/WrapperProjectSearch"

/**
 * @function AdministrationPage
 * @brief Renders an Administration component wrapped in a PageBase component it
 * renders the administration page for project management.
 * It displays a title 'Administration' and a list of projects using the Projects component.
 * @returns {JSX.Element} JSX element representing the wrapped component
 */
function AdministrationPage() {
    return (
        <PageBase>
            <div style={{padding: "20px 40px"}}>
            <TitlePage>Administration</TitlePage>
            <Projects />
            </div>
        </PageBase>
    )
}

export default AdministrationPage;
