/**
 * @file BrainStormingAnswerForm.test.js
 * @brief Contient les tests unitaires pour le composant BrainStormingAnswerForm.
 */
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant BrainStormingAnswerForm pour le tester
 */
import BrainStormingAnswerForm from "../BrainStormingAnswerForm";

/**
 * @brief Importation du @testing-library/jest-dom.
 */
import "@testing-library/jest-dom";
/**
 * @brief utilisée pour surcharger la fonction console.error pour empêche la console d'afficher les erreurs pendant l'exécution des tests.
 */
console.error = jest.fn()

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
 * @brief Utilisation de Jest pour simuler EnhancedRate.
 */
jest.mock("pages/AnalyseMulticriteres/MiddleContent/EnhancedRage", () => {
  return ({ title, defaultValue }) => (
    <div>
      <label title={title}>{title}</label>
      <input type="text" defaultValue={defaultValue} />
    </div>
  );
}
);

describe("I can add or update my response for brainstorming part and see criterias with their values", () => {
  let mockQuestion = {
    questionRef: "question1",
    questionText: "This is a test question",
    answerText: "This is a test answer",
    criterias: [
      {
        criteriaName: "Second Criteria",
        criteriaValue: "2",
      },
      {
        criteriaName: "First Criteria",
        criteriaValue: "3",
      },
      { criteriaName: "Third Criteria" },
      { criteriaName: "Third Criteria" },
    ],
  };

  const mockValidation = {
    register: jest.fn().mockReturnValue({
      ref: {},
    }),
  };

  let mockErrors = {
    question1: {
      message: "",
    },
  };

  it("initially, the question and input answer should both be displayed", () => {
    render(
      <ThemeProvider theme={themeMock}>
        <BrainStormingAnswerForm
          validation={mockValidation}
          errors={mockErrors}
          question={mockQuestion}
        />
      </ThemeProvider>
    );

    expect(screen.getByText(/This is a test question/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Placeholder")).toBeInTheDocument();
  });

  it("when an answer already exist, it should be displayed", () => {
    render(
      <ThemeProvider theme={themeMock}>
        <BrainStormingAnswerForm
          validation={mockValidation}
          errors={mockErrors}
          question={mockQuestion}
        />
      </ThemeProvider>
    );

    expect(screen.getByPlaceholderText("Placeholder")).toHaveValue(
      "This is a test answer"
    );
  });

  it("when there is no answer, an empty textarea input should be displayed", () => {
    mockQuestion.answerText = "";

    render(
      <ThemeProvider theme={themeMock}>
        <BrainStormingAnswerForm
          validation={mockValidation}
          errors={mockErrors}
          question={mockQuestion}
        />
      </ThemeProvider>
    );

    expect(screen.getByPlaceholderText("Placeholder")).not.toHaveValue();
  });

  it("the user should be able to change the answer", () => {
    render(
      <ThemeProvider theme={themeMock}>
        <BrainStormingAnswerForm
          validation={mockValidation}
          errors={mockErrors}
          question={mockQuestion}
        />
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText("Placeholder");

    fireEvent.change(input, {
      target: { value: "This is a new answer" },
    });

    expect(input).toHaveValue("This is a new answer");
  });

  it("when there is an error, it should be displayed to the user", () => {
    mockErrors.question1.message =
      "Votre réponse ne doit pas dépasser les 400 caractères";

    render(
      <ThemeProvider theme={themeMock}>
        <BrainStormingAnswerForm
          validation={mockValidation}
          errors={mockErrors}
          question={mockQuestion}
        />
      </ThemeProvider>
    );

    const error = screen.getByText(
      "Votre réponse ne doit pas dépasser les 400 caractères"
    );

    expect(error).toBeInTheDocument();
  });

  it("the user should be able to see criterias in the correct order", () => {
    render(
      <ThemeProvider theme={themeMock}>
        <BrainStormingAnswerForm
          validation={mockValidation}
          errors={mockErrors}
          question={mockQuestion}
        />
      </ThemeProvider>
    );

    const criteriasArray = screen.getAllByText("Criteria", {
      exact: false,
    });

    expect(criteriasArray.length).toBe(4);
    expect(criteriasArray[0].textContent).toBe("First Criteria");
    expect(criteriasArray[1].textContent).toBe("Second Criteria");
    expect(criteriasArray[2].textContent).toBe("Third Criteria");
    expect(criteriasArray[3].textContent).toBe("Third Criteria");
  });

  it("when there is no criteria value, it shouldn't be displayed", () => {
    render(
      <ThemeProvider theme={themeMock}>
        <BrainStormingAnswerForm
          validation={mockValidation}
          errors={mockErrors}
          question={mockQuestion}
        />
      </ThemeProvider>
    );

    const criteriaElement = screen.getAllByText("Third Criteria");

    expect(criteriaElement[0]).not.toHaveValue();
  });
});
