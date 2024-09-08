/**
 * @file Commentaire.test.js
 * @brief Contient les tests unitaires pour le composant Commentaire.
 */
import { useStepContext } from "pages/AnalyseMulticriteres/AnalyseMulticriteresPage";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

/**
 * @brief Importation du composant Commentaire pour le tester
 */
import Commentaire from "../Commentaire";

/**
 * @brief Importaion du jest-localstorage-mock.
 */
import "jest-localstorage-mock";
/**
 * @brief utilisée pour surcharger la fonction console.error pour empêche la console d'afficher les erreurs pendant l'exécution des tests.
 */
console.error = jest.fn()

jest.mock("pages/AnalyseMulticriteres/AnalyseMulticriteresPage");

/**
 * @brief Utilisation de Jest pour simuler le hook useDispatch et useSelector de react-redux.
 */
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

console.error = jest.fn()


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
/**
 * @brief Création d'un varibale pour l'objet commentaires.
 */
let commentaires =
{
    brainstormingText: "brainstormingText test",
    firstName: "jamai",
    lastName: "issam",
    userId: ""
}


describe("testing the FileTable component", () => {
    beforeEach(() => {

        let setListStepweights = jest.fn()
        let listStepWeights = []
        let getCurrentStepWeights = jest.fn(() => [])

        let dispatchMock = jest.fn();

        const initialState = {
            multicriteriaAnalysisReducer: {
                current: 1
            },
            projectReducer: {
                currentUser: {

                }
            }
        };

        const mockAuthTokens = { "access-token": "fake-access-token" };
        const mockAuthTokensString = JSON.stringify(mockAuthTokens);

        jest.spyOn(window.localStorage, "getItem").mockReturnValue(mockAuthTokensString);


        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        useDispatch.mockImplementation(() => dispatchMock);

        useStepContext.mockReturnValue({
            setListStepweights, listStepWeights, getCurrentStepWeights
        });

        render(
            <ThemeProvider theme={themeMock}>
                <Commentaire commentaire={commentaires} index={1} iteration2={""} />
            </ThemeProvider>
        )
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should show the right title", () => {

        let title = screen.queryByText("jamai ISSAM")
        expect(title).toBeInTheDocument()


    })
});
