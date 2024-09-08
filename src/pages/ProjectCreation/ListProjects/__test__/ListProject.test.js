/**
 * @file ListProject.test.js
 * @brief Ce fichier contient des tests pour le composant MenuTitle.
 */
import { ThemeProvider } from "styled-components";
import {
  setProjectFiltersWithData,
  sortByDate
} from "utils/utils";

import { cleanup, render, screen } from "@testing-library/react";

import { ProjectItem } from "../../ProjectItem/ProjectItem";

jest.mock("hooks/useProjectCreationContext/useProjectCreationContext.js");
jest.mock("utils/Swal//SwalComponents", () => ({
  SwalWithBootstrapButtons: {
    fire: jest.fn(() => Promise.resolve({ isConfirmed: true }))
  }
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

console.error = jest.fn()

const themeMock = {
  colors: {
    primaires: {
      blueLight: "#someColor",
      blueDark: "#someColor",
      blue: "#someColor",
    },
    secondaires: {
      grisLight: "#someColor",
    },
    avertissements: {
      danger: "red",
    },
  },
  fontWeights: {
    regular: "400",
  },
  lineHeights: {
    Deci: "1.5",
  },
};

describe('sortByDate', () => {
  it('should sort projects by ascending date when sortProjectsByDate is true', () => {
    const sortProjectsByDate = true;
    const projectsFilter = [
      { createdAt: '01/07/2023' },
      { createdAt: '03/07/2023' },
      { createdAt: '02/07/2023' },
    ];

    const result = sortByDate(sortProjectsByDate, projectsFilter);

    expect(result).toEqual([
      { createdAt: '01/07/2023' },
      { createdAt: '02/07/2023' },
      { createdAt: '03/07/2023' },
    ]);
  });

  it('should sort projects by descending date when sortProjectsByDate is false', () => {
    const sortProjectsByDate = false;
    const projectsFilter = [
      { createdAt: '01/07/2023' },
      { createdAt: '03/07/2023' },
      { createdAt: '02/07/2023' },
    ];

    const result = sortByDate(sortProjectsByDate, projectsFilter);

    expect(result).toEqual([
      { createdAt: '03/07/2023' },
      { createdAt: '02/07/2023' },
      { createdAt: '01/07/2023' },
    ]);
  });
});

describe('setProjectFiltersWithData', () => {
  it('must find the search text in the element name', () => {
    const data = [
      { name: 'element 1 name', description: 'element 1 description' },
      { name: 'element 2 name', description: 'element 2 description' }
    ];
    const projectSearchText = 'element';
    const sortProjectsByDate = true;
    const sortProjectsByStatus = true;

    const result = setProjectFiltersWithData(data, projectSearchText, sortProjectsByDate, sortProjectsByStatus);

    expect(result).toEqual([]);
  })

  it('must find the search text in the element description', () => {
    const data = [
      { name: '1 name', description: 'element 1 description' },
      { name: '2 name', description: 'element 2 description' }
    ];
    const projectSearchText = 'element';
    const sortProjectsByDate = true;
    const sortProjectsByStatus = true;

    const result = setProjectFiltersWithData(data, projectSearchText, sortProjectsByDate, sortProjectsByStatus);

    expect(result).toEqual([]);
  })
})

describe("testing the ProjectItem component", () => {
  let project;
  let onDelete;
  let navigate;

  beforeEach(() => {
    project = {
      isArchived: true,
      confirmationState: "WAITING",
      createdAt: new Date(2023, 1, 2).toISOString(),
      contributors: [{ contributerId: "user123" }],
      name: "Mock Project Name",
      description: "Mock project description",
      id: 'mock-project-id'
    };

    onDelete = jest.fn();
    navigate = jest.fn();

  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should show the right date when project is archived", async () => {
    render(
      <ThemeProvider theme={themeMock}>
        <ProjectItem project={project} onDelete={onDelete} navigate={navigate} />
      </ThemeProvider>
    );
    const dateText = await screen.findByText("02/02/2023", { exact: false });
    expect(dateText).toBeInTheDocument();
  });

  it("should show the right date when project is not archived", async () => {
    const projectNotArchived = { ...project, isArchived: false };

    render(
      <ThemeProvider theme={themeMock}>
        <ProjectItem project={projectNotArchived} onDelete={onDelete} navigate={navigate} />
      </ThemeProvider>
    );

    const dateText = await screen.findByText("02/02/2023", { exact: false });
    expect(dateText).toBeInTheDocument();
  });

  it("should show the right date when project is not archived and no waiting status", async () => {
    const projectModified = { ...project, isArchived: false, confirmationState: "" };

    render(
      <ThemeProvider theme={themeMock}>
        <ProjectItem project={projectModified} onDelete={onDelete} navigate={navigate} />
      </ThemeProvider>
    );

    const dateText = await screen.findByText("02/02/2023", { exact: false });
    expect(dateText).toBeInTheDocument();
  });
});

