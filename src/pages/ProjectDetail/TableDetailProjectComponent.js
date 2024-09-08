/**
 * @file TableDetailProjectComponent.js
 * @brief Table for details element in a dedicated project
 *
 * This component displays a table containing either files or contributors related to a specific project.
 */

import { useState } from "react";
import { Flex, Tabs } from "antd";
import ProjectCreationProvider from "context/ProjectCreationProvider";
import { useSelector } from "react-redux";
import { t } from "utils/translationUtils";

import ContributorsProjectDetails from "./ContributorsProjectDetails/ContributorsProjectDetails";
import FilesProjectDetails from "./FilesProjectDetails/FilesProjectDetails";

/**
 * @brief Main component for displaying the table of files or contributors
 * @param props props related to the project
 * @param chefId id of the project chef
 */
export default function TableDetailProjectComponent({
  projectId,
  chefId,
}) {
  const [menu, setMenu] = useState("files");
  const attachments = useSelector((state) => state.projectReducer.attachments)
  const contributors = useSelector(state => state.projectReducer.project.contributors)

  /**
   * @brief Function to handle menu change
   */
  const onChangeMenu = (key) => {
    setMenu(key);
  };
  const items = [
    {
      key: "files",
      label: t('projectDetails.filesLabel'),
    },
    {
      key: "staff",
      label: t('projectDetails.staffLabel'),
    },
  ];
  return (
    <ProjectCreationProvider>
      <Tabs id={menu == "files"?"tableau-fichier":"tableau-collaborateur"} defaultActiveKey={menu} items={items} onChange={onChangeMenu} />
      <Flex
        vertical

      >
        {menu === "files" ? (
          <FilesProjectDetails
            data-testid="files-project-details"
            attachments={attachments}
            projectId={projectId}
            chefId={chefId}
          />
        ) : (
          <ContributorsProjectDetails
            data-testid="contributors-project-details"
            contributors={contributors}
            chefId={chefId}
          />
        )}
      </Flex>
    </ProjectCreationProvider>
  );
}
