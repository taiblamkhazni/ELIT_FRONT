/**
 * @file AnalyseMulticritereIteration2.test.js
 * @brief Ce fichier contient des tests pour le composant MenuTitle.
 */
import { StepsContext, useStepContext } from "pages/AnalyseMulticriteres/AnalyseMulticriteresPage";
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

import AnalyseMulticritereIteration2 from "../AnalyseMulticritereIteration2";

console.error = jest.fn()

jest.mock("pages/AnalyseMulticriteres/AnalyseMulticriteresPage");


jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

console.error = jest.fn()

const mockStore = configureStore();

let store;

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

        let setListStepweights = jest.fn()
        let listStepWeights = []
        let getCurrentStepWeights = jest.fn(() => [])

        let dispatchMock = jest.fn();

        const initialState = {
            multicriteriaAnalysisReducer: {
                current: 1
            },
            projectReducer: {
                projectId: 1
            }
        };

        store = mockStore(initialState)

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        useDispatch.mockImplementation(() => dispatchMock);

        useStepContext.mockReturnValue({
            setListStepweights, listStepWeights, getCurrentStepWeights
        });

        render(
            <ThemeProvider theme={themeMock}>
                <Provider store={store}>
                    <StepsContext.Provider>
                        <AnalyseMulticritereIteration2 />
                    </StepsContext.Provider>
                </Provider>
            </ThemeProvider>
        )
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should show the right title", () => {

        let title = screen.getByText("[Étape 1 : Analyse multicritère] Itération 2")
        expect(title).toBeInTheDocument()


    })
});
