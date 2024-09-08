
import { ThemeProvider } from "styled-components";

import {render} from "@testing-library/react";

import GeneralInfoForm from "../GeneralInfoForm";

/** Mock react-hook-form*/
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn(() => ({
    control: {},
    handleSubmit: jest.fn(),
    formState: { errors: {} },
  })),
  Controller: jest.fn(({ render }) => render({
    field: { onChange: jest.fn(), onBlur: jest.fn(), value: '', name: 'inputName', ref: jest.fn() },
  })),
}));


/** Mock theme */
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


let mockErrors = {
  name: {
    message: "",
  },
  description: {
    message: "",
  },
  acceptTerms: {
    message: "",
  },
};
const mockControl = {};

describe("I want to see the general info form, inputs and errors and be able to interact with it", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("initially, informations and labels should be displayed to the user", () => {

    const { getByText } = render(
      <ThemeProvider theme={themeMock}>
        <GeneralInfoForm control={mockControl} errors={mockErrors} />
      </ThemeProvider>
    );

    expect(getByText("Décrire le projet")).toBeInTheDocument();
    expect(getByText("Nom du projet")).toBeInTheDocument();
    expect(getByText("Description du projet")).toBeInTheDocument();
    expect(getByText("Sensibilité des données")).toBeInTheDocument();
    expect(
      getByText(
        "Dans le cadre de l’utilisation de l’application ELIT, je m’engage à:"
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        "Je confirme avoir pris connaissance des conditions et je les accepte."
      )
    ).toBeInTheDocument();
  });

  it("if there are some errors, it should be displayed to the user", () => {
    mockErrors.name.message = "Veuillez renseigner le nom du projet.";
    mockErrors.description.message = "Veuillez renseigner la description du projet.";
    mockErrors.acceptTerms.message = "Veuillez accepter les conditions";

    const { getByText } = render(
      <ThemeProvider theme={themeMock}>
        <GeneralInfoForm control={mockControl} errors={mockErrors} />
      </ThemeProvider>
    );

    expect(getByText("Veuillez renseigner le nom du projet.")).toBeInTheDocument();
    expect(getByText("Veuillez renseigner la description du projet.")).toBeInTheDocument();
    expect(getByText("Veuillez accepter les conditions")).toBeInTheDocument();
  });

});
