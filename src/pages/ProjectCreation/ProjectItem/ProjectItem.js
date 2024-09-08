/**
 * @file ProjectItem.js
 * @brief This module exports the ProjectItem component.
 *
 * The ProjectItem component renders a list of projects, each represented by a ProjectItem.
 * It allows users to interact with these projects, such as viewing details, archiving, or deleting them.
 * The component uses data from the Redux store and updates based on user actions and filters.
 * Each project item shows its name, description, creation date, and contributors.
 */

/**
 * @brief React imports
 */
import { useCallback, useEffect, useState } from "react"; // React hooks for managing state and effects
/**
 * @brief Ant Design components
 */
import { Col, Dropdown, Row } from "antd"; // Ant Design components for layout and dropdown functionality
/**
 * @brief Icon and image imports
 */
import MoreVertical from "assets/icons/symbols/more-vertical"; // MoreVertical icon for dropdown menu
import avatarDefault from "assets/images/avatarDefault.jpg"; // Default avatar image if user has no avatar set
/**
 * @brief Project component imports
 */
import { ProjectDescription } from "components/Project/ProjectDescription/ProjectDescription"; // Project description component
import { ProjectItemContent } from "components/Project/ProjectItemContent/ProjectItemContent"; // Component for rendering project item content
import { ProjectItemFooter } from "components/Project/ProjectItemFooter/ProjectItemFooter"; // Component for rendering project item footer
import { ProjectItemWrapper } from "components/Project/ProjectItemWrapper/ProjectItemWrapper"; // Component for wrapping project item content
import { ProjectTitle } from "components/Project/ProjectTitle/ProjectTitle"; // Component for rendering project title
/**
 * @brief Date handling imports
 */
import { format, parseISO } from "date-fns"; // Date formatting functions from date-fns library
/**
 * @brief API and Redux imports
 */
import { getAvatarByUserIdApi } from "hooks/apis/UserApi"; // API function for fetching avatar URLs by user ID
import { useDispatch, useSelector } from "react-redux"; // Redux hook for accessing state from the Redux store
import { setProjectId } from "reducers/project/projectReducer";
/**
 * @brief Common and utility imports
 */
import ROUTES from "routes/routes"; // Common routes used for navigating within the application
/**
 * @brief Styled-components and theme imports
 */
import styled from "styled-components"; // styled-components library for styling React components
import { base as graphiqueChart } from "theme/base"; // Base theme for graphiqueChart
/**
 * @brief Translation and utility imports
 */
import { t } from "utils/translationUtils"; // Utility function for translation

/**
 * @brief Additional project-specific components
 */
import AnalysisStatusComponent from "../ListProjects/AnalysisStatus/AnalysisStatusComponent"; // Component for rendering analysis status in project list
import { MoreOptionsMenu } from "../ListProjects/MoreOptionsMenu/MoreOptionsMenu"; // Component for rendering more options menu in project list

/**
 * @brief Styled component for the status container.
 */
const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

/**
 * @brief Styled component for the custom project description.
 */
const CustomProjectDescription = styled(ProjectDescription)`
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 20px;
`;

/**
 * @brief Styled component for the footer.
 */
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondaires.gris};
`;

/**
 * @brief Styled component for the collaborators section.
 */
const Collaborators = styled.div`
  display: flex;
  align-items: center;

  & > img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }

  & > span {
    font-size: 14px;
    color: #6c757d;
  }
`;

/**
 * @brief Styled component for the creator section.
 */
const Creator = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;

  & > img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }

  & > span {
    font-size: 14px;
    color: #6c757d;
  }

  & > span.bold {
    font-weight: bold;
  }
`;

/**
 * @brief The ProjectItem component.
 * @param {Object} project - The project to display.
 * @param {Function} onDelete - The function to call when deleting a project.
 * @param {Function} onUpdate - The function to call when updating a project.
 * @param {Function} navigate - The function to call when navigating to a project.
 * @returns {React.Component} The ProjectItem component.
 */
