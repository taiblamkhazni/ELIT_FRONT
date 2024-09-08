/**
 * @file IgnoreButtonToolTip.test.js
 * @brief Ce fichier contient des tests pour le composant IgnoreButtonTooltip.
 */
/**
 * @brief Importaion du @testing-library/react.
 */
import { Cookies } from "react-cookie";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setStageNumberWelcomeTooltipEnd } from "reducers/welcomeTooltip/welcomeTooltipReducer";
/**
 * @brief Importaion du configureStore.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant IgnoreButtonTooltip pour le tester
 */
import IgnoreButtonTooltip from "../IgnoreButtonTooltip";

/**
 * @brief Substitution de la fonction console.error par une fonction vide de jest.
 */
console.error = jest.fn()

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

//console.error = jest.fn()

const mockStore = configureStore();
let setCookieSpy;
let store;

/**
 * @brief Mock pour le thème.
 */
const themeMock = {
  colors: {
    primaires: {
      blueLight: "#someColor",
      blueDark: "#someColor",
      blue: "#someColor",
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

let dispatchMock;
describe("testing the IgnoreButton component", () => {
  beforeEach(() => {

    dispatchMock = jest.fn();
    setCookieSpy = jest.spyOn(Cookies.prototype, 'set');
    const initialState = {
      authentificationReducer: {
        user: {
          id: 'mock_id',
        }
      }
    };

    store = mockStore(initialState)

    useSelector.mockImplementation((callback) => {
      return callback(initialState);
    });

    useDispatch.mockImplementation(() => dispatchMock);

    render(
      <ThemeProvider theme={themeMock}>
        <Provider store={store}>
          <IgnoreButtonTooltip />
        </Provider>
      </ThemeProvider>
    )
  });

  afterEach(() => {
    jest.clearAllMocks();
    setCookieSpy.mockRestore();
  });

  /**
   * @brief Test to check if it shows button
   *
   */
  it("should show button", () => {
    let title = screen.getByText("Ignorer", { exact: false })
    expect(title).toBeInTheDocument()
  })

  /**
   * @brief Test to pass correct fontSize to ButtonNoBackground
   *
   */
  it('should pass correct fontSize to ButtonNoBackground', () => {
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ fontSize: '10px' });
  });


  /**
   * @brief Test to handle undefined user
   *
   */
  it('should handle undefined user', () => {
    useSelector.mockImplementation(() => ({
      authentificationReducer: {
        user: undefined
      }
    }));
    // Re-render the component here
    expect(() => {
      render(
        <ThemeProvider theme={themeMock}>
          <Provider store={store}>
            <IgnoreButtonTooltip />
          </Provider>
        </ThemeProvider>
      );
    }).not.toThrow();
  });


  /**
   * @brief Test to check if it dispatches an action when clicked
   *
   */
  it("should dispatch an action when clicked", () => {
    const button = screen.getByText("Ignorer");
    fireEvent.click(button);
    expect(dispatchMock).toBeCalledWith(setStageNumberWelcomeTooltipEnd(-1));

  });

  /**
   * @brief Test to set cookie when clicked
   *
   */
  it("should set cookie when clicked", () => {
    const button = screen.getByText("Ignorer");
    fireEvent.click(button);

    expect(setCookieSpy).toHaveBeenCalledWith(
      expect.stringContaining("isShowedTooltip_mock_id"),
      "yes",
      expect.any(Object)
    );
  });
});
