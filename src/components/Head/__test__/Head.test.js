/**
 * @file Head.test.js
 * @brief Ce fichier contient des tests pour le composant Header.
 * @details Il utilise le testing-library de React pour effectuer ces tests.
 */
import { Provider, useSelector } from "react-redux";
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Header from "../Head";

/**
 * @brief Utilisation de Jest pour simuler le hook useSelector de react-redux
 */
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));
// Adjust the relative path to match your project structure
//jest.mock("../../../pages/PageBase/PageBase", () => ({ children }) => <div>{children}</div>);

/**
 * Création d'un magasin Redux simulé à l'aide de redux-mock-store.
 */
const mockStore = configureStore();
/**
 * Initialisation de l'état initial du magasin Redux simulé
 */
const initialState = {
  userReducer: {
    userInfo: {
      userFirstName: "John",
      userLastName: "Doe",
    },
    avatarUrl: "http://example.com/avatar.jpg",
  },
  welcomeTooltipReducer: {
    stageNumber: 1,
  },
};
const store = mockStore(initialState);

/**
 *  Création d'un thème simulé pour le Provider de styled-components
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
  },
  fontWeights: {
    regular: "400",
  },
  lineHeights: {
    Deci: "1.5",
  },
};

/**
 * @test Suite de tests pour le composant Header.
 * @details Il effectue 3 tests:
 * 1. Vérifier que le titre est correctement rendu
 * 2. Vérifier que le nom de l'utilisateur est correctement affiché
 * 3. Vérifier que l'avatar de l'utilisateur est correctement affiché
 */
describe("Header Component", () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) =>
      selector({     
        userReducer: {
          userInfo: {
            userFirstName: "John",
            userLastName: "Doe",
          },
          avatarUrl: "http://example.com/avatar.jpg",
        },  
        welcomeTooltipReducer: {
          stageNumber: 1
        }
      })
    );
  });

  it("renders the header title correctly", () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <Header />
        </ThemeProvider>
      </Provider>
    );
    
    /**
   * @test Inside your test Link.
   */
    const title = screen.getByText(/À propos/);
    expect(title).toBeInTheDocument();
  });
  it("displays the user's name correctly", () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <Header />
        </ThemeProvider>
      </Provider>
    );
    const username = screen.getByText(/John Doe/);
    expect(username).toBeInTheDocument();
  });

  it("displays the user's avatar correctly", () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <Header />
        </ThemeProvider>
      </Provider>
    );
    const avatar = screen.getByAltText("image profil");
    expect(avatar).toHaveAttribute("src", "http://example.com/avatar.jpg");
  });
});

describe("Header Component - branches", () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) =>
      selector({
        authentificationReducer: {
          user: {
            id: 1,
          },
        },
        userReducer: {
          userInfo: {
            userFirstName: "John",
            userLastName: "Doe",
          },
        },
        welcomeTooltipReducer: {
          stageNumber: 3,
        },
      })
    );
  });

  it("renders without error", async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <Header />
        </ThemeProvider>
      </Provider>
    );
    
    await act(async () => {
      await userEvent.click(screen.getByTestId("setNotificationHiddenDiv"));
      await userEvent.click(screen.getByText("Suivant"));
    });
  });
});
