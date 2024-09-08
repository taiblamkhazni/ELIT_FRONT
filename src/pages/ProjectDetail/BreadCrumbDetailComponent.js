/**
 * @file BreadCrumbDetailComponent.js
 * @brief BreadCrumbDetailComponent allows navigation between project views.
 */

import { Breadcrumb, ConfigProvider } from "antd";
import { useLocation } from "react-router-dom";
import { base as graphiqueChart } from "theme/base";
import { t } from "utils/translationUtils";



/**
 * @brief BreadCrumbDetailComponent : Displays breadcrumbs for navigation between different project views.
 * The rendered breadcrumb component.
 */
export default function BreadCrumbDetailComponent({analyseType}) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const filteredPathnames = [...pathnames];
  if (filteredPathnames[filteredPathnames.length - 1] === "brainstorming") {
    filteredPathnames.pop();
  }
  /**
   * @brief navItems : Array of navigation items for the breadcrumb.
   */
  const navItems = filteredPathnames.map((value, index) => {
    if (value === "projets") {
      return {
        title: t('projectDetails.allProjects'),
        href: "/projets",
      };
    }

    if (analyseType === "manual") {
      if (value.includes("etape")) {
        return {
          title: t('projectDetails.collabAnalysis'),
        };
      }
    }

    if(analyseType === "ia") {
      // Prepare for IA breadcrumb
      // return {
      //   title: t('projectDetails.aiAnalysis'),
      // };
      return
    }

    if (typeof parseInt(value) === 'number') {
      if (index === filteredPathnames.length - 1) {
        return {
          title: t('projectDetails.projectBoard'),
        };
      }
      return {
        title: t('projectDetails.projectBoard'),
        href: `/projets/${value}`,
      };
    }
  });

  return (
    <ConfigProvider
      theme={{
        components: {
          Breadcrumb: {
            linkColor: graphiqueChart.colors.primaires.blue,
            lastItemColor: graphiqueChart.colors.primaires.blueDark,
            fontSize: graphiqueChart.fontSizes.Deci,
          },
        },
      }}
    >
      <Breadcrumb
      id="ariane-projet"
        separator=">"
        items={navItems}
        style={{
          fontWeight: 500,
          lineHeight: "24px",
          marginBottom: "1rem",
        }}
      />
    </ConfigProvider>
  );
}