export const ProjectItem = ({ project, onDelete, onUpdate,navigate }) => {
  /**
   * @brief Select the current user from the authentication reducer in the Redux store.
   */
  const curentUser = useSelector((state) => state.authentificationReducer?.user);


  const [avatarUrls, setAvatarUrls] = useState({});
  const dispatch = useDispatch();
  /**
   * @brief Handles the click event on the project item.
   * @param {Object} e - The click event.
   **/
  const handleClickStructureGrid = useCallback(() => {
    dispatch(setProjectId(project.projectId))
     navigate(`${ROUTES.projets}/${project.projectId}`);
  }, [navigate, project,dispatch]);

  /**
   * @brief Fetches the avatar URL for a given user ID from the API.
   * @param {string} userId - The ID of the user whose avatar URL is to be fetched.
   * @returns {Promise<string>} - Resolves to the avatar URL for the user.
   */
  const getAvatarUrl = (userId) => {
    return getAvatarByUserIdApi(userId).then((res) => res);
  }

  useEffect(() => {
    /**
     * @brief Fetches avatar URLs for all contributors of the project and updates state.
     */
    async function fetchAvatarUrls() {
      const urls = {};
      for (const contributor of project.contributors) {
          const avatarUrl = await getAvatarUrl(contributor.contributerId);
          urls[contributor.contributerId] = avatarUrl || avatarDefault;
      }
      setAvatarUrls(urls);
    }
    fetchAvatarUrls();
  }, [project.contributors]);

  /**
   * @brief Returns the JSX for rendering the ProjectItem component.
   */
  return (
    <ProjectItemWrapper key={project.projectId}>
      <ProjectItemContent
        background={
          project.isArchived || project.confirmationState === "WAITING"
            ? graphiqueChart.backgrounds.white
            : "white"
        }
      >
        <Row justify="space-between">
          <Col onClick={handleClickStructureGrid}>
            <ProjectTitle>{project.name}</ProjectTitle>
          </Col>
          <Col span={18} style={{ cursor: "pointer" }} onClick={handleClickStructureGrid}>
            <StatusContainer>
              <AnalysisStatusComponent multiCriteriaStatus={project.multiCriteriaStatus} />
            </StatusContainer>
          </Col>
          <Col>
            <span>{t('projectCreation.projectItem.createdAt')}{" "}{format(parseISO(project.createdAt), "dd/MM/yyyy")}</span>
          </Col>
          <Col>
            <Dropdown
              overlay={
                <MoreOptionsMenu
                  projectId={project.projectId}
                  multiCriteriaStatus={project.multiCriteriaStatus}
                  projectName={project.name}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                  chefId={project.chefId}
                  description={project.description}
                />
              }
              placement="bottomRight"
            >
              <a id="option-projet" href="/#" onClick={(e) => e.preventDefault()}>
                <MoreVertical id="projet-option" />
              </a>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <CustomProjectDescription>
            {project.description ? project.description : "No description"}
          </CustomProjectDescription>
        </Row>
      </ProjectItemContent>
      <Row align="middle" className="mx-20">
        <Col span={12}>
          <Row align="middle">
            <ProjectItemFooter justify="start" align="middle">
              <Footer>
                {
                  // Display collaborators only if there are collaborators other than the project creator
                  project.contributors.filter(contributor => contributor.contributerId !== project?.chefId).length > 0 && (
                    <Collaborators>
                      {project.contributors
                        .filter(contributor => contributor.contributerId !== project?.chefId)
                        .map((contributor, index) => (
                          <img
                            key={index}
                            src={avatarUrls[contributor.contributerId]}
                            alt={`${contributor.lastName} ${contributor.firstName}`}
                          />
                        ))
                      }
                      <span className="text-bold">{project.contributors.filter(contributor => contributor.contributerId !== project?.chefId).length} {t('projectCreation.projectItem.collaborator')}{project.contributors?.length > 2 ? "s" : ""}</span>
                    </Collaborators>
                  )
                }
                <Creator>
                  <img src={avatarUrls[project?.chefId]||avatarDefault} alt="creator" />
                  {t('projectCreation.projectItem.createdBy')}{" "}
                  <span className="text-bold" style={{ marginLeft: '5px' }}>
                    {curentUser?.id === project?.chefId ? t('projectCreation.projectItem.moi') : `${project?.chefLasName} ${project?.chefFirstName}`}
                  </span>
                </Creator>
              </Footer>
            </ProjectItemFooter>
          </Row>
        </Col>
      </Row>
    </ProjectItemWrapper>
  );
};
