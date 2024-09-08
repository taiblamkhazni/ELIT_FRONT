/**
 * @file ProjectList.js
 * @brief This module exports the ProjectList component.
 *
 * The ProjectList component renders a list of projects, each represented by a ProjectItem.
 * It allows users to interact with these projects, such as viewing details, archiving, or deleting them.
 * The component uses data from the Redux store and updates based on user actions and filters.
 * Each project item shows its name, description, creation date, and contributors.
 *
 * @returns {React.Component} The ProjectList component.
 */
import { useCallback, useEffect, useState } from "react";
import { Space } from "antd";
import { CustomUl } from "components/List/List";
import { ListProjectWrapper } from "components/Project/ListProjectWrapper/ListProjectWrapper";
import { Tab } from "components/Tab/Tab";
import { TabContainer } from "components/Tab/TabContainer/TabContainer";
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext";
import ModalUpdateProject from "pages/ProjectDetail/ModalUpdateProject";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProjectFetch } from "reducers/projects/projectsReducer";
import { Spinner } from "utils/Spinner";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";
import { t } from "utils/translationUtils";
import { setProjectFiltersWithData } from "utils/utils";

import { ProjectItem } from "../ProjectItem/ProjectItem";

import "./ListProjects.css";

/**
 * This module exports the ProjectList component.
 *
 * @param props the props.
 */
export default () => {
  let navigate = useNavigate()
  const {
    setCountNumberProjects,
    projectSearchText,
    sortProjectsByDate,
    sortProjectsByStatus,
    projectsFilter,
    setProjectsFilter,
  } = useProjectCreationContext()

  const dispatch = useDispatch()

  const data = useSelector((state) => state.projectsReducer.projects)
  const isLoading = useSelector((state) => state.projectsReducer.isLoading);
  const user = useSelector((state) => state.userReducer.userInfo);
  /**
 * @brief Select the current user from the authentication reducer in the Redux store.
 */
  const curentUser = useSelector((state) => state.authentificationReducer?.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("createdProjectsTab");
  const [selectedProject, setSelectedProject] = useState({
    projectId: null,
    projectName: "",
    description: "",
    chefId: null
  });
  const createdProjects = () =>
    projectsFilter.filter((obj) => {
      return (
        obj?.chefId === user.userId
      );
    });

  const affectedProjects = () =>
    projectsFilter.filter((obj) => {
      return (
        obj?.chefId !== user.userId
      );
    });

  const projectsFilteredByCreator =
    activeTab === "createdProjectsTab" ? createdProjects() : affectedProjects();

  useEffect(() => {
    setCountNumberProjects(projectsFilter.length)
  }, [projectsFilter.length, setCountNumberProjects])

  useEffect(() => {
    setProjectsFilter(
      setProjectFiltersWithData(
        data,
        projectSearchText,
        sortProjectsByDate,
        sortProjectsByStatus
      )
    )
  }, [
    data,
    projectSearchText,
    sortProjectsByDate,
    sortProjectsByStatus,
    setProjectsFilter,
  ])

  const onDeleteProjetById = useCallback((projectId, projectName) => {
    SwalWithBootstrapButtons.fire({
      title: `${t('projectCreation.listProjects.deleteProject.title')} ${projectName} ?`,
      text: t('projectCreation.listProjects.deleteProject.title'),
      showCancelButton: true,
      confirmButtonColor: "#10B581",
      cancelButtonColor: "#C91432",
      confirmButtonText: t('projectCreation.listProjects.deleteProject.confirmButton'),
      cancelButtonText: t('projectCreation.listProjects.deleteProject.cancelButton'),
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProjectFetch(projectId));
      }
    });
  }, [dispatch])

  const onUpdateProjetById = useCallback((projectId, projectName, description, chefId) => {
    if (curentUser?.id === chefId) {
      setSelectedProject({ projectId, projectName, description, chefId });
      setIsModalOpen(true);
    }
  }, [curentUser?.id]);


  return (
    <ListProjectWrapper>
      <TabContainer>
        <Space>
          <Tab
            id="texte-Mesprojetscrees"
            $isactive={activeTab === "createdProjectsTab"}
            onClick={() => setActiveTab("createdProjectsTab")}
          >
            {t('projectCreation.listProjects.createdProjects')}{" "}({createdProjects().length})
          </Tab>
        </Space>
        <Space>
          <Tab
            id="texte-Mesprojetsaffectes"
            $isactive={activeTab === "affectedProjectsTab"}
            onClick={() => setActiveTab("affectedProjectsTab")}
          >
            {t('projectCreation.listProjects.affectedProjects')}{" "}({affectedProjects().length})
          </Tab>
        </Space>
      </TabContainer>

      {!isLoading ? (
        projectsFilteredByCreator.length > 0 ? ( // Check if there are projects to display
          <CustomUl>
            {projectsFilteredByCreator.map((project) => (
              <ProjectItem
                key={project.projectId}
                project={project}
                onDelete={onDeleteProjetById}
                onUpdate={onUpdateProjetById}
                navigate={navigate}
              />
            ))}
          </CustomUl>
        ) : (
          <div className="no-projects-message">
            <h2 id="texte-aucunprojet">{t('projectCreation.listProjects.noProjects')}</h2>
          </div>
        )
      ) : (
        <Spinner size={"medium"} message="" />
      )}
      < ModalUpdateProject chefId={selectedProject.chefId} id={selectedProject.projectId} name={selectedProject.projectName}
        description={selectedProject.description} isModalOpen={isModalOpen} handleOk={() => setIsModalOpen(false)}
        handleCancel={() => setIsModalOpen(false)} />
    </ListProjectWrapper>
  );
}
