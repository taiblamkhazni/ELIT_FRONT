/**
 * @file AvatarCustomUrl.test.js
 * @brief Contient les tests unitaires pour le composant AvatarCustomUrl.
 */
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant AvatarCustomUrl pour le tester.
 */
import AvatarCustomUrl from "../AvatarCustomUrl";
/**
 * @brief Importation du composant useAvatarUrl pour l'utiliser dans teste.
 */
import useAvatarUrl from "../useAvatarUrl";
/**
 * @brief Utilisation de Jest pour simuler le composant useAvatarUrl .
 */
jest.mock("../useAvatarUrl", () => jest.fn());
/**
 * @brief Création d'une variable simulé pour l'objet Colaborateur.
 */
const mockColab = {
  contributerId: "1",
  firstName: "John",
  lastName: "Doe",
};
/**
 * @brief Création d'un thème simulé pour le Provider de styled-components
 */
const mockTheme = {
  colors: {
    secondaires: {
      grisLight: "#00",
    },
  },
};

describe("I want to see collaborator avatar", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should displays an avatar with the entire title", () => {
    useAvatarUrl.mockReturnValueOnce("https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png");

    render(
      <ThemeProvider theme={mockTheme}>
        <AvatarCustomUrl colab={mockColab} />
      </ThemeProvider>
    );

    const image = screen.getByRole("img", {
      name: `${mockColab.firstName} ${mockColab.lastName}`,
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png");
    expect(image).toHaveAttribute("height", "32px");
    expect(image).toHaveAttribute("width", "32px");
  });

  it("should use the default avatar when nothing is returned by hook", () => {
    useAvatarUrl.mockReturnValueOnce(null);

    render(
      <ThemeProvider theme={mockTheme}>
        <AvatarCustomUrl colab={mockColab} />
      </ThemeProvider>
    );

    const image = screen.getByRole("img", {
      name: `${mockColab.firstName} ${mockColab.lastName}`,
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("avatarDefault")
    );
  });

  it("should reset the margin if the margin prop is provided", () => {
    useAvatarUrl.mockReturnValueOnce("https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png");

    const { rerender } = render(
      <ThemeProvider theme={mockTheme}>
        <AvatarCustomUrl colab={mockColab} />
      </ThemeProvider>
    );

    let image = screen.getByRole("img", {
      name: `${mockColab.firstName} ${mockColab.lastName}`,
    });

    expect(image).toHaveStyle("margin: 0px 8px 0px 8px");

    rerender(
      <ThemeProvider theme={mockTheme}>
        <AvatarCustomUrl colab={mockColab} margin />
      </ThemeProvider>
    );

    image = screen.getByRole("img", {
      name: `${mockColab.firstName} ${mockColab.lastName}`,
    });

    expect(image).toHaveStyle("margin: 0px");
  });
});
