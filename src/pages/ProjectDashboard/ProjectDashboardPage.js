/**
 * @file ProjectDashbordPage.js
 * @brief Ce fichier définit la pageBase de ProjectDashboardFeature.
 */
import useGetProjetById from "hooks/useGetProjetById/useGetProjectById"
import PageBase from "pages/PageBase/PageBase"
import ProjectDashboard from "pages/ProjectDashboard/ProjectDashboard"
import { useParams } from "react-router-dom"
import { Spinner } from "utils/Spinner"

export default () => {
    let { projectId } = useParams();
    const { projectData, isLoading } = useGetProjetById(projectId);

    let content;

    if (isLoading) {
        content = <Spinner size={"large"} message="" />;
    } else {
        if (!projectData) {
            content = (
                <PageBase>
                    <strong style={{padding: "20px 40px"}}>Projet n'existe pas</strong>
                </PageBase>
            );
        } else if (projectData.confirmationState === "CONFIRMED") {
            content = (
                <PageBase>
                    <div style={{padding: "20px 40px"}}>
                        <ProjectDashboard projectData={projectData} />
                    </div>
                </PageBase>
            );
        } else {
            content = (
                <PageBase>
                    <strong style={{padding: "20px 40px"}}>{projectData.name}</strong> n'est pas encore validé par
                    l'administrateur
                </PageBase>
            );
        }
    }

    return <>{content}</>;
};

