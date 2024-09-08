/**
 * @file MoreOptionsMenu.test.js
 * @brief Ce fichier contient des tests pour le composant MoreOptionsMenu.
 */
import { fireEvent, render } from "@testing-library/react";

import { MoreOptionsMenu } from "../MoreOptionsMenu";

import "@testing-library/jest-dom/extend-expect";

describe("MoreOptionsMenu", () => {
  const projectId = "123";
  const projectName = "Test Project";
  const onDeleteMock = jest.fn();

  test("renders MoreOptionsMenu with collaborative analysis when multiCriteriaStatus is DONE", () => {
    const { getByText } = render(
      <MoreOptionsMenu
        projectId={projectId}
        projectName={projectName}
        multiCriteriaStatus="DONE"
        onDelete={onDeleteMock}
      />
    );

    expect(getByText("Reprendre analyse collaborative")).toBeInTheDocument();
    expect(getByText("Lancer une analyse IA")).toBeInTheDocument();
    expect(getByText("Modifier le projet")).toBeInTheDocument();
    expect(getByText("Supprimer le projet")).toBeInTheDocument();

    fireEvent.click(getByText("Supprimer le projet"));
    expect(onDeleteMock).toHaveBeenCalledWith(projectId, projectName);
  });

  test("renders MoreOptionsMenu without collaborative analysis when multiCriteriaStatus is not IN_PROGRESS", () => {
    const { getByText } = render(
      <MoreOptionsMenu
        projectId={projectId}
        projectName={projectName}
        multiCriteriaStatus={"NOT_STARTED"}
        onDelete={onDeleteMock}
      />
    );

    expect(getByText("Lancer une analyse")).toBeInTheDocument();
    expect(getByText("Modifier le projet")).toBeInTheDocument();
    expect(getByText("Supprimer le projet")).toBeInTheDocument();

    fireEvent.click(getByText("Supprimer le projet"));
    expect(onDeleteMock).toHaveBeenCalledWith(projectId, projectName);
  });

  // TODO: Add more tests when IA analysis is available
});
