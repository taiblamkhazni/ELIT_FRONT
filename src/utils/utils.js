/**
 * @file utils.js
 * @brief This module exports the utils.
 * The utils file renders a list of utils.
 */

/* START LIST PROJECTS */
/**
 * @brief sortByDate.
 * @param {boolean} sortProjectsByDate boolean.
 * @param projectsFilter filter to apply.
 * @return Array of projects sorted by date.
 */
export const sortByDate = (sortProjectsByDate, projectsFilter) => {
  if (sortProjectsByDate) {
    return projectsFilter.sort((a, b) => {
      a = new Date(a.createdAt);
      b = new Date(b.createdAt);
      return a - b;
    });
  } else {
    return projectsFilter.sort((a, b) => {
      a = new Date(a.createdAt);
      b = new Date(b.createdAt);
      return b - a;
    });
  }
};
/**
 * @brief setProjectFiltersWithData.
 * @param {object} data the data received.
 * @param {string} projectSearchText Text to search.
 * @param {boolean} sortProjectsByDate Boolean.
 * @param {boolean} sortProjectsByStatus Boolean.
 * @return component.
 */
export const setProjectFiltersWithData = (
  data,
  projectSearchText,
  sortProjectsByDate,
  sortProjectsByStatus
) => {
  if (data && data.length > 0) {
    // If filtering the projets by status
    if (sortProjectsByStatus) {
      return sortByDate(
        sortProjectsByDate,
        data.filter(
          (e) =>
            e.name.toLowerCase().includes(projectSearchText) ||
            e.description.toLowerCase().includes(projectSearchText)
        )
      ).reduce((acc, project) => {
        if (
          (project.isArchived && sortProjectsByStatus === "ARCHIVED") ||
          (!project.isArchived &&
            project.confirmationState === sortProjectsByStatus)
        ) {
          acc = [...acc, project];
        }
        return acc;
      }, []);
    }

    // Return all projects with their status
    return sortByDate(
      sortProjectsByDate,
      data.filter(
        (e) =>
          e.name.toLowerCase().includes(projectSearchText) ||
          e.description.toLowerCase().includes(projectSearchText)
      )
    );
  }
  return [];
};

/* END LIST PROJECTS */

/* START PROJECTS */

/**
 * Determines the color for a project's status button.
 *
 * @param {boolean} isArchived - Whether the project is archived.
 * @param {string} confirmationState - The confirmation state of the project.
 *
 * @returns {string} The color based on the project's status.
 */
export const getOptionalColor = (isArchived, confirmationState) => {
  if (isArchived) return "#7A7A7A";
  if (confirmationState === "WAITING") return "#E88774";
  if (confirmationState === "CONFIRMED") return "#10B581";
  return "#7A7A7A";
};

/**
 * Determines the status label for a project.
 *
 * @param {boolean} isArchived - Whether the project is archived.
 * @param {string} confirmationState - The confirmation state of the project.
 *
 * @returns {string} The status label based on the project's state.
 */
export const getProjectStatus = (isArchived, confirmationState) => {
  if (isArchived) return "Archivé";
  if (confirmationState === "WAITING") return "En attente";
  return "Confirmé";
};

/* END PROJECTS */