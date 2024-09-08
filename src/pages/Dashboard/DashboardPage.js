/**
 * @file Dashboard.js
 * @brief This module exports the Dashboard component used in the application.
 *
 * The Dashboard component serves as the main view for users after they log in.
 * It comprises various sections that provide different types of information
 * and interactive elements. The component includes a Presentation Panel,
 * a Swipper for navigating through items, and a Media section.
 */
import PageBase from "pages/PageBase/PageBase"
import { useSelector } from "react-redux"

import PresentationPanel from "./PresentationPanel"
import Swipper from "./Swipper"
import TooltipModal from "./TooltipModal"




/**
 * @function DashboardPage
 * @brief This component is responsible for rendering the main dashboard view
 * of the application. It aggregates various sub-components like
 * PresentationPanel, Swipper, and Media.
 * @returns {JSX.Element} JSX elements representing the Dashboard and additional features.
 */
const DashboardPage = () => {
    const toolTipStage = useSelector((state) => state.welcomeTooltipReducer.stageNumber)
    const condition = toolTipStage > 0 && toolTipStage <= 6
    const styledMask = condition
        ? {
            position: "absolute",
            width: "100%",
            filter: "blur(1px)",
            height: "117%",
            background: "black",
            zIndex: "1",
            opacity: "0.7",
        }
        : {}
    return (
        <>
            <div id="mask" style={styledMask}></div>
            <TooltipModal />
            <PageBase>
                <div>
                    <PresentationPanel data-testid="presentationPanel" />
                    <div style={{padding: "20px 40px"}}>
                    <Swipper data-testid="swipper"/>
                    {/* <Media data-testid="media"/> */}
                    </div>
                </div>
            </PageBase>
        </>
    )
}

export default DashboardPage;
