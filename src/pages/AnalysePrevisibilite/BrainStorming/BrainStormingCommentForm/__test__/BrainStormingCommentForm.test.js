/**
 * @file BrainstormingCommentForm.test.js
 * @brief Contient les tests unitaires pour le composant BrainstormingCommentForm.
 */
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant BrainstormingCommentForm pour le tester
 */
import BrainstormingCommentForm from "../BrainStormingCommentForm";
/**
 * @brief Création d'un thème simulé pour le Provider de styled-components
 */
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
      succes: "#10B581",
      danger: "#C91432",
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
 * @brief Utilisation de Jest pour simuler la fonction register.
 */
const register = jest.fn();
/**
 * @brief Création d'un objet errors simulé.
 */
const errors = {
  brainstormingText: {
    message: "",
  },
};

describe("I can update or add a comment for brainstorming part", () => {
  it("should display an error message when there are errors", () => {
    const errorsMock = {
      brainstormingText: { message: "Erreur de texte de brainstorming" },
    };

    render(
      <ThemeProvider theme={themeMock}>
        <BrainstormingCommentForm
          register={register}
          errors={errorsMock}
          content=""
        />
      </ThemeProvider>
    );

    expect(
      screen.getByText("Erreur de texte de brainstorming")
    ).toBeInTheDocument();
  });

  it("should display textarea input correctly when the user interacts with it", () => {
    render(
      <ThemeProvider theme={themeMock}>
        <BrainstormingCommentForm
          register={register}
          errors={errors}
          content=""
        />
      </ThemeProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Proposer une action, poser une question, ajouter une idéé ..."), {
      target: { value: "Nouveau texte" },
    });

    expect(screen.getByPlaceholderText("Proposer une action, poser une question, ajouter une idéé ...").value).toBe(
      "Nouveau texte"
    );
  });
});
