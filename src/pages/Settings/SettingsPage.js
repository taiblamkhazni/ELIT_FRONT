/**
 * @file SettingsPage.js
 * @brief Settings Component for Settings page.
 *
 * This module exports a function that renders the Settings component
 * encapsulated in a PageBase component.
 */
import PageBase from "pages/PageBase/PageBase"
import { TitlePage } from "pages/ProjectCreation/WrapperProjectSearch/WrapperProjectSearch"

/**
 * @function SettingsPage
 * @brief This function renders the Settings component, wrapped in a PageBase component.
 *
 * @returns {JSX.Element} JSX element representing the Settings page.
 */
const SettingsPage = () => {

    return (
        <PageBase>
            <TitlePage style={{padding: "20px 40px"}}>Réglages</TitlePage>
        </PageBase>
    )
}

export default SettingsPage;