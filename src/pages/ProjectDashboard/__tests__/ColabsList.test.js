/**
 * @file ColabsList.test.js
 * @brief Ce fichier contient des tests pour le composant ColabsList.
 */
import { ProjectCreationContext } from "context/ProjectCreationProvider";
/**
 * @brief Import de useProjectCreationContext
 */
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext";
import { Provider, useDispatch, useSelector } from "react-redux";
/**
 * @brief Import de configureStore.
 */
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { fireEvent, render, screen } from "@testing-library/react";

/**
 * @brief Import du composant ColabsList pour le tester.
 */
import ColabsList from "../ColabsList";

/**
 * @brief Utilisation de Jest pour simuler le hook useProjectCreationContext
 */
jest.mock("hooks/useProjectCreationContext/useProjectCreationContext.js");

/**
 * @brief utilisée pour surcharger la fonction console.error pour empêche la console d'afficher les erreurs pendant l'exécution des tests.
 */
console.error = jest.fn()

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

console.error = jest.fn()

const mockStore = configureStore();

let store;

/**
 * @brief Création d'un thème simulé pour le Provider de styled-components
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

describe("testing the FileTable component", () => {
    beforeEach(() => {
        let setInvitedColabs = jest.fn()
        let invitedColabs = []
        let colabList = []
        let listSelected = []
        let handleInviterColabs = jest.fn()
        let deleteColabById = jest.fn()

        let dispatchMock = jest.fn();

        const initialState = {
            authentificationReducer: {
                user: {

                }
            }
        };

        store = mockStore(initialState)

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        useDispatch.mockImplementation(() => dispatchMock);

        useProjectCreationContext.mockReturnValue({
            setInvitedColabs, invitedColabs, colabList, listSelected, handleInviterColabs, deleteColabById
        });

        render(
            <ThemeProvider theme={themeMock}>
                <Provider store={store}>
                    <ProjectCreationContext.Provider>
                        <ColabsList
                            collaborateurs={[]}
                            chefId={1}
                        />
                    </ProjectCreationContext.Provider>
                </Provider>
            </ThemeProvider>
        )
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should show the right title", () => {
        let title = screen.queryByText("Collaborateurs")
        expect(title).not.toBeInTheDocument()

        const button = screen.getByTestId("button")
        expect(button).toBeInTheDocument()

        fireEvent.click(button)

        title = screen.getByText("Collaborateurs")
        expect(title).toBeInTheDocument()
    })
});


