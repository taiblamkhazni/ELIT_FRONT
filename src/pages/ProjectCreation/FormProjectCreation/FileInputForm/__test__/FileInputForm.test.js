/**
 * @file FileInputForm.test.js
 * @brief Contient les tests unitaires pour le composant FileInputForm.
 */
import { ThemeProvider } from "styled-components";

import { render } from "@testing-library/react";
/**
 * @brief Importaion du @testing-library/user-event.
 */
import userEvent from "@testing-library/user-event";

/**
 * @brief Importation du composant FileInputForm pour le tester
 */
import FileInputForm from "../FileInputForm";
/**
 * @brief utilisée pour surcharger la fonction console.error pour empêche la console d'afficher les erreurs pendant l'exécution des tests.
 */
console.error = jest.fn();

const themeMock = {
  colors: {
    primaires: {
      blueLight: "#someColor",
      blueDark: "#someColor",
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
/**
 * @brief Création d'une varibale pour mocker le fichier TestFile.pdf
 */
let mockUploadedFiles = ["TestFile.pdf"];
/**
 * @brief Utilisation de Jest pour simuler le composant FileItem.
 */
jest.mock("../FileItem", () => {
  return (uploadedFiles) => (
    <table>{uploadedFiles ? uploadedFiles[0] : ""}</table>
  );
});

describe("I want to see the file drop window and be able to upload my files", () => {
  it("initially, file input form should be displayed to the user, with no projectcreation enabled and no uploadedfiles", () => {
    const { getByText, queryByText } = render(
      <ThemeProvider theme={themeMock}>
        <FileInputForm
          onChangeFileUpload={jest.fn()}
          uploadedFiles={[]}
          projectCreation={false}
        />
      </ThemeProvider>
    );

    expect(queryByText("Ajouter un fichier")).toBeInTheDocument();

    expect(
      getByText(
        "Importez depuis votre ordinateur ou glissez-déposez le fichier ici."
      )
    ).toBeInTheDocument();

    expect(
      getByText(
        "Formats acceptés (.pdf, .docx, .pptx) le poids autorisé est de 200MB maximum",
        {
          exact: false,
        }
      )
    ).toBeInTheDocument();

    expect(queryByText(mockUploadedFiles[0])).not.toBeInTheDocument();
  });

  it("if project creation is enabled and uploaded files exists, it should be displayed to the user", () => {
    const { getByText, queryByText } = render(
      <ThemeProvider theme={themeMock}>
        <FileInputForm
          onChangeFileUpload={jest.fn()}
          uploadedFiles={mockUploadedFiles}
        />
      </ThemeProvider>
    );

    expect(getByText(/importer des fichiers/i)).toBeInTheDocument();

    expect(
      getByText(
        "Pour faciliter l’analyse du projet, vous pouvez ajouter les documents suivants : le cahier des charges, la liste des exigences, l’étude d’opportunité,...",
        { exact: false }
      )
    ).toBeInTheDocument();

    expect(queryByText("Ajouter un fichier")).not.toBeInTheDocument();
  });

  it("should call onChangeFileUpload when a file is dropped", () => {
    const files = [
      new File(["testFileOne"], "test.json", { type: "application/json" }),
    ];

    const { getByTestId } = render(
      <ThemeProvider theme={themeMock}>
        <FileInputForm
          onChangeFileUpload={jest.fn()}
          uploadedFiles={[]}
          projectCreation={true}
        />
      </ThemeProvider>
    );
    const input = getByTestId("dropzone");

    userEvent.upload(input, files);

    expect(input.files).toHaveLength(1);
  });
});
