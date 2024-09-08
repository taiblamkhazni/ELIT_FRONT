import { QueryClient, QueryClientProvider } from "react-query";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'; 
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";

import { render, screen } from "@testing-library/react";

import Resultat from "../Resultat";

import "jest-localstorage-mock";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), 
}));


console.error = jest.fn()


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

        useNavigate.mockReturnValue(jest.fn());

        let dispatchMock = jest.fn();

        const initialState = {
            projectReducer: {
                project: {
                    projectId: 1,
                    name: "",
                }  
            },
            previsibilityAnalysisReducer: {
                isHavingComments: true,
                id: 1
            },
            authentificationReducer: {
                user: {

                }
            },
            executionPlanReducer: {
                choosenMethodology: "",
                isLoadingReport: false,
                results: {
                    allMethods: [],
                    countVotes: []
                }
            },
            methodsPie: {
                base64: ""
            },
            methodsBar: {
                base64: ""
            }


        };

        const mockAuthTokens = { "access-token": "fake-access-token" };
        const mockAuthTokensString = JSON.stringify(mockAuthTokens);

        jest.spyOn(window.localStorage, "getItem").mockReturnValue(mockAuthTokensString);

        store = mockStore(initialState)

        useSelector.mockImplementation((callback) => {
            return callback(initialState);
        });

        useDispatch.mockImplementation(() => dispatchMock);

        let resultatPlanExecution = {
            executionPlanId: 1,
            predictibilityResults: [],
            countVotes: [],
            chooseMethod: [],
        }

        render(
            <ThemeProvider theme={themeMock}>
                <Provider store={store}>
                    <QueryClientProvider client={new QueryClient()}>
                        <Resultat resultatPlanExecution={resultatPlanExecution} />
                    </QueryClientProvider>
                </Provider>
            </ThemeProvider>
        )
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should show the right title", () => {

        let title = screen.getByText("Les résultats issus de l'étape 3 du plan ", { exact: false })
        expect(title).toBeInTheDocument()

    })
});
