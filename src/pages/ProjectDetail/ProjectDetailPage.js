/**
 * @file ProjectDetailPage.js
 * @brief Project detail page for one  selected project
 */
import { ConfigProvider } from "antd";
import BreadCrumbDetailComponent from "pages/ProjectDetail/BreadCrumbDetailComponent";
import DetailProjectComponent from "pages/ProjectDetail/DetailProjectComponent";
import TableDetailProjectComponent from "pages/ProjectDetail/TableDetailProjectComponent";
import { useSelector } from "react-redux";
import { base as graphiqueChart } from "theme/base";

/**
 * @brief ProjectDetailPage : Renders the project detail page for a selected project.
 * The rendered component.
 */
const ProjectDetailPage = () => {

  const projectData = useSelector((state) => state.projectReducer.project);

  const dateCreated = new Date(projectData?.createdAt);

  const day = dateCreated.getDate();
  const month = dateCreated.getMonth() + 1;
  const year = dateCreated.getFullYear();

  let createdAtFormated = day + "/" + month + "/" + year;

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              colorPrimary: graphiqueChart.colors.primaires.blue,
              buttonSolidCheckedHoverBg: graphiqueChart.colors.primaires.blue,
              buttonBg: "#E2F0F9",
              buttonColor: "#6A6A6A",
            },
            Button: {
              colorPrimary: graphiqueChart.colors.primaires.blue,
              colorPrimaryHover: graphiqueChart.colors.secondaires.blue,
              fontSize: graphiqueChart.fontSizes.Deci,
            },
            Tabs: {
              inkBarColor: graphiqueChart.colors.primaires.blue,
              itemSelectedColor: graphiqueChart.colors.primaires.blue,
              itemHoverColor: graphiqueChart.colors.primaires.blue,
            },
          },
        }}
      >
        <BreadCrumbDetailComponent />
        <DetailProjectComponent
          chefId={projectData.chefId}
          id={projectData.projectId}
          createdAtFormated={createdAtFormated}
          name={projectData.name}
          description={projectData.description}
        />
        <TableDetailProjectComponent
          chefId={projectData.chefId}
          projectId={projectData.projectId}
        />
      </ConfigProvider>
    </>
  );
}

export default ProjectDetailPage;
