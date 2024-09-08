/**
 * @file Media.test.js
 * @brief Ce fichier contient des tests pour le composant Media.
 */
/**
 * @brief Importation du react-redux.
 */
import { Provider } from "react-redux";
import { setStageNumberWelcomeTooltip } from "reducers/welcomeTooltip/welcomeTooltipReducer";
/**
 * @brief Importation du configureStore.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { act, fireEvent, render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant Media pour le tester
 */
import Media from "../Media";
/**
 * @brief Substitution de la fonction console.error par une fonction vide de jest.
 */
console.error = jest.fn()

const mockStore = configureStore();

let store;

/**
 * @brif Etat initial du store mocké.
 */
const initialState = {
  welcomeTooltipReducer: {
    stageNumber: 4
  },
  authentificationReducer: {
    user: {
      firstName: "",
      lastName: ""
    }
  }
};
/**
 * @brif Mock pour le thème.
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


describe("testing the TitleDate component", () => {
  beforeEach(() => {

    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <Media />
        </ThemeProvider>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  /**
   * @brief Test to show the right paragraphs
   *
   */
  it("it should show the right paragraphs", () => {
    const text = screen.getByText("ELIT est un outil d'aide à la décision", { exact: false })
    const title = screen.getByText("Qu'est-ce que ELIT ?")

    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  /**
   * @brief Test to show the popover
   *
   */
  it("it should show the popover", () => {
    const button = screen.getByRole("button", { name: "Suivant" })
    fireEvent.click(button)
    const title = screen.getByText("Sur la page d’accueil", { exact: false })
    expect(title).toBeInTheDocument();
  });

  /**
   * @brief Test to show the video element
   *
   */
  it("should show the video element", () => {
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <Media />
        </ThemeProvider>
      </Provider>
    );
    const videoElement = container.querySelector("video");
    expect(videoElement).toBeInTheDocument();
  });

  /**
   * @brief Test to check if the NextStepButton and IgnoreButtonTooltip Components are Rendered
   *
   */
  it("should show the NextStepButton and IgnoreButtonTooltip", () => {
    const nextButton = screen.getByRole("button", { name: "Suivant" });
    const ignoreButton = screen.getByText("Ignorer"); // Assuming the IgnoreButtonTooltip contains this text

    expect(nextButton).toBeInTheDocument();
    expect(ignoreButton).toBeInTheDocument();
  });


  it("should dispatch setStageNumberWelcomeTooltip action when Suivant button clicked", async () => {
    const nextButton = screen.getByRole("button", { name: "Suivant" });

    await act(async () => {
      fireEvent.click(nextButton);
    });

    expect(store.getActions()).toEqual([
      setStageNumberWelcomeTooltip(initialState.welcomeTooltipReducer.stageNumber + 1)
    ]);
  });
});
