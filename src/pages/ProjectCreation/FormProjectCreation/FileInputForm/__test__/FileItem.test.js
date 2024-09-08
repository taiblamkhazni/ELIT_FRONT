/**
 * @file FileItem.test.js
 * @brief Contient les tests unitaires pour le composant FileItem.
 */
import {format} from "date-fns";
import { Provider, useDispatch, useSelector } from "react-redux";
/**
 * @brief Importaion du redux-mock-store.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant FileItem pour le tester
 */
import FileItem from "../FileItem";
/**
 * @brief Utilisation de Jest pour simuler le hook useDispatch et useSelector de react-redux.
 */
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.spyOn(Date, 'now').mockImplementation(() => 1678337300000);

/**
 * @brief utilisée pour surcharger la fonction console.error pour empêche la console d'afficher les erreurs pendant l'exécution des tests.
 */
console.error = jest.fn()

const mockStore = configureStore();

let store;
/**
 * @brief Initialisation de l'état initial du magasin Redux simulé
 */
const initialState = {
    authentificationReducer: {
        user: {
            firstname: "John",
            lastname: "Doe"
        },
    },
    userReducer: {
        userInfo: {},
        avatarUrl: "https://exaplme.com"
    },
};
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

let dispatchMock
/**
 * @brief Création d'une varibale pour mocker l'objet uploadedFiles.
 */
let uploadedFiles = [{ lastModified: new Date(2023, 1, 1), name: "test1", path: "" }]

describe("testing the FileItem component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    dispatchMock = jest.fn();

    useDispatch.mockImplementation(() => dispatchMock);

    useSelector.mockImplementation((callback) => {
      return callback(initialState);
    });

    store = mockStore(initialState);

    jest.spyOn(Date, 'now').mockImplementation(() => 1678337300000);

    render(
      <Provider store={store}>
        <ThemeProvider theme={themeMock}>
          <FileItem uploadedFiles={uploadedFiles}/>
        </ThemeProvider>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should switch between the profile view and the change your password view", () => {
    const text = screen.getByText("Fichier", {exact: false});

    expect(text).toBeInTheDocument();
  });

  it("should display the correct date based on the mocked `Date.now()`", () => {
    const expectedDate = format(1678337300000, "dd/MM/yyyy"); // Format the mocked timestamp
    const dateCell = screen.getByText(expectedDate);

    expect(dateCell).toBeInTheDocument();
  });
});



