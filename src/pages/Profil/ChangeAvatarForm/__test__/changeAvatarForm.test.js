/**
 * @file ChangeAvatarForm.test.js
 * @brief Ce fichier contient des tests pour le composant ChangeAvatarForm.
 */
import { ThemeProvider } from "styled-components";

import { render, screen } from '@testing-library/react';

import ChangeAvatarForm from "../ChangeAvatarForm";

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
    },
    secondaires: {
      grisLight: "#someColor",
    },
    avertissements: {
      danger: "red"
    }
  },
  fontWeights: {
    regular: "400",
  },
  lineHeights: {
    Deci: "1.5",
  },
};


describe("ChangeAvatarForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display the form properly", () => {
    const { getByText, getByRole } = render(
      <ThemeProvider theme={themeMock}>
        <ChangeAvatarForm />
      </ThemeProvider>
    );

    const image = getByRole('img');
    expect(image).toBeInTheDocument();

    const label = screen.getByText(/Importer une photo|Changer la photo/i);
    expect(label).toBeInTheDocument();

    const inputFile = document.getElementById('avatar-input');
    expect(inputFile).toBeInTheDocument();

    const text = getByText(/Formats autorisés .jpg .jpeg ou .png, taille maximale acceptée 800Ko./i);
    expect(text).toBeInTheDocument();
  });
});


