/**
 * @file UserInformationForm.test.js
 * @brief This file contains tests for the UserInformationForm component.
 */
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

/**
 * @brief Importaion of @testing-library/react.
 */
import { render, screen } from '@testing-library/react';

import UserInformationForm from "../UserInformationForm";

/**
 * @brief Mock for the Redux store.
 */
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

/**
 * @brief Overriding console.error to suppress error outputs during test execution.
 */
console.error = jest.fn()

const mockStore = configureStore();

let store;

/**
 * @brief Mock initialState.
 */
const initialState = {
  authentificationReducer: {
    user: {
      firstname: "John",
      lastname: "Doe",
    },
  },
  userReducer: {
    userInfo: {
      userFirstName: "John",
      userLastName: "Doe",
    },
    avatarUrl: "https://exaplme.com",
  },
};

/**
 * @brief Mock theme data for styled-components.
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

/**
 * @brief Tests for the UserInformationForm component.
 */
describe("UserInformationForm", () => {
  /**
   * @brief Setup before each test.
   * @details Initializes mocks and renders the UserInformationForm component.
   */
  beforeEach(() => {
    let dispatchMock = jest.fn();

    useDispatch.mockImplementation(() => dispatchMock);

    useSelector.mockImplementation((callback) => {
      return callback(initialState);
    });

    useSelector.mockImplementation((callback) => {
      return callback({
        userReducer: { userInfo: initialState.userReducer.userInfo },
        authentificationReducer: { user: initialState.authentificationReducer.user }
      });
    });

    const userInfo = useSelector((state) => state.userReducer.userInfo);

    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <UserInformationForm userInfo={userInfo} />
        </ThemeProvider>
      </Provider>
    );
  });

  /**
   * @brief Cleanup after each test.
   * @details Clears all mocks.
   */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @brief Tests if the form is displayed properly.
   * @details Ensures that all required form elements are present in the document.
   */
  it("should display the form properly", () => {

    const text = screen.getByText(/Tous les champs sont obligatoires/i);
    expect(text).toBeInTheDocument();

    const inputFirstname = document.getElementById('nom');
    expect(inputFirstname).toBeInTheDocument();

    const lastnamelabel = screen.getByText(/Prénom/i);
    expect(lastnamelabel).toBeInTheDocument();

    const inputLastname = document.getElementById('prenom');
    expect(inputLastname).toBeInTheDocument();

    const emaillabel = screen.getByText(/Addresse e-mail/i);
    expect(emaillabel).toBeInTheDocument();

    const emailInput = document.getElementById('email');
    expect(emailInput).toBeInTheDocument();

    const submitButton = screen.getByTestId("submit")
    expect(submitButton).toBeInTheDocument();

  });
});


