/**
 * @file MoreOptionsMenu.js
 * @brief This module exports the MoreOptionsMenu component.
 */
import { Menu } from "antd";
import { t } from "utils/translationUtils";

/**
 * @var MoreOptionsMenu
 * @brief MoreOptionsMenu.
 */
export const MoreOptionsMenu = ({
  projectId,
  projectName,
  multiCriteriaStatus,
  onDelete,
  onUpdate,
  chefId,
  description
}) => {

  if (multiCriteriaStatus === "DONE") {
    return (
      <Menu
        items={[
          { key: "1", label: t('projectCreation.moreOptions.restartCollabAnalysis') },
          { key: "2", label: t('projectCreation.moreOptions.startAIAnalysis') },
          {
            key: "3", label: (
              <a
                id="update-projet"
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  onUpdate(projectId, projectName, description, chefId);
                }}
              >
                {t('projectCreation.moreOptions.modifyProject')}
              </a>
            ),
          },
          {
            key: "4",
            label: (
              <a
                id="suppression-projet"
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(projectId, projectName);
                }}
              >
                Supprimer le projet
              </a>
            ),
          },
        ]}
      />
    );
  }
  return (
    <Menu
      items={[
        { key: "1", label: t('projectCreation.moreOptions.startAnalysis') },
        {
          key: "2", label: (
            <a
              id="update-projet"
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                onUpdate(projectId, projectName, description, chefId);
              }}
            >
              {t('projectCreation.moreOptions.modifyProject')}
            </a>
          ),
        },
        {
          key: "3",
          label: (
            <a
              id="suppression-projet"
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                onDelete(projectId, projectName);
              }}
            >
              {t('projectCreation.moreOptions.deleteProject')}
            </a>
          ),
        },
      ]}
    />
  );
};
