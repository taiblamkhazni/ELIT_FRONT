/**
 * @file ChangePasswordForm.test.js
 * @brief Ce fichier contient des tests pour le composant ChangePasswordForm.
 */
import { act } from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen } from '@testing-library/react';

import ChangePasswordForm from '../ChangePasswordForm';

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


describe('ChangePasswordForm', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not call submit button", async () => {
    const mockOnSubmit = jest.fn();

    render(
      <ThemeProvider theme={themeMock}>
        <ChangePasswordForm onSubmit={mockOnSubmit} />
      </ThemeProvider>
    );

    fireEvent.submit(screen.getByRole("button"));

    expect(mockOnSubmit).not.toBeCalled();
  });

  it("should display matching error when paswword is in invalid format", async () => {
    const { getByLabelText, container } = render(
      <ThemeProvider theme={themeMock}>
        <ChangePasswordForm />
      </ThemeProvider>
    );

    await act(async () => {
      const newPasswordInput = getByLabelText(/Nouveau mot de passe/i);
      fireEvent.change(newPasswordInput, { target: { value: "wrongValue" }, });
      fireEvent.blur(newPasswordInput);
    });
    expect(container.innerHTML).toMatch(
      "Veuillez vérifier que le mot de passe inscrit comporte bien les caractères recommandés."
    );
  });

  it("should display error when paswword and confirm password does not match", async () => {
    const { getByLabelText, container } = render(
      <ThemeProvider theme={themeMock}>
        <ChangePasswordForm />
      </ThemeProvider>
    );

    await act(async () => {
      const newPasswordInput = getByLabelText(/Nouveau mot de passe/i);
      const confirmPasswordInput = getByLabelText(
        /Confirmation du mot de passe/i
      );
      fireEvent.change(newPasswordInput, { target: { value: "Azerty1234!?" } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: "differetnValue" },
      });
      fireEvent.blur(confirmPasswordInput);
    });
    expect(container.innerHTML).toMatch(
      "Les mots de passes ne sont pas identiques."
    );
  });
});
