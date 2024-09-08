/**
 * @file ProjectDashboard.js
 * @brief Exports the ProjectDashboard.js.
 */
import { memo, useState } from "react"
import { DescriptionFeature } from "components/Description/Description"
import { HorizontalDivider } from "components/Divider/Divider"
import { StructureGrid } from "components/Grid/Grid"
import { TextBold } from "components/Text/Text"
import ProjectCreationProvider from "context/ProjectCreationProvider"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { Spinner } from "utils/Spinner"
import { t } from "utils/translationUtils";

import ColabsList from "./ColabsList"
import { TeamsSection } from "./DescriptionTeams"
import FileTables from "./FilesTable"
import ListStage from "./ListStage"
import TitleDate from "./TitleDate"

/**
 * @brief TextBoldBlock.
 */
const TextBoldBlock = styled(TextBold)`
  display: inline;
  border-bottom: ${(props) => (props.borderBottom ? props.borderBottom : "")};
  padding: 0px 8px 2px 8px;
  cursor: pointer;
`
/**
 * @brief default.
 */
const ProjectDashboard = () => {
  const projectData = useSelector((state) => state.projectReducer.project)

  const [view, setView] = useState("dashboard")

  return (
    <>
      {!projectData ? (
        <Spinner size={"large"} message="" />
      ) : (
        <>
          <StructureGrid
            leftChild={
              <TitleDate
                title={projectData.name}
                date={projectData.createdAt}
              />
            }
            rightChild={
              <ProjectCreationProvider>
                <ColabsList
                  collaborateurs={projectData.contributors}
                  chefId={projectData.chefId}
                />
              </ProjectCreationProvider>
            }
            spanLeft={12}
            spanRight={12}
            justify="space-around"
          />
          <DescriptionFeature
            margin="1rem 0 2rem 0"
            content={projectData.description}
          />
          <StructureGrid
            spanLeft={18}
            spanRight={6}
            align="bottom"
            leftChild={
              <>
                <TextBoldBlock
                  color={view === "dashboard" ? "#248BC0" : "#7A7A7A"}
                  borderBottom={
                    view === "dashboard" ? "3px solid #248BC0" : ""
                  }
                  style={{ margin: "0 2.5rem" }}
                  onClick={() => setView("dashboard")}
                >
                  {t('projectDashboard.bord')}
                </TextBoldBlock>
                <TextBoldBlock
                  color={view === "files" ? "#248BC0" : "#7A7A7A"}
                  borderBottom={view === "files" ? "3px solid #248BC0" : ""}
                  onClick={() => setView("files")}
                >
                  {t('projectDashboard.files')}
                </TextBoldBlock>
              </>
            }
            rightChild={
              <div>
                <TeamsSection />
              </div>
            }
          />
          <div>
            <HorizontalDivider margin="0" />
          </div>
          {view === "dashboard" ? (
            <ListStage />
          ) : (
            <ProjectCreationProvider>
              <FileTables />
            </ProjectCreationProvider>
          )}
        </>
      )}
    </>
  );
};

export default memo(ProjectDashboard);
